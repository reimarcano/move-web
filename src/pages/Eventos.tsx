import { useCallback, useState } from 'react';
import Apertura from '../components/Apertura';
import Ritual from '../components/Ritual';
import GaleriaHorizontal from '../components/GaleriaHorizontal';
import VisorFotos from '../components/VisorFotos';
import FaqItem from '../components/FaqItem';
import {
  experiencias,
  faqsEventos,
  INTRO_EVENTOS,
  VIDEO_RETIRO,
  WHATSAPP_LISTA_ESPERA,
  type Experiencia,
} from '../data/eventos';

/* ────────────────────────────────────────────
   Eventos MOVE · el recorrido
   1. Cine: la promesa y un punto del que nace el vídeo del retiro ("Se viven.").
   2. Telón: cada experiencia sube y se cuenta como un ritual de momentos.
   3. Sus recuerdos en una galería horizontal a sangre y una salida directa a WhatsApp.
   4. Preguntas frecuentes y lista de espera.
   ──────────────────────────────────────────── */

const scrollToWaitlist = () => {
  document.getElementById('lista-espera')?.scrollIntoView({ behavior: 'smooth' });
};

/* Una experiencia completa: cabecera, ritual, intención, recuerdos y salida */
function CapituloExperiencia({ experiencia, primero }: { experiencia: Experiencia; primero: boolean }) {
  const [visor, setVisor] = useState<number | null>(null);
  const cerrar = useCallback(() => setVisor(null), []);

  return (
    <section
      id={experiencia.id}
      className={`m-section ev-capitulo${primero ? ' chapter-sheet' : ' pt-0'}`}
      aria-labelledby={`${experiencia.id}-titulo`}
    >
      {primero && <p className="m-intro ev-intro reveal">{INTRO_EVENTOS}</p>}
      {!primero && <span className="m-rule ev-separador" aria-hidden="true" />}

      <div className="m-head">
        <span className="m-eyebrow reveal">Una experiencia MOVE</span>
        <h2 id={`${experiencia.id}-titulo`} className="m-title reveal reveal-delay-1">
          {experiencia.titulo} <em>{experiencia.cursiva}</em>
        </h2>
        <p className="m-intro label-balanced reveal reveal-delay-2">{experiencia.entradilla}</p>
      </div>

      <Ritual momentos={experiencia.momentos} etiqueta={`Los momentos de ${experiencia.titulo} ${experiencia.cursiva}`} />

      <p className="m-closing ev-frase reveal">{experiencia.frase}</p>

      <div className="ev-gallery">
        <GaleriaHorizontal
          fotos={experiencia.galeria}
          etiqueta={`Recuerdos de ${experiencia.titulo} ${experiencia.cursiva}`}
          onOpen={setVisor}
        />
      </div>

      <div className="m-foot reveal">
        <p className="m-closing">{experiencia.cierre.pregunta}</p>
        <a href={experiencia.cierre.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {experiencia.cierre.boton}
        </a>
      </div>

      {visor !== null && (
        <VisorFotos fotos={experiencia.galeria} index={visor} onChange={setVisor} onClose={cerrar} />
      )}
    </section>
  );
}

export default function Eventos() {
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  return (
    <div className="w-full">
      <Apertura
        media={{ tipo: 'video', src: VIDEO_RETIRO.src, poster: VIDEO_RETIRO.poster, descripcion: VIDEO_RETIRO.caption }}
        gesto="punto"
        antetitulo="Experiencias MOVE"
        promesa="Algunos momentos no se explican."
        respuesta="Se viven."
        pie={VIDEO_RETIRO.caption}
        cta={{ texto: 'Quiero estar en la próxima', onClick: scrollToWaitlist }}
      />

      {experiencias.map((experiencia, i) => (
        <CapituloExperiencia key={experiencia.id} experiencia={experiencia} primero={i === 0} />
      ))}

      {/* Preguntas frecuentes: lo que la gente pregunta (y buscadores e IAs responden) */}
      <section className="m-section bg-arena" aria-labelledby="eventos-faq-titulo">
        <div className="fq-layout">
          <div className="fq-aside">
            <span className="m-eyebrow reveal">Antes de apuntarte</span>
            <h2 id="eventos-faq-titulo" className="m-title reveal reveal-delay-1">
              Experiencias <em>MOVE.</em>
            </h2>
          </div>
          <div className="fq-list">
            {faqsEventos.map((faq, index) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                index={index}
                idPrefix="eventos-faq"
                isOpen={faqAbierta === index}
                onToggle={() => setFaqAbierta((abierta) => (abierta === index ? null : index))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lista de espera: la última salida, la más clara */}
      <section id="lista-espera" className="m-section ev-espera" aria-labelledby="lista-espera-titulo">
        <div className="m-head mb-0">
          <span className="m-eyebrow reveal">Lista de espera</span>
          <h2 id="lista-espera-titulo" className="m-title reveal reveal-delay-1">
            La próxima experiencia <em>MOVE.</em>
          </h2>
          <p className="m-intro reveal reveal-delay-2">
            Anunciamos cada experiencia en nuestras redes. Si lo prefieres, escríbenos por WhatsApp y te avisamos de la próxima.
          </p>
          <div className="m-foot mt-8 gap-3 reveal reveal-delay-3">
            <a href={WHATSAPP_LISTA_ESPERA} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Apúntame a la lista de espera
            </a>
            <p className="m-text text-label text-mid">Te respondemos por WhatsApp en horario del estudio.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
