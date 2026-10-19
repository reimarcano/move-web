import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import RecorridoEstudio from '../components/RecorridoEstudio';
import GaleriaFormaciones from '../components/GaleriaFormaciones';
import VisorFotos from '../components/VisorFotos';
import { useNaceDelBorde } from '../hooks/useNaceDelBorde';
import { VALORACION_WHATSAPP_URL } from '../data/valoracion';
import type { Foto } from '../data/eventos';
import {
  APERTURA_ESTUDIO,
  GENESIS,
  INTRO_ESTUDIO,
  galeriaClases,
  recorridoEstudio,
  WHATSAPP_VISITA,
} from '../data/estudio';

/* ────────────────────────────────────────────
   Nuestro estudio · el recorrido
   Aquí las protagonistas son las fotos del espacio (el sello propio de esta página).
   1. El estudio a pantalla completa: hojas de fotos que suben en franjas, como las
      cortinas del ventanal. La primera lleva el título.
   2. Quién te guía: Génesis sube como telón sobre la última hoja.
   3. Las clases: la galería que nace de la M de MOVE y pasa en horizontal.
   ──────────────────────────────────────────── */

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
      <RecorridoEstudio escritorio={recorridoEstudio.escritorio} movil={recorridoEstudio.movil}>
        <span className="m-eyebrow m-eyebrow-light">{APERTURA_ESTUDIO.antetitulo}</span>
        <h1 className="recorrido__titulo">
          Un espacio pensado <em>con intención.</em>
        </h1>
        <p className="recorrido__intro">{INTRO_ESTUDIO}</p>
        <a className="btn-inverted" href={VALORACION_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Reserva tu clase de valoración
        </a>
      </RecorridoEstudio>

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
