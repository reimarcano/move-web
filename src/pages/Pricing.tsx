import { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import Reviews from '../components/Reviews';
import FichaValoracion from '../components/FichaValoracion';
import { VALORACION_WHATSAPP_URL } from '../data/valoracion';
import { planesGrupales as planes } from '../data/planes';
import { useNaceDelBorde } from '../hooks/useNaceDelBorde';

const WHATSAPP_URL = 'https://wa.me/34654495508';

interface Plan {
  nombre: string;
  precio: number;
  detalle: string;
  recomendado?: boolean;
  /* Nombre propio del plan, en cursiva como en el Home */
  conNombre?: boolean;
}

/* Mismos nombres que en el Home: Movimiento, Transición, Transformación */
const planesGrupales: Plan[] = planes.map((p) => ({
  nombre: p.nombre,
  precio: p.precio,
  detalle: `${p.frecuencia} · al mes · ${p.porClase} por clase`,
  recomendado: p.masElegido,
  conNombre: true,
}));

const sesionesPrivadas: Plan[] = [
  { nombre: 'Bono 4 sesiones', precio: 210, detalle: '52,50 € por sesión' },
  { nombre: 'Bono 8 sesiones', precio: 400, detalle: '50 € por sesión' },
];

const eyebrow = 'm-eyebrow';

/* Línea de carta: nombre ——— precio, con el detalle en cursiva debajo.
   El filete se traza al entrar, como en el resto de la web. */
function PlanLinea({ plan, index }: { plan: Plan; index: number }) {
  return (
    <li className={`pr-row reveal${plan.recomendado ? ' is-key' : ''}`} style={{ '--i': index } as React.CSSProperties}>
      <div className="pr-line">
        <span className={`pr-name${plan.conNombre ? ' is-named' : ''}`}>{plan.nombre}</span>
        <span className="pr-leader" aria-hidden="true" />
        <span className="pr-price">{plan.precio}</span>
      </div>
      <p className="pr-detail">
        {plan.detalle}
        {plan.recomendado && <span className="m-badge pr-badge">Más elegido</span>}
      </p>
    </li>
  );
}

function Seccion({ titulo, italica, subtitulo, planes, nota }: { titulo: string; italica: string; subtitulo: string; planes: Plan[]; nota?: string }) {
  return (
    <section className="pr-col">
      <p className={`${eyebrow} reveal`}>{subtitulo}</p>
      <h2 className="m-title-sm pr-title reveal reveal-delay-1">
        {titulo} <em>{italica}.</em>
      </h2>
      <ul className="pr-list">
        {planes.map((plan, i) => (
          <PlanLinea key={plan.nombre} plan={plan} index={i} />
        ))}
      </ul>
      {nota && <p className="pr-note reveal">{nota}</p>}
    </section>
  );
}

export default function Pricing() {
  const fotoRef = useRef<HTMLElement>(null);
  useNaceDelBorde(fotoRef, 'izquierda');

  return (
    <div className="w-full">
      <section className="m-section">
        <div className="m-head">
          <p className={`${eyebrow} reveal`}>Tarifas</p>
          <h1 className="m-title text-display reveal reveal-delay-1">
            Encuentra <em>tu plan.</em>
          </h1>
        </div>

        {/* Primera vez: la misma cinta que en el Home, con la foto a sangre desde el borde */}
        <div className="m-band pv-band pr-band">
          <figure className="pv-photo" ref={fotoRef}>
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/move-pilates-pozuelo-tarifas-800.webp 800w, /assets/move-pilates-pozuelo-tarifas-1400.webp 1400w"
                sizes="(min-width: 900px) 42vw, 100vw"
              />
              <img
                src="/assets/move-pilates-pozuelo-tarifas-1400.jpg"
                alt="Alumna en el Reformer de MOVE Pilates Boutique, Pozuelo de Alarcón"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>

          <div className="pv-copy">
            <span className="m-eyebrow m-eyebrow-light reveal">¿Primera vez en MOVE?</span>
            <h2 className="pv-title reveal reveal-delay-1">
              Tu clase de <em>Valoración.</em>
            </h2>
            <p className="pv-lead reveal reveal-delay-1">
              Tu primera sesión guiada para conocer tu nivel, tu postura y tus objetivos.
            </p>
            <FichaValoracion />
            <p className="pr-band-note reveal">Se descuenta de tu primer mes o bono.</p>
            <div className="pv-cta reveal">
              <a
                href={VALORACION_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Reservar clase de valoración por WhatsApp"
                className="btn-inverted"
              >
                Reservar mi clase
              </a>
            </div>
          </div>
        </div>

        {/* Carta de tarifas: dos columnas editoriales, sin tarjetas */}
        <div className="pr-carta">
          <Seccion titulo="Clases" italica="grupales" subtitulo="Reformer · Máx. 4 personas · 50 min" planes={planesGrupales} nota="Validez de 35 días" />
          <Seccion titulo="Sesiones" italica="privadas" subtitulo="1:1 en Reformer Torre · 50 min" planes={sesionesPrivadas} />
        </div>

        <p className="pr-legal reveal">
          Todos los planes incluyen descuentos en eventos MOVE. Precios en euros, impuestos incluidos.
        </p>
        <div className="m-foot reveal">
          <p className="m-closing">¿Dudas sobre qué plan elegir?</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
            <MessageCircle size={16} aria-hidden="true" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      <Reviews />
    </div>
  );
}
