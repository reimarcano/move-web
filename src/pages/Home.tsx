import { useState, useEffect } from 'react';
import { Users, Clock, Sparkles, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reviews from '../components/Reviews';

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "MOVE Pilates Boutique | Pilates Reformer Pozuelo de Alarcón";
  }, []);

  const faqs = [
    {
      question: "¿Dónde está MOVE Pilates Boutique?",
      answer: "Estamos en Av. de Europa, 31, local 7, acceso desde Calle Berna. 28224 Pozuelo de Alarcón, Madrid. Fácil acceso desde Majadahonda, Boadilla del Monte y Las Rozas."
    },
    {
      question: "¿Puedo empezar si nunca he hecho Pilates Reformer?",
      answer: "Sí. No hace falta experiencia previa. Al trabajar con grupos de máximo 4 personas, podemos guiarte desde el primer día, adaptar cada ejercicio a tu nivel y asegurarnos de que progresas con seguridad y confianza."
    },
    {
      question: "¿Qué beneficios tiene el Pilates Reformer?",
      answer: "El Pilates Reformer mejora la postura, fortalece el core y la musculatura profunda, aumenta la movilidad articular y mejora el control corporal. Es una disciplina muy eficaz para ganar fuerza, estabilidad y consciencia corporal, y para moverte con más control tanto en tu rutina diaria como en otros deportes. Además, el Pilates Reformer puede adaptarse a personas que buscan trabajar con cuidado si tienen molestias de espalda, lumbares o cervicales, a deportistas que quieren mejorar movilidad y rendimiento, y a mujeres en embarazo o postparto, siempre valorando cada caso con prudencia. En MOVE Pilates Boutique, en Pozuelo de Alarcón, trabajamos en grupos reducidos de máximo 4 personas y sesiones privadas para ofrecer una atención realmente personalizada."
    },
    {
      question: "¿Ayuda el Pilates Reformer con el dolor de espalda?",
      answer: "Sí. Trabajamos la fuerza profunda, la movilidad y el control postural de forma progresiva y segura. Muchas alumnas de MOVE han reducido sus molestias lumbares y cervicales con una práctica constante. Si tienes una lesión activa, te orientamos sobre el formato más adecuado para ti."
    },
    {
      question: "¿Cuántas personas hay por clase?",
      answer: "En MOVE trabajamos con grupos de máximo 4 personas. Esto nos permite corregir, ajustar y progresar contigo en cada sesión, algo imposible en clases masificadas. Es la base de nuestra propuesta: atención real, no atención simulada."
    },
    {
      question: "¿Ofrecéis Pilates para embarazo?",
      answer: "Sí. Ofrecemos un programa específico para embarazo: trabajamos respiración, movilidad y estabilidad con ejercicios adaptados a cada etapa, de forma segura y personalizada. Escríbenos y te contamos cómo podemos acompañarte."
    },
    {
      question: "¿Ofrecéis Pilates para postparto?",
      answer: "Sí. Acompañamos la vuelta al movimiento paso a paso, cuidando especialmente el core profundo y el suelo pélvico. Siempre dentro de tus rangos y según cómo te sientas cada día. Consúltanos antes de empezar para orientarte bien según tu momento de recuperación."
    },
    {
      question: "¿Tenéis clase de prueba?",
      answer: "Sí. Como cortesía, te invitamos a descubrir nuestro método con una clase de bienvenida sin coste. Escríbenos por WhatsApp al +34 654 49 55 08 para confirmar disponibilidad."
    },
    {
      question: "¿Cuáles son las tarifas de Move Pilates Reformer en Pozuelo?",
      answer: "Clases grupales (máx. 4 personas): 115 €/mes con 1 sesión por semana · 190 €/mes con 2 sesiones · 220 €/mes con 3 sesiones. Sesiones privadas 1:1: Bono 4 sesiones por 210 € · Bono 8 sesiones por 400 €. Todos los planes incluyen descuentos en eventos MOVE y tienen caducidad de 35 días."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
              src="/assets/move_portada_pilates pozuelo.jpg" 
              alt="Estudio de Pilates Reformer MOVE en Pozuelo de Alarcón" 
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
              referrerPolicy="no-referrer"
            />
        </div>
        
        <div 
          className="absolute left-1/2 -translate-x-1/2 text-center w-full max-w-[900px] z-10 px-6 md:px-10 top-[5%]"
        >
          <h1 className="mb-0 reveal font-serif text-negro-move font-normal">
  Tu centro de <span className="italic">Pilates Reformer</span>
  <br />
  en Pozuelo de Alarcón
</h1>

<p className="reveal reveal-delay-1 mt-3 text-negro-move max-w-[700px] mx-auto">
  Pilates Reformer con grupos reducidos de máximo 4 personas,
  <br />
  sesiones privadas y atención personalizada.
</p>
          <div className="reveal reveal-delay-1 mt-4">
            <a 
              href="https://wa.me/34654495508" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block border-[1.5px] rounded-[100px] transition-all duration-300 ease-in-out hover:bg-[#493523] hover:text-[#F6F3EC] hover:border-[#493523] hover:-translate-y-[1px]"
              aria-label="Reservar tu primera clase por WhatsApp"
              style={{
                background: 'transparent',
                color: '#493523',
                borderColor: '#493523',
                padding: '14px 32px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Reserva tu primera clase
            </a>
          </div>
        </div>
      </section>


      {/* Philosophy Section */}
      <section className="section-padding-oscuro px-6 bg-marron-move text-crema-move text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-crema-move mb-0 font-serif italic reveal">
            “Move no es solo un estudio de Pilates Reformer, es un refugio en Pozuelo de Alarcón diseñado con intención, sensibilidad y propósito. Un espacio donde cada detalle está pensado para invitarte a reconectar contigo.”
          </h2>
          <div className="mt-section-lg flex flex-col items-center reveal reveal-delay-2">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-crema-move/20 shadow-2xl">
              <img 
                src="/assets/foto genesis.jpg" 
                alt="Retrato de Génesis Romero, fundadora de MOVE Pilates Boutique"
                className="w-full h-full object-cover"
                style={{ 
                  objectPosition: 'center 42%',
                  transform: 'scale(1.4)'
                }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="font-sans text-[13px] text-crema-move/55 text-center tracking-[0.05em] mb-0">Génesis Romero</p>
              <p className="font-sans text-[11px] text-crema-move/55 text-center uppercase tracking-[0.1em] mb-0">Fundadora de MOVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-tostado section-padding-oscuro px-6">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-center text-negro-move mb-text-lg reveal">
            Preguntas frecuentes
          </h2>
          <div className="w-10 h-[1px] bg-negro-move mx-auto mb-section-md reveal reveal-delay-1"></div>
 
          <div className="border-b border-negro-move reveal reveal-delay-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border-t border-negro-move">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-[22px] text-left group"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="faq-question text-negro-move">
                    {faq.question}
                  </span>
                  <span 
                    className={`text-[18px] text-negro-move font-light transition-transform duration-[350ms] ease-in-out ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-[400ms] ease-in-out ${
                    openIndex === index ? 'max-h-[160px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pr-10 pb-[22px] faq-answer text-negro-move/75">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
 
          <div className="mt-section-md text-center reveal">
            <h3 className="font-serif text-negro-move text-[22px] mb-text-md italic">
              ¿Tienes más preguntas?
            </h3>
            <a 
              href="https://wa.me/34654495508" 
              target="_blank" 
              rel="noreferrer"
              className="btn-primary"
              aria-label="Escríbenos por WhatsApp para más información"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Reviews />
    </div>
  );
}

