import type { ReactNode } from 'react';
import { CookieSettingsButton } from '../components/CookieConsent';

const LAST_UPDATED = '11 de agosto de 2026';

function LegalLayout({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="bg-crema-base">
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center md:pb-16 md:pt-24">
        <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#7F7763]">{eyebrow}</p>
        <h1 className="mb-0">{title}</h1>
      </section>
      <article className="mx-auto max-w-3xl px-6 pb-20 md:pb-28">
        <div className="rounded-[8px] border border-[#D8D0BF] bg-[#F0EADE] px-6 py-7 md:px-10 md:py-10">
          {children}
          <p className="mb-0 mt-10 border-t border-[#D8D0BF] pt-5 text-[12px] text-[#7F7763]">Última actualización: {LAST_UPDATED}.</p>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mb-9 last:mb-0"><h2 className="mb-3 text-[24px] md:text-[27px]">{title}</h2>{children}</section>;
}

export function LegalNotice() {
  return (
    <LegalLayout eyebrow="Información legal" title="Aviso legal">
      <Section title="Titular del sitio web">
        <p>Este sitio web, movepilatesboutique.com, es titularidad de <strong>Génesis Romero Primera</strong>, profesional autónoma con NIF <strong>52052482D</strong>.</p>
        <p className="mb-0">Domicilio del establecimiento: Av. de Europa, 31, local 7 · Acceso desde Calle Berna · 28224 Pozuelo de Alarcón, Madrid. Correo de contacto: <a href="mailto:movebygenesis@gmail.com">movebygenesis@gmail.com</a>. Teléfono: <a href="tel:+34654495508">+34 654 49 55 08</a>.</p>
      </Section>
      <Section title="Objeto y uso del sitio"><p className="mb-0">La web informa sobre los servicios de MOVE Pilates Boutique. El uso de sus contenidos se realiza bajo la responsabilidad de la persona usuaria, que se compromete a hacerlo de forma lícita y respetuosa.</p></Section>
      <Section title="Propiedad intelectual"><p className="mb-0">Los textos, imágenes, diseño, logotipos y demás contenidos del sitio están protegidos por la normativa aplicable. No se permite su reproducción, distribución o transformación sin autorización previa de su titular, salvo en los casos permitidos por ley.</p></Section>
      <Section title="Enlaces externos"><p className="mb-0">La web puede incluir enlaces a sitios de terceros, como WhatsApp, Google Maps o redes sociales. MOVE Pilates Boutique no controla sus políticas ni sus contenidos; consulta sus condiciones y políticas de privacidad antes de utilizarlos.</p></Section>
      <Section title="Normativa aplicable"><p className="mb-0">Este aviso se rige por la legislación española. Para cualquier cuestión relativa al sitio puedes contactar a través del correo indicado anteriormente.</p></Section>
    </LegalLayout>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout eyebrow="Protección de datos" title="Política de privacidad">
      <Section title="Responsable del tratamiento"><p><strong>Responsable:</strong> Génesis Romero Primera.</p><p className="mb-0"><strong>Contacto:</strong> <a href="mailto:movebygenesis@gmail.com">movebygenesis@gmail.com</a>. Dirección: Av. de Europa, 31, local 7 · Acceso desde Calle Berna · 28224 Pozuelo de Alarcón, Madrid.</p></Section>
      <Section title="Alcance y datos tratados"><p className="mb-0">Esta política se aplica a los datos recogidos a través de esta web. Tratamos los datos identificativos y de contacto que facilites voluntariamente al escribir por correo, teléfono, WhatsApp u otros canales enlazados desde la web, así como datos de navegación únicamente cuando aceptes las categorías opcionales correspondientes.</p></Section>
      <Section title="Finalidades y base jurídica"><ul className="space-y-2 pl-5 text-[15px] leading-[1.75] text-[#493523]"><li>Atender consultas y solicitudes de información remitidas por la persona interesada: aplicación de medidas precontractuales solicitadas o, cuando no exista una relación precontractual, consentimiento derivado de su solicitud.</li><li>Medir de forma agregada el uso de la web con Google Analytics: consentimiento.</li><li>Mostrar el mapa integrado de Google: consentimiento.</li></ul></Section>
      <Section title="Datos necesarios y conservación"><p>Facilitar datos de contacto es voluntario, pero necesario para que podamos responder o gestionar una solicitud concreta. Si no los facilitas, no podremos atenderla por ese canal.</p><p className="mb-0">Las consultas y solicitudes se conservan durante un máximo de 12 meses desde el último contacto, salvo que surja una relación contractual o exista una obligación legal de conservación. La elección de cookies se guarda durante 12 meses. Los datos analíticos se tratan según la configuración de Google Analytics mientras mantengas tu consentimiento.</p></Section>
      <Section title="Destinatarios y transferencias"><p>Los datos no se venden ni se ceden a terceros, salvo obligación legal. Pueden acceder a ellos proveedores necesarios para prestar el servicio, como alojamiento web y correo electrónico, bajo las garantías aplicables.</p><p className="mb-0">Si aceptas Google Analytics o Google Maps, Google tratará información técnica y de navegación. Si eliges contactar por WhatsApp o redes sociales, esos servicios tratarán los datos que les facilites. Estos proveedores pueden realizar transferencias internacionales; consulta las garantías y políticas de <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a> y <a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noreferrer">WhatsApp</a>.</p></Section>
      <Section title="Decisiones automatizadas"><p className="mb-0">No se adoptan decisiones automatizadas, incluida la elaboración de perfiles, que produzcan efectos jurídicos sobre las personas usuarias o les afecten significativamente de forma similar.</p></Section>
      <Section title="Tus derechos"><p className="mb-0">Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a <a href="mailto:movebygenesis@gmail.com">movebygenesis@gmail.com</a>. También puedes retirar el consentimiento en cualquier momento sin afectar al tratamiento previo. Si consideras que tus derechos no han sido atendidos, puedes reclamar ante la <a href="https://www.aepd.es/" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos</a>.</p></Section>
    </LegalLayout>
  );
}

export function CookiePolicy() {
  return (
    <LegalLayout eyebrow="Cookies" title="Política de cookies">
      <Section title="Información esencial"><p className="mb-0">MOVE Pilates Boutique usa una tecnología necesaria para recordar tu elección y, sólo si lo autorizas, tecnologías de Google para analítica y mapa. No se instalan cookies opcionales antes de tu elección.</p></Section>
      <Section title="Tecnologías utilizadas">
        <div className="overflow-x-auto"><table className="w-full min-w-[580px] border-collapse text-left text-[13px] leading-[1.55] text-[#493523]"><thead><tr className="border-b border-[#D8D0BF] text-[11px] uppercase tracking-[0.08em] text-[#7F7763]"><th className="p-2">Tecnología</th><th className="p-2">Titular</th><th className="p-2">Finalidad</th><th className="p-2">Duración</th></tr></thead><tbody><tr className="border-b border-[#D8D0BF]/70"><td className="p-2"><code>move-cookie-consent-v2</code></td><td className="p-2">MOVE</td><td className="p-2">Recordar la elección de privacidad.</td><td className="p-2">12 meses</td></tr><tr className="border-b border-[#D8D0BF]/70"><td className="p-2"><code>_ga</code>, <code>_ga_*</code></td><td className="p-2">Google Analytics</td><td className="p-2">Medición agregada del uso de la web.</td><td className="p-2">Hasta 2 años, según la configuración de Google</td></tr><tr><td className="p-2">Cookies y almacenamiento de Google Maps</td><td className="p-2">Google Maps</td><td className="p-2">Mostrar el mapa integrado.</td><td className="p-2">Variable; consulta la política de Google</td></tr></tbody></table></div>
      </Section>
      <Section title="Cómo elegir o retirar el consentimiento"><p>Puedes aceptar o rechazar por separado la analítica y el mapa. Puedes modificar o retirar tu elección en cualquier momento; al retirar la analítica se elimina la cookie de Google Analytics disponible en el navegador y se detiene su carga futura.</p><CookieSettingsButton className="btn-outline text-[10px]" /></Section>
      <Section title="Más información"><p className="mb-0">La información de Google se rige por su <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">política de privacidad</a>. Si cambian las finalidades o los terceros, actualizaremos esta política y solicitaremos una nueva elección cuando sea necesario.</p></Section>
    </LegalLayout>
  );
}
