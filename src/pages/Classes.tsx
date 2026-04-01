import { useEffect } from 'react';
import clasesGrupales from '../assets/move-pilates-pozuelo-grupos-01.jpg';
import sesionesPrivadas from '../assets/move-pilates-madrid-05.jpg';

export default function Classes() {
  useEffect(() => {
    document.title = "Clases | MOVE Pilates Boutique Pozuelo de Alarcón";
  }, []);

  return (
    <div className="w-full">
      <section className="px-6 text-center max-w-4xl mx-auto section-padding-claro">
        <h1 className="mb-text-xl reveal font-serif text-[#493523] font-normal">
          Muévete bien. <span className="italic">Siéntete mejor.</span>
        </h1>
        <p className="reveal reveal-delay-1 mx-auto">
          Sesiones de Pilates Reformer en grupos reducidos y clases privadas, con atención personalizada para mejorar postura, fuerza, movilidad y control corporal.
        </p>
      </section>

      {/* Block A - Grupales */}
      <section className="bg-crema-base section-padding-claro px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 reveal">
            <img 
              src={clasesGrupales} 
              alt="Clases grupales de Pilates Reformer en MOVE · Pozuelo de Alarcón · Madrid" 
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-sm"
              style={{ objectPosition: 'center 20%' }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="order-1 md:order-2 md:pl-8 reveal reveal-delay-1">
            <h2 className="mb-text-lg text-negro-move">Clases Grupales</h2>
            <p className="text-texto-move font-sans mb-text-lg">
              Pilates Reformer en grupos reducidos · Máximo 4 personas · 50 minutos
            </p>
            <ul className="space-y-4 mb-section-md" role="list">
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-1">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Grupos reducidos de máximo 4 personas
              </li>
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-2">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Corrección técnica y ajustes individuales en cada clase
              </li>
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-3">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Progresión adaptada a tu nivel
              </li>
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-4">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Entrenamiento guiado, seguro y personalizado
              </li>
            </ul>
            
            <div className="border-t border-tostado pt-text-lg mb-text-lg reveal">
              <h3 className="tag-label mb-text-sm text-negro-move">IDEAL PARA</h3>
              <p className="text-[14px] leading-[1.75] text-texto-move mb-0">
                Nuestras clases grupales de Pilates Reformer en Pozuelo están pensadas para personas que quieren mejorar su postura, ganar fuerza, moverse con más control y entrenar en un entorno cuidado.<br aria-hidden="true" /><br aria-hidden="true" />
                No hace falta experiencia previa. Si empiezas desde cero, te guiamos desde el primer día. Si ya has practicado Pilates o vienes de otro deporte, adaptamos la sesión para que sigas progresando con seguridad.
              </p>
            </div>

            <div className="border-t border-tostado pt-text-lg reveal">
              <h3 className="tag-label mb-text-sm text-negro-move">ESPECIALIDADES</h3>
              <p className="text-[14px] leading-[1.75] text-texto-move mb-0">
                Dolor de espalda y postura: trabajamos fuerza profunda, movilidad y control corporal para ayudar a mejorar la postura y reducir tensiones.<br aria-hidden="true" /><br aria-hidden="true" />
                Deporte y rendimiento: un buen complemento para running, pádel, tenis, natación o fuerza, mejorando estabilidad, movilidad y control postural.<br aria-hidden="true" /><br aria-hidden="true" />
                Embarazo y postparto: acompañamiento adaptado a cada etapa, con un enfoque seguro, preciso y personalizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block B - Privadas */}
      <section className="bg-crema-base section-padding-claro px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="md:pr-8 reveal">
            <h2 className="text-negro-move mb-text-lg">Sesiones Privadas de Pilates Reformer</h2>
            <p className="text-texto-move font-sans mb-text-lg">
              Atención 1:1 · Valoración inicial · Plan adaptado a ti
            </p>
            <ul className="space-y-4 mb-section-md" role="list">
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-1">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Valoración inicial completa
              </li>
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-2">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Plan personalizado según tu cuerpo, nivel y objetivos
              </li>
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-3">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Ajustes sesión a sesión según tu evolución
              </li>
              <li className="flex items-center gap-3 mb-0 text-texto-move reveal reveal-delay-4">
                <span className="w-1.5 h-1.5 rounded-full bg-negro-move" aria-hidden="true"></span>
                Un entorno tranquilo, cuidado y sin prisas
              </li>
            </ul>
            
            <div className="border-t border-tostado pt-text-lg mb-text-lg reveal">
              <h3 className="tag-label mb-text-sm text-negro-move">IDEAL PARA</h3>
              <p className="text-[14px] leading-[1.75] text-texto-move mb-0">
                Las sesiones privadas de Pilates Reformer están pensadas para quienes buscan un trabajo más individualizado, ya sea por su momento físico, sus objetivos o su preferencia por una atención 1:1.<br aria-hidden="true" /><br aria-hidden="true" />
                Son una buena opción si quieres empezar con más acompañamiento, si vienes de una lesión y ya cuentas con el alta médica, o si necesitas una práctica adaptada con mayor precisión y control.
              </p>
            </div>

            <div className="border-t border-tostado pt-text-lg reveal">
              <h3 className="tag-label mb-text-sm text-negro-move">ENFOQUE DEPORTIVO</h3>
              <p className="text-[14px] leading-[1.75] text-texto-move mb-0">
                También son ideales para deportistas que quieren mejorar movilidad, estabilidad, control postural y calidad de movimiento como complemento a su entrenamiento.<br aria-hidden="true" /><br aria-hidden="true" />
                Trabajamos de forma específica para optimizar tu rendimiento en otras disciplinas, previniendo lesiones y mejorando la eficiencia de cada movimiento a través del control del core y la alineación.
              </p>
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <img 
              src={sesionesPrivadas} 
              alt="Sesiones privadas de Pilates Reformer en MOVE · Pozuelo de Alarcón · Madrid" 
              className="w-full aspect-[3/4] object-cover rounded-2xl shadow-sm"
              style={{ objectPosition: 'center 20%' }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Aviso sutil */}
      <div className="max-w-3xl mx-auto px-6 text-center pt-section-xl reveal">
        <p className="text-[12px] text-texto-move/70 leading-relaxed italic">
          Si estás en proceso de recuperación o tienes una lesión activa, es importante consultarlo antes de comenzar. En casos que lo requieran, trabajamos con alta médica para garantizar una práctica segura y bien adaptada.
        </p>
      </div>

      {/* CTA */}
      <section className="section-padding-claro px-6 text-center reveal">
        <h3 className="font-serif text-negro-move text-[24px] md:text-[32px] mb-8 italic">¿No sabes cuál es tu formato?</h3>
        <a 
          href="https://wa.me/34654495508" 
          target="_blank" 
          rel="noreferrer"
          className="btn-primary"
          aria-label="Contactar por WhatsApp para asesoramiento personalizado"
        >
          Te asesoramos
        </a>
      </section>
    </div>
  );
}
