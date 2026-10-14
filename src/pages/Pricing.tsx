import Reviews from '../components/Reviews';
import ClaseValoracion from '../components/ClaseValoracion';

const WHATSAPP_URL = 'https://wa.me/34654495508';

interface Plan {
  nombre: string;
  descripcion: string;
  precio: string;
  unidad?: string;
  detalle?: string;
  recomendado?: boolean;
}

const planesGrupales: Plan[] = [
  { nombre: '1 clase / semana', descripcion: 'Para crear el hábito y conocer el método.', precio: '115 €', unidad: '/mes' },
  { nombre: '2 clases / semana', descripcion: 'El ritmo ideal para notar cambios en fuerza, postura y movilidad.', precio: '190 €', unidad: '/mes', recomendado: true },
  { nombre: '3 clases / semana', descripcion: 'Para avanzar más rápido con un entrenamiento constante.', precio: '220 €', unidad: '/mes' },
];

const sesionesPrivadas: Plan[] = [
  { nombre: 'Bono 4 sesiones', descripcion: 'Para empezar con una base sólida o trabajar un objetivo concreto.', precio: '210 €', detalle: '52,50 € / sesión' },
  { nombre: 'Bono 8 sesiones', descripcion: 'Para un seguimiento continuo y personalizado.', precio: '400 €', detalle: '50 € / sesión' },
];

function PlanRow({ plan, delay }: { plan: Plan; delay: number }) {
  return (
    <div className={`flex justify-between items-start gap-6 border-b border-negro-move/20 py-6 reveal reveal-delay-${delay}`}>
      <dt className="mb-0">
        <span className="block font-sans font-medium text-[15px] text-texto-move">
          {plan.nombre}
          {plan.recomendado && (
            <span className="ml-3 align-[2px] inline-block rounded-[100px] border border-[#493523] px-[10px] py-[2px] text-[9px] uppercase tracking-[0.15em] text-[#493523] font-normal">
              Recomendado
            </span>
          )}
        </span>
        <span className="block mt-1 font-sans text-[13px] leading-[1.6] text-[#7F7763]">{plan.descripcion}</span>
      </dt>
      <dd className="mb-0 text-right shrink-0">
        <span className="price-highlight block">
          {plan.precio}
          {plan.unidad && <span className="text-sm font-sans font-light opacity-70">{plan.unidad}</span>}
        </span>
        {plan.detalle && <span className="block mt-1 font-sans text-[12px] text-[#7F7763]">{plan.detalle}</span>}
      </dd>
    </div>
  );
}

function SectionTitle({ first, italic }: { first: string; italic: string }) {
  return (
    <h2 className="mb-3 reveal font-serif font-normal text-[34px] md:text-[48px] leading-[1.1]">
      {first} <span className="italic">{italic}</span>
    </h2>
  );
}

export default function Pricing() {
  return (
    <div className="w-full pb-0">
      <section className="px-6 text-center max-w-4xl mx-auto section-padding-claro pb-0">
        <h1 className="mb-0 reveal">
          Encuentra <span className="italic">tu plan.</span>
        </h1>
      </section>

      {/* Clase de valoración */}
      <section className="max-w-4xl mx-auto px-6 pt-12 md:pt-16">
        <ClaseValoracion />
      </section>

      {/* Clases grupales */}
      <section className="max-w-4xl mx-auto px-6 section-padding-claro pb-0 text-negro-move">
        <SectionTitle first="Clases" italic="grupales" />
        <p className="font-sans text-[14px] text-texto-move mb-4 reveal reveal-delay-1">
          Pilates Reformer en Pozuelo de Alarcón, en grupos de máximo 4 personas. Clases de 50 minutos.
        </p>
        <dl className="mb-0">
          {planesGrupales.map((plan, i) => (
            <PlanRow key={plan.nombre} plan={plan} delay={i + 1} />
          ))}
        </dl>
        <p className="mt-4 mb-0 font-sans text-[12px] text-[#7F7763] reveal">Validez de 35 días.</p>
      </section>

      {/* Sesiones privadas */}
      <section className="max-w-4xl mx-auto px-6 section-padding-claro text-negro-move">
        <SectionTitle first="Sesiones" italic="privadas" />
        <p className="font-sans text-[14px] text-texto-move mb-4 reveal reveal-delay-1">
          Sesiones 1:1 de 50 minutos en Reformer Torre, diseñadas a tu medida, también para embarazo, posparto u objetivos concretos.
        </p>
        <dl className="mb-0">
          {sesionesPrivadas.map((plan, i) => (
            <PlanRow key={plan.nombre} plan={plan} delay={i + 1} />
          ))}
        </dl>

        <p className="mt-10 mb-0 font-sans text-[12px] leading-[1.7] text-[#7F7763] reveal">
          Todos los planes incluyen descuentos en eventos MOVE. Precios finales con impuestos incluidos.
        </p>

        <div className="mt-10 text-center reveal">
          <p className="font-serif italic text-[22px] text-negro-move mb-5">¿Tienes dudas sobre qué plan elegir?</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-primary inline-block">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      <Reviews />
    </div>
  );
}
