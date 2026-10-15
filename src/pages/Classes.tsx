import clasesGrupales from "../assets/move-pilates-pozuelo-grupos-01.webp";
import sesionesPrivadas from "../assets/move-pilates-madrid-05.webp";

interface Formato {
  foto: string;
  alt: string;
  antetitulo: string;
  titulo: string;
  cursiva: string;
  ficha: string;
  ventajas: string[];
  bloques: { titulo: string; parrafos: string[] }[];
  /* Foto a la derecha en escritorio */
  fotoDerecha?: boolean;
}

const formatos: Formato[] = [
  {
    foto: clasesGrupales,
    alt: "Clases grupales de Pilates Reformer en MOVE · Pozuelo de Alarcón · Madrid",
    antetitulo: "Clases grupales · Máx. 4 personas",
    titulo: "Pilates Reformer",
    cursiva: "en grupo.",
    ficha: "Pilates Reformer en grupos reducidos · Máximo 4 personas · 50 minutos",
    ventajas: [
      "Grupos reducidos de máximo 4 personas",
      "Corrección técnica y ajustes individuales en cada clase",
      "Progresión adaptada a tu nivel",
      "Entrenamiento guiado, seguro y personalizado",
    ],
    bloques: [
      {
        titulo: "Ideal para",
        parrafos: [
          "Nuestras clases grupales de Pilates Reformer en Pozuelo están pensadas para personas que quieren mejorar su postura, ganar fuerza, moverse con más control y entrenar en un entorno cuidado.",
          "No hace falta experiencia previa. Si empiezas desde cero, te guiamos desde el primer día. Si ya has practicado Pilates o vienes de otro deporte, adaptamos la sesión para que sigas progresando con seguridad.",
        ],
      },
      {
        titulo: "Especialidades",
        parrafos: [
          "Dolor de espalda y postura: trabajamos fuerza profunda, movilidad y control corporal para ayudar a mejorar la postura y reducir tensiones.",
          "Deporte y rendimiento: un buen complemento para running, pádel, tenis, natación o fuerza, mejorando estabilidad, movilidad y control postural.",
          "Embarazo y postparto: acompañamiento adaptado a cada etapa, con un enfoque seguro, preciso y personalizado.",
        ],
      },
    ],
  },
  {
    foto: sesionesPrivadas,
    alt: "Sesiones privadas de Pilates Reformer en MOVE · Pozuelo de Alarcón · Madrid",
    antetitulo: "Sesiones privadas · 1 a 1",
    titulo: "Pilates Reformer",
    cursiva: "solo para ti.",
    ficha: "Atención 1:1 · Valoración inicial · Plan adaptado a ti",
    ventajas: [
      "Valoración inicial completa",
      "Plan personalizado según tu cuerpo, nivel y objetivos",
      "Ajustes sesión a sesión según tu evolución",
      "Un entorno tranquilo, cuidado y sin prisas",
    ],
    bloques: [
      {
        titulo: "Ideal para",
        parrafos: [
          "Las sesiones privadas de Pilates Reformer están pensadas para quienes buscan un trabajo más individualizado, ya sea por su momento físico, sus objetivos o su preferencia por una atención 1:1.",
          "Son una buena opción si quieres empezar con más acompañamiento, si vienes de una lesión y ya cuentas con el alta médica, o si necesitas una práctica adaptada con mayor precisión y control.",
        ],
      },
      {
        titulo: "Enfoque deportivo",
        parrafos: [
          "También son ideales para deportistas que quieren mejorar movilidad, estabilidad, control postural y calidad de movimiento como complemento a su entrenamiento.",
          "Trabajamos de forma específica para optimizar tu rendimiento en otras disciplinas, previniendo lesiones y mejorando la eficiencia de cada movimiento a través del control del core y la alineación.",
        ],
      },
    ],
    fotoDerecha: true,
  },
];

/* Un formato de clase: foto + ficha, ventajas y bloques de detalle */
function FormatoClase({ formato }: { formato: Formato }) {
  return (
    <div className={`cl-row${formato.fotoDerecha ? " is-flipped" : ""}`}>
      <figure className="cl-photo reveal">
        <img src={formato.foto} alt={formato.alt} loading="lazy" decoding="async" />
      </figure>

      <div className="cl-copy">
        <span className="m-eyebrow reveal">{formato.antetitulo}</span>
        <h2 className="m-title reveal reveal-delay-1">
          {formato.titulo} <em>{formato.cursiva}</em>
        </h2>
        <p className="cl-ficha reveal reveal-delay-1">{formato.ficha}</p>

        <ul className="m-list cl-list">
          {formato.ventajas.map((v, i) => (
            <li key={v} className={`reveal reveal-delay-${i + 1}`}>{v}</li>
          ))}
        </ul>

        {formato.bloques.map((bloque) => (
          <div key={bloque.titulo} className="cl-block reveal">
            <h3 className="m-eyebrow">{bloque.titulo}</h3>
            {bloque.parrafos.map((p) => (
              <p key={p} className="m-text">{p}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Classes() {
  return (
    <div className="w-full">
      <section className="m-section">
        <div className="m-head">
          <span className="m-eyebrow reveal">Nuestras clases</span>
          <h1 className="m-title text-display reveal reveal-delay-1">
            Pilates Reformer en <em>Pozuelo de Alarcón.</em>
          </h1>
          <p className="m-intro reveal reveal-delay-2">
            Sesiones de Pilates Reformer en grupos reducidos y clases privadas, con atención
            personalizada para mejorar postura, fuerza, movilidad y control corporal.
          </p>
        </div>

        <FormatoClase formato={formatos[0]} />
      </section>

      <section className="m-section pt-0">
        <FormatoClase formato={formatos[1]} />
      </section>

      {/* Aviso y cierre */}
      <section className="m-section pt-0">
        <div className="m-foot mt-0 reveal">
          <p className="cl-aviso">
            Si estás en proceso de recuperación o tienes una lesión activa, es importante
            consultarlo antes de comenzar. En casos que lo requieran, trabajamos con alta médica
            para garantizar una práctica segura y bien adaptada.
          </p>
          <p className="m-closing">¿No sabes cuál es tu formato?</p>
          <a
            href="https://wa.me/34654495508"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            aria-label="Contactar por WhatsApp para asesoramiento personalizado"
          >
            Te asesoramos
          </a>
        </div>
      </section>
    </div>
  );
}
