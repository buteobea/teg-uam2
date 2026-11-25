#!/usr/bin/env python3
"""
Genera el espectrograma REAL de la portada a partir de una grabación.

Uso:
  python herramientas/espectrograma.py grabacion.wav --desde 12 --hasta 52 \
      --especie "Chersophilus duponti" --lugar "Páramos de Soria" --fecha "abril 2025" \
      --autor "TEG-UAM" [--tabla seleccion_raven.txt] [--fmax 10000]

Crea dos archivos que la web lee automáticamente:
  img/espectrograma.png   imagen del espectrograma con la paleta de la web
  espectrograma.js        datos (duración, frecuencias, detecciones y pie de figura)

--tabla (opcional): tabla de selecciones de Raven (Begin Time (s), End Time (s),
  Low Freq (Hz), High Freq (Hz) y una columna con la especie: Species, Especie,
  Annotation o Label). Cada selección se dibuja como una caja con su etiqueta.
Requiere: Python 3, numpy, scipy y Pillow (y ffmpeg si el audio no es WAV).
"""
import argparse, json, os, subprocess, sys, tempfile, csv
import numpy as np
from scipy.io import wavfile
from scipy.signal import spectrogram
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STOPS = np.array([[18,23,14],[34,46,22],[79,100,33],[146,170,50],[228,213,140],[252,250,232]], float)

def cmap(v):
    v = np.clip(v, 0, 0.999) * (len(STOPS) - 1)
    i = v.astype(int); f = (v - i)[..., None]
    return (STOPS[i] + (STOPS[i + 1] - STOPS[i]) * f).astype(np.uint8)

def leer(ruta):
    if not ruta.lower().endswith('.wav'):
        tmp = tempfile.mktemp(suffix='.wav')
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', ruta, '-ac', '1', tmp], check=True)
        ruta = tmp
    sr, x = wavfile.read(ruta)
    if x.ndim > 1: x = x.mean(axis=1)
    x = x.astype(np.float32)
    if np.issubdtype(x.dtype, np.integer) or np.abs(x).max() > 1.5: x /= (np.abs(x).max() or 1)
    return sr, x

def main():
    a = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    a.add_argument('audio'); a.add_argument('--desde', type=float, default=0); a.add_argument('--hasta', type=float)
    a.add_argument('--fmax', type=float, default=10000); a.add_argument('--pxs', type=int, default=90, help='píxeles por segundo')
    a.add_argument('--alto', type=int, default=360); a.add_argument('--tabla')
    a.add_argument('--especie', default=''); a.add_argument('--lugar', default=''); a.add_argument('--fecha', default=''); a.add_argument('--autor', default='')
    o = a.parse_args()
    sr, x = leer(o.audio)
    fin = o.hasta if o.hasta else len(x) / sr
    x = x[int(o.desde * sr):int(fin * sr)]; dur = len(x) / sr
    nper = 1024 if sr > 30000 else 512
    hop = max(1, int(sr / o.pxs))
    f, t, S = spectrogram(x, fs=sr, nperseg=nper, noverlap=max(0, nper - hop), window='hann', mode='psd')
    S = S[f <= o.fmax]; f = f[f <= o.fmax]
    db = 10 * np.log10(S + 1e-12)
    lo, hi = np.percentile(db, 55), np.percentile(db, 99.7)
    v = np.clip((db - lo) / (hi - lo), 0, 1) ** 1.15
    img = Image.fromarray(cmap(v[::-1]), 'RGB').resize((max(400, int(dur * o.pxs)), o.alto), Image.BICUBIC)
    os.makedirs(os.path.join(RAIZ, 'img'), exist_ok=True)
    img.save(os.path.join(RAIZ, 'img', 'espectrograma.png'), optimize=True)
    cajas = []
    if o.tabla:
        with open(o.tabla, encoding='utf-8-sig') as fh:
            for r in csv.DictReader(fh, delimiter='\t'):
                g = lambda *ks: next((r[k] for k in ks if k in r and r[k] != ''), '')
                b, e = float(g('Begin Time (s)', 'Inicio (s)')), float(g('End Time (s)', 'Fin (s)'))
                if e < o.desde or b > fin: continue
                cajas.append(dict(t0=round(max(0, b - o.desde), 3), t1=round(min(dur, e - o.desde), 3),
                                  f0=float(g('Low Freq (Hz)', 'Low Frequency (Hz)') or 0), f1=float(g('High Freq (Hz)', 'High Frequency (Hz)') or o.fmax),
                                  etiqueta=g('Species', 'Especie', 'Annotation', 'Label', 'species')))
    datos = dict(img='img/espectrograma.png', duracion=round(dur, 3), fmax=o.fmax, cajas=cajas,
                 especie=o.especie, lugar=o.lugar, fecha=o.fecha, autor=o.autor)
    with open(os.path.join(RAIZ, 'espectrograma.js'), 'w', encoding='utf-8') as fh:
        fh.write('/* Generado por herramientas/espectrograma.py — no editar a mano. */\nwindow.ESPECTROGRAMA = ' + json.dumps(datos, ensure_ascii=False, indent=1) + ';\n')
    print(f'OK: {dur:.1f} s, {img.size[0]}x{img.size[1]} px, {len(cajas)} detecciones')

if __name__ == '__main__': main()
