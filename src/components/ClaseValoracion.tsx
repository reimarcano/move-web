import { VALORACION_PRECIO, VALORACION_WHATSAPP_URL } from "../data/valoracion";

/* Tarjeta de la clase de valoración, compartida por Home y Precios */
export default function ClaseValoracion() {
  return (
    <div className="bg-[#493523] text-[#F6F3EC] rounded-[8px] px-7 py-9 md:px-12 md:py-11 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7 lg:gap-10 reveal">
      <div className="max-w-[560px]">
        <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#F6F3EC]/80 block mb-3">
          Empieza aquí · {VALORACION_PRECIO} €
        </span>
        <h2 className="font-serif font-normal text-[#F6F3EC] text-[30px] md:text-[40px] leading-[1.15] mb-4">
          Clase de <span className="italic">valoración</span>
        </h2>
        <p className="font-sans text-[14px] leading-[1.7] text-[#F6F3EC]/90 mb-0">
          Tu clase de prueba de 50 minutos: conocemos tu nivel, tu postura y tus objetivos para
          recomendarte el plan que mejor encaja contigo. Si te apuntas, descontamos los{" "}
          {VALORACION_PRECIO} € de tu primer mes o bono.
        </p>
      </div>
      <a
        href={VALORACION_WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Reservar clase de valoración por WhatsApp"
        className="shrink-0 self-start lg:self-center inline-block rounded-[100px] bg-[#F6F3EC] text-[#493523] uppercase tracking-[0.12em] text-[12px] font-sans px-8 py-[14px] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#F0EADE]"
      >
        Reservar mi clase
      </a>
    </div>
  );
}
