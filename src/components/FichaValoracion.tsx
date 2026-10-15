import { VALORACION_PRECIO } from "../data/valoracion";

/* Ficha de la clase de valoración: precio, duración y el grupo reducido destacado.
   Compartida por el Home (bloque "¿Primera vez en MOVE?") y la página de Precios. */
export default function FichaValoracion({ className = "" }: { className?: string }) {
  return (
    <dl className={`pv-specs ${className}`}>
      <div>
        <dt>Precio</dt>
        <dd>{VALORACION_PRECIO} €</dd>
      </div>
      <div>
        <dt>Duración</dt>
        <dd>50 min</dd>
      </div>
      <div className="pv-spec-key">
        <dt>Grupo</dt>
        <dd>Máx. 4</dd>
        <dd className="pv-spec-note">personas por clase</dd>
      </div>
    </dl>
  );
}
