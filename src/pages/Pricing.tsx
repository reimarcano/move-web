import { MessageCircle } from 'lucide-react';
import Reviews from '../components/Reviews';
import FichaValoracion from '../components/FichaValoracion';
import { VALORACION_WHATSAPP_URL } from '../data/valoracion';
import { planesGrupales as planes } from '../data/planes';

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

/* Línea de carta: nombre · · · · · precio, con el detalle en cursiva debajo */
function PlanLinea({ plan }: { plan: Plan }) {
  return (
    <li className="py-4 reveal">
      <div className="flex items-baseline gap-3">
        <span className={`font-serif text-sub text-dark whitespace-nowrap ${plan.conNombre ? "italic" : ""}`}>{plan.nombre}</span>
        <span aria-hidden="true" className="flex-1 border-b border-dotted border-line-strong -translate-y-[5px]" />
        <span className="font-serif text-sub text-dark whitespace-nowrap">{plan.precio}</span>
      </div>
      <p className="mt-1 mb-0 font-sans text-label italic text-mid">
        {plan.detalle}
        {plan.recomendado && (
          <span className="m-badge ml-3 not-italic align-[1px]">
            Más elegido
          </span>
        )}
      </p>
    </li>
  );
}

function Seccion({ titulo, italica, subtitulo, planes }: { titulo: string; italica: string; subtitulo: string; planes: Plan[] }) {
  return (
    <section>
      <p className={`${eyebrow} mb-3 reveal`}>{subtitulo}</p>
      <h2 className="m-title-sm mb-3 reveal">
        {titulo} <span className="italic">{italica}.</span>
      </h2>
      <ul className="list-none p-0 m-0">
        {planes.map((plan) => (
          <PlanLinea key={plan.nombre} plan={plan} />
        ))}
      </ul>
    </section>
  );
}

export default function Pricing() {
  return (
    <div className="w-full">
      <section className="m-section">
        <div className="m-head">
          <p className={`${eyebrow} reveal`}>Tarifas</p>
          <h1 className="m-title text-display reveal reveal-delay-1">
            Encuentra <span className="italic">tu plan.</span>
          </h1>
        </div>

        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-2 lg:gap-16">
          {/* Foto del estudio: franja en móvil, fija al bajar en escritorio */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/move-pilates-pozuelo-tarifas-800.webp 800w, /assets/move-pilates-pozuelo-tarifas-1400.webp 1400w"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
              <img
                src="/assets/move-pilates-pozuelo-tarifas-1400.jpg"
                alt="Alumna en el Reformer de MOVE Pilates Boutique, Pozuelo de Alarcón"
                className="w-full h-[340px] md:h-[440px] lg:h-[calc(100vh-8rem)] lg:max-h-[640px] object-cover object-[center_20%] rounded-card"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          {/* Carta de tarifas */}
          <div className="pt-10 lg:pt-0 text-dark">
            {/* Primera vez: clase de valoración, con el mismo lenguaje que el Home */}
            <div className="pv-card mb-14 reveal">
              <span className="m-eyebrow m-eyebrow-light">¿Primera vez en MOVE?</span>
              <h2 className="pv-card-title">
                Tu clase de <em>Valoración.</em>
              </h2>
              <p className="pv-card-lead">
                Tu primera sesión guiada para conocer tu nivel, tu postura y tus objetivos.
              </p>
              <FichaValoracion />
              <p className="pv-card-note">Se descuenta de tu primer mes o bono.</p>
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

            <Seccion titulo="Clases" italica="grupales" subtitulo="Reformer · Máx. 4 personas · 50 min" planes={planesGrupales} />
            <p className="mt-1 mb-14 font-sans text-label text-mid reveal">Validez de 35 días</p>

            <Seccion titulo="Sesiones" italica="privadas" subtitulo="1:1 en Reformer Torre · 50 min" planes={sesionesPrivadas} />

            <p className="mt-12 mb-0 font-sans text-label leading-[1.8] text-mid reveal">
              Todos los planes incluyen descuentos en eventos MOVE. Precios en euros, impuestos incluidos.
            </p>
            <div className="m-foot pt-10 border-t border-line reveal">
              <p className="m-closing">¿Dudas sobre qué plan elegir?</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
                <MessageCircle size={16} aria-hidden="true" />
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Reviews />
    </div>
  );
}
