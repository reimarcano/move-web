import { Link } from "react-router-dom";
import { planesGrupales, planWhatsappUrl, ventajasGrupales } from "../data/planes";

/* Home: planes de clases grupales como columnas editoriales, sin tarjetas y en orden
   (1, 2 y 3 clases por semana). Los filetes que las separan se dibujan al entrar; el más
   elegido lleva su etiqueta sobre un filete superior y el botón lleno. Lo que comparten
   los tres planes se dice una sola vez, debajo. */
export default function PlanesGrupales() {
  return (
    <section className="m-section" aria-labelledby="planes-titulo">
      <div className="m-head">
        <span className="m-eyebrow reveal">Tarifas · Clases grupales</span>
        <h2 id="planes-titulo" className="m-title reveal reveal-delay-1">
          Encuentra <em>tu ritmo.</em>
        </h2>
        <p className="m-intro reveal reveal-delay-2">
          Tres formas de hacer del Reformer parte de tu semana. Siempre en grupos de máximo 4
          personas.
        </p>
      </div>

      <div className="pl-grid">
        {planesGrupales.map((plan, i) => (
          <article
            key={plan.nombre}
            className={`pl-card reveal reveal-delay-${i + 1}${plan.masElegido ? " is-key" : ""}`}
          >
            {plan.masElegido && <span className="pl-badge">Más elegido</span>}
            <span className="pl-freq">{plan.frecuencia}</span>
            <h3>{plan.nombre}</h3>
            <p className="pl-lema">{plan.lema}</p>
            <p className="pl-price">
              <b>{plan.precio}</b>
              <span>/ mes</span>
            </p>
            {/* El precio por clase, justo debajo del total: se leen juntos */}
            <p className="pl-per">{plan.porClase} por clase</p>
            <a
              href={planWhatsappUrl(plan)}
              target="_blank"
              rel="noreferrer"
              className={`pl-btn ${plan.masElegido ? "btn-primary" : "btn-outline"}`}
              aria-label={`Elegir el plan ${plan.nombre} por WhatsApp`}
            >
              Elegir {plan.nombre}
            </a>
          </article>
        ))}
      </div>

      <div className="pl-incluye reveal">
        <span className="m-eyebrow">Todos los planes incluyen</span>
        <ul>
          {ventajasGrupales.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="m-foot reveal">
        <p className="m-closing">¿Prefieres sesiones privadas 1:1? Bonos desde 210 €.</p>
        <Link to="/precios" className="btn-outline">
          Ver todas las tarifas
        </Link>
      </div>
    </section>
  );
}
