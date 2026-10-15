import { Link } from "react-router-dom";
import { planesGrupales, planWhatsappUrl, ventajasGrupales } from "../data/planes";

/* Home: planes de clases grupales en tarjetas con nombre propio; el más elegido, en marrón */
export default function PlanesGrupales() {
  return (
    <section className="planes" aria-labelledby="planes-titulo">
      <div className="pl-head">
        <span className="pv-eyebrow reveal">Tarifas · Clases grupales</span>
        <h2 id="planes-titulo" className="pl-title reveal reveal-delay-1">
          Encuentra <em>tu ritmo.</em>
        </h2>
        <p className="pl-intro reveal reveal-delay-2">
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
              <b>{plan.precio} €</b>
              <span>/ mes</span>
            </p>
            <p className="pl-per">{plan.porClase} por clase</p>
            <ul className="pl-perks">
              {ventajasGrupales.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            <a
              href={planWhatsappUrl(plan)}
              target="_blank"
              rel="noreferrer"
              className="pl-btn"
              aria-label={`Elegir el plan ${plan.nombre} por WhatsApp`}
            >
              Elegir {plan.nombre}
            </a>
          </article>
        ))}
      </div>

      <div className="pl-foot reveal">
        <span>¿Prefieres sesiones privadas 1:1? Bonos desde 210 €.</span>
        <Link to="/precios">Ver todas las tarifas →</Link>
      </div>
    </section>
  );
}
