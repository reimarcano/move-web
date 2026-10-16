import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCookieConsent } from '../components/CookieConsent';

const horario = [
  { dias: 'Lunes y Miércoles', horas: '8:00 – 21:00' },
  { dias: 'Martes y Jueves', horas: '9:00 – 21:00' },
  { dias: 'Viernes', horas: '8:00 – 14:00 | 17:00 – 18:00' },
  { dias: 'Sáb · Dom', horas: 'Cerrado' },
];

const socialClass = 'ct-social w-[44px] h-[44px] rounded-full bg-dark flex items-center justify-center text-base';

/* Una línea de la ficha: icono a la izquierda y el dato al lado */
function Dato({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="ct-dato">
      <Icon className="text-mid shrink-0 mt-[3px]" size={18} aria-hidden="true" />
      <div className="flex-1 text-left">{children}</div>
    </div>
  );
}

export default function Contacto() {
  const { mapsAllowed, openPreferences } = useCookieConsent();
  return (
    <div className="w-full">
      <section className="m-section">
        <div className="m-head">
          <span className="m-eyebrow reveal">Contacto</span>
          <h1 className="m-title text-display reveal reveal-delay-1">
            Estamos aquí <em>para ti.</em>
          </h1>
          <p className="m-intro reveal reveal-delay-2">
            Elige cómo quieres contactar con MOVE Pilates Boutique en Pozuelo de Alarcón.
          </p>
        </div>

        {/* Ficha de contacto */}
        <div className="m-card ct-card reveal">
          <span className="m-eyebrow text-center">Información de contacto</span>
          <h2 className="m-title text-center">
            Ven a <em>conocernos.</em>
          </h2>

          <div className="ct-datos">
            <Dato icon={MapPin}>
              <p className="m-text text-dark">
                Av. de Europa, 31, local 7<br />
                Acceso desde Calle Berna<br />
                28224 Pozuelo de Alarcón, Madrid
              </p>
            </Dato>

            <Dato icon={Phone}>
              <a href="tel:+34654495508" className="ct-link">+34 654 49 55 08</a>
            </Dato>

            <Dato icon={Mail}>
              <a href="mailto:movebygenesis@gmail.com" className="ct-link">movebygenesis@gmail.com</a>
            </Dato>

            <Dato icon={Clock}>
              <dl className="ct-horario">
                {horario.map((h) => (
                  <div key={h.dias} className="contents">
                    <dt>{h.dias}</dt>
                    <dd>{h.horas}</dd>
                  </div>
                ))}
              </dl>
            </Dato>
          </div>

          <div className="ct-bloque">
            <a
              href="https://wa.me/34654495508"
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full md:w-auto"
            >
              Escribir por WhatsApp
            </a>
          </div>

          <div className="ct-bloque">
            <div className="flex justify-center gap-4">
              <a
                href="https://instagram.com/move.pilatesboutique"
                target="_blank"
                rel="noreferrer"
                className={socialClass}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@movepilatesboutique"
                target="_blank"
                rel="noreferrer"
                className={socialClass}
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
            <p className="m-text text-small max-w-[280px] mx-auto mt-4">
              Síguenos en Instagram y TikTok para ver cómo se vive el movimiento en MOVE.
            </p>
          </div>
        </div>
      </section>

      {/* Mapa: cinta a sangre */}
      <section className="m-band ct-map">
        {mapsAllowed ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.471644747444!2d-3.8057241!3d40.4354898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4187ede06d0267%3A0x6d55b452244d1c6a!2sMOVE%20Pilates%20Boutique!5e0!3m2!1ses!2ses!4v1710165000000!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de MOVE Pilates Boutique"
          ></iframe>
        ) : (
          <div className="ct-map-off">
            <p className="m-title-sm m-title-light">Encuéntranos en <em>Pozuelo.</em></p>
            <p className="m-text text-small max-w-md">
              El mapa de Google está desactivado hasta que aceptes las cookies opcionales.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <button type="button" onClick={openPreferences} className="btn-outline-inverted">Configurar cookies</button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Av.+de+Europa+31,+local+7,+28224+Pozuelo+de+Alarc%C3%B3n"
                target="_blank"
                rel="noreferrer"
                className="text-label text-base underline underline-offset-4"
              >
                Abrir ubicación en Google Maps
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
