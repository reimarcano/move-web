import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Apertura from '../components/Apertura';
import GaleriaFormaciones from '../components/GaleriaFormaciones';
import VisorFotos from '../components/VisorFotos';
import { useNaceDelBorde } from '../hooks/useNaceDelBorde';
import { VALORACION_WHATSAPP_URL } from '../data/valoracion';
import type { Foto, Momento } from '../data/eventos';
import {
  APERTURA_ESTUDIO,
  GENESIS,
  INTRO_ESTUDIO,
  galeriaClases,
  momentosEspacio,
  WHATSAPP_VISITA,
} from '../data/estudio';

/* ────────────────────────────────────────────
   Nuestro estudio · el recorrido
   1. Apertura: la promesa y la foto del estudio naciendo del punto de la home.
      Después, el telón.
   2. El espacio en un mosaico de cuatro fotos a sangre, sin textos (el acento propio de
      esta página; el ritual con foto fija es el sello de Eventos).
   3. Quién te guía: Génesis, con su foto a sangre.
   4. Las clases en movimiento y una salida directa a WhatsApp.
   ──────────────────────────────────────────── */

/* Un detalle del espacio: foto a sangre que nace desde su borde; las fotos hablan solas */
function Detalle({ momento, index }: { momento: Momento; index: number }) {
  const fotoRef = useRef<HTMLElement>(null);
  useNaceDelBorde(fotoRef, index % 2 === 0 ? 'izquierda' : 'derecha');
  return (
    <li className="es-detalle">
      <figure ref={fotoRef} className="es-detalle__foto">
        <img src={momento.foto} alt={momento.alt} loading="lazy" decoding="async" />
      </figure>
    </li>
  );
}

/* Galería con su visor: las fotos hablan solas; la descripción aparece al ampliar */
function GaleriaConVisor({ fotos, etiqueta }: { fotos: Foto[]; etiqueta: string }) {
  const [visor, setVisor] = useState<number | null>(null);
  const cerrar = useCallback(() => setVisor(null), []);
  return (
    <>
      <div className="ev-gallery">
        <GaleriaFormaciones fotos={fotos} etiqueta={etiqueta} onOpen={setVisor} />
      </div>
      {visor !== null && <VisorFotos fotos={fotos} index={visor} onChange={setVisor} onClose={cerrar} />}
    </>
  );
}

export default function NuestroEstudio() {
  const fotoGenesisRef = useRef<HTMLElement>(null);
  useNaceDelBorde(fotoGenesisRef, 'izquierda');

  return (
    <div className="w-full">
      <Apertura
        media={{ tipo: 'imagen', src: APERTURA_ESTUDIO.imagen, descripcion: APERTURA_ESTUDIO.descripcion }}
        gesto="punto"
        antetitulo={APERTURA_ESTUDIO.antetitulo}
        promesa={APERTURA_ESTUDIO.promesa}
        respuesta={APERTURA_ESTUDIO.respuesta}
        pie={APERTURA_ESTUDIO.pie}
        cta={{ texto: 'Reserva tu clase de valoración', href: VALORACION_WHATSAPP_URL }}
      />

      {/* El espacio: sube como telón sobre la apertura */}
      <section className="m-section chapter-sheet ev-capitulo" aria-labelledby="espacio-titulo">
        <p className="m-intro ev-intro reveal">{INTRO_ESTUDIO}</p>
        <div className="m-head">
          <span className="m-eyebrow reveal">Nuestro espacio</span>
          <h2 id="espacio-titulo" className="m-title reveal reveal-delay-1">
            Diseñado para que te sientas <em>bien.</em>
          </h2>
        </div>

        <ol className="es-detalles" aria-label="Los detalles del estudio MOVE">
          {momentosEspacio.map((momento, i) => (
            <Detalle key={momento.titulo} momento={momento} index={i} />
          ))}
        </ol>
      </section>

      {/* Quién te guía: cinta marrón con la foto a sangre que nace desde el borde */}
      <section className="m-band es-guide" aria-labelledby="genesis-titulo">
        <figure className="es-guide-photo" ref={fotoGenesisRef}>
          <img src={GENESIS.foto} alt={GENESIS.alt} loading="lazy" decoding="async" />
        </figure>
        <div className="es-guide-copy">
          <span className="m-eyebrow m-eyebrow-light reveal">{GENESIS.rol}</span>
          <h2 id="genesis-titulo" className="m-title m-title-light reveal reveal-delay-1">
            {GENESIS.nombre} <em>{GENESIS.apellido}</em>
          </h2>
          <p className="m-text reveal reveal-delay-2">{GENESIS.texto}</p>
        </div>
      </section>

      {/* Las clases en movimiento */}
      <section className="m-section" aria-labelledby="clases-titulo">
        <div className="m-head">
          <span className="m-eyebrow reveal">Nuestras clases</span>
          <h2 id="clases-titulo" className="m-title reveal reveal-delay-1">
            El movimiento en <em>cada sesión.</em>
          </h2>
        </div>

        <GaleriaConVisor fotos={galeriaClases} etiqueta="Fotos de las clases en MOVE" />

        <div className="m-foot reveal">
          <p className="m-closing">¿Quieres conocer el estudio en persona?</p>
          <a href={WHATSAPP_VISITA} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Escríbenos por WhatsApp
          </a>
          <p className="es-direccion">
            Av. de Europa, 31, local 7 · Pozuelo de Alarcón · <Link to="/contacto">Cómo llegar</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
