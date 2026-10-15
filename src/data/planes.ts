export interface PlanGrupal {
  nombre: string;
  frecuencia: string;
  lema: string;
  precio: number;
  porClase: string;
  masElegido?: boolean;
}

/* Planes de clases grupales: los mismos nombres en el Home y en Precios */
export const planesGrupales: PlanGrupal[] = [
  { nombre: "Movimiento", frecuencia: "1 clase / semana", lema: "Tu momento de la semana.", precio: 115, porClase: "28,75 €" },
  { nombre: "Transición", frecuencia: "2 clases / semana", lema: "Constancia que se nota.", precio: 190, porClase: "23,75 €", masElegido: true },
  { nombre: "Transformación", frecuencia: "3 clases / semana", lema: "Tu práctica, a fondo.", precio: 220, porClase: "18,33 €" },
];

export const ventajasGrupales = ["Grupos de máx. 4 personas", "Validez de 35 días", "Descuentos en eventos MOVE"];

export const planWhatsappUrl = (plan: PlanGrupal) =>
  "https://wa.me/34654495508?text=" +
  encodeURIComponent(
    `Hola, me interesa el plan ${plan.nombre} (${plan.frecuencia}) de MOVE Pilates Boutique. ¿Podéis indicarme disponibilidad?`
  );
