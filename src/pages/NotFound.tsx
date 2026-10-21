import { Link } from 'react-router-dom';
import { VALORACION_WHATSAPP_URL } from '../data/valoracion';

/* Ruta que no existe. Se publica como dist/404.html (scripts/prerender.ts) y Vercel la
   sirve con estado 404, así los buscadores no indexan direcciones inventadas. */
export default function NotFound() {
  return (
    <div className="w-full">
      <section className="m-section">
        <div className="m-head">
          <span className="m-eyebrow reveal">Error 404</span>
          <h1 className="m-title text-display reveal reveal-delay-1">
            Esta página <em>no existe.</em>
          </h1>
          <p className="m-intro reveal reveal-delay-2">
            Puede que el enlace haya cambiado. Te dejamos por dónde seguir.
          </p>
        </div>

        <div className="m-foot reveal">
          <Link to="/" className="btn-primary">
            Ir al inicio
          </Link>
          <Link to="/clases" className="btn-outline">
            Ver las clases
          </Link>
          <a href={VALORACION_WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-outline">
            Reservar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
