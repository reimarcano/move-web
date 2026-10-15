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

const eyebrow = 'font-sans text-[10px] uppercase tracking-[0.18em] text-[#7F7763]';

/* Línea de carta: nombre · · · · · precio, con el detalle en cursiva debajo */
function PlanLinea({ plan }: { plan: Plan }) {
  return (
    <li className="py-4 reveal">
      <div className="flex items-baseline gap-3">
        <span className={`font-serif text-[19px] md:text-[21px] text-[#493523] whitespace-nowrap ${plan.conNombre ? "italic md:text-[24px]" : ""}`}>{plan.nombre}</span>
        <span aria-hidden="true" className="flex-1 border-b border-dotted border-[#493523]/35 -translate-y-[5px]" />
        <span className="font-serif text-[22px] md:text-[24px] text-[#493523] whitespace-nowrap">{plan.precio}</span>
      </div>
      <p className="mt-1 mb-0 font-sans text-[12px] italic text-[#7F7763]">
        {plan.detalle}
        {plan.recomendado && (
          <span className="ml-3 not-italic inline-block align-[1px] rounded-[100px] bg-[#493523] px-3 py-[3px] text-[9px] uppercase tracking-[0.25em] text-[#F6F3EC]">
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
      <h2 className="mb-1 font-serif font-normal text-[30px] md:text-[34px] leading-[1.15] text-[#493523] reveal">
        {titulo} <span className="italic">{italica}</span>
      </h2>
      <p className={`${eyebrow} mb-2 reveal`}>{subtitulo}</p>
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
    <div className="w-full pb-0">
      <section className="px-6 text-center max-w-4xl mx-auto section-padding-claro pb-10 md:pb-14">
        <p className={`${eyebrow} mb-3 reveal`}>Tarifas</p>
        <h1 className="mb-0 reveal">
          Encuentra <span className="italic">tu plan.</span>
        </h1>
      </section>

      <div className="max-w-[1180px] mx-auto md:px-10 grid lg:grid-cols-2 lg:gap-16">
        {/* Foto del estudio: franja en móvil, fija al bajar en escritorio */}
        <div className="px-6 md:px-0 lg:sticky lg:top-24 lg:self-start">
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
        <div className="px-6 md:px-0 pt-10 lg:pt-0 pb-16 md:pb-24 text-[#493523]">
          {/* Primera vez: clase de valoración, con el mismo lenguaje que el Home */}
          <div className="pv-card mb-14 reveal">
            <span className="pv-eyebrow pv-eyebrow-light">¿Primera vez en MOVE?</span>
            <h2 className="pv-card-title">
              Tu clase de <em>Valoración</em>
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
              className="pv-btn"
            >
              Reservar mi clase
            </a>
          </div>

          <Seccion titulo="Clases" italica="Grupales" subtitulo="Reformer · Máx. 4 personas · 50 min" planes={planesGrupales} />
          <p className="mt-1 mb-14 font-sans text-[11px] text-[#7F7763] reveal">Validez de 35 días</p>

          <Seccion titulo="Sesiones" italica="Privadas" subtitulo="1:1 en Reformer Torre · 50 min" planes={sesionesPrivadas} />

          <p className="mt-12 mb-3 font-sans text-[11px] leading-[1.8] text-[#7F7763] reveal">
            Todos los planes incluyen descuentos en eventos MOVE. Precios en euros, impuestos incluidos.
          </p>
          <div className="mt-12 pt-10 border-t border-[#493523]/15 text-center reveal">
            <p className="font-serif italic text-[22px] text-[#493523] mb-5">¿Dudas sobre qué plan elegir?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
              <MessageCircle size={16} aria-hidden="true" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Reviews />
    </div>
  );
}
