import React, { useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';

export default function Contacto() {
  useEffect(() => {
    document.title = "Contacto | MOVE Pilates Boutique Pozuelo de Alarcón";
  }, []);

  return (
    <div className="bg-crema-base min-h-screen pb-0">
      {/* Header Section */}
      <section className="px-6 max-w-4xl mx-auto text-center section-padding-claro">
        <h1 className="mb-text-xl">
          Estamos aquí para ti.
        </h1>
        <p className="mb-0">
        Elige cómo quieres contactar con MOVE Pilates Boutique en Pozuelo de Alarcón.
        </p>
      </section>

      {/* Contact Info Section */}
      <section className="max-w-7xl mx-auto px-6 section-padding-claro pt-0">
        <div className="flex justify-center">
          {/* Info Card */}
          <div className="bg-[#F0EADE] border border-[#D8D0BF] rounded-[8px] p-[32px_24px] md:p-[48px] flex flex-col max-w-2xl w-full">
            <h2 className="font-serif text-[28px] md:text-[32px] text-[#493523] font-normal mb-10 text-center">
              Información de contacto
            </h2>
            
            <div className="w-full flex flex-col items-center">
              <div className="w-fit">
                {/* DIRECCIÓN */}
                <div className="flex items-start gap-3 md:gap-4 mb-6 md:mb-7">
                  <div className="w-5 shrink-0 mt-[2px]">
                    <MapPin className="text-[#7F7763]" size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-sans text-[14px] text-[#493523] leading-[1.8] mb-0">
                      Av. de Europa, 31, local 7<br />
                      Acceso desde Calle Berna<br />
                      28224 Pozuelo de Alarcón, Madrid
                    </p>
                  </div>
                </div>

                {/* TELÉFONO */}
                <div className="flex items-start gap-3 md:gap-4 mb-6 md:mb-7">
                  <div className="w-5 shrink-0 mt-[2px]">
                    <Phone className="text-[#7F7763]" size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <a href="tel:+34654495508" className="font-sans text-[14px] text-[#493523] hover:text-[#7F7763] transition-all duration-200 no-underline">
                      +34 654 49 55 08
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-start gap-3 md:gap-4 mb-6 md:mb-7">
                  <div className="w-5 shrink-0 mt-[2px]">
                    <Mail className="text-[#7F7763]" size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <a href="mailto:movebygenesis@gmail.com" className="font-sans text-[14px] text-[#493523] hover:text-[#7F7763] transition-all duration-200 no-underline">
                      movebygenesis@gmail.com
                    </a>
                  </div>
                </div>

                {/* HORARIO */}
                <div className="flex items-start gap-3 md:gap-4 mb-6 md:mb-7">
                  <div className="w-5 shrink-0 mt-[2px]">
                    <Clock className="text-[#7F7763]" size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 w-full">
                      <span className="font-sans text-[13px] text-[#7F7763] min-w-[140px]">Lun · Mar · Jue</span>
                      <span className="font-sans text-[13px] text-[#493523] text-right">8:00 – 20:00</span>
                      
                      <span className="font-sans text-[13px] text-[#7F7763] min-w-[140px]">Miércoles</span>
                      <span className="font-sans text-[13px] text-[#493523] text-right">8:00 – 16:00</span>
                      
                      <span className="font-sans text-[13px] text-[#7F7763] min-w-[140px]">Viernes</span>
                      <span className="font-sans text-[13px] text-[#493523] text-right">8:00 – 14:00</span>
                      
                      <span className="font-sans text-[13px] text-[#7F7763] min-w-[140px]">Sáb · Dom</span>
                      <span className="font-sans text-[13px] text-[#493523] text-right">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Separador antes del botón WhatsApp */}
              <div className="border-t border-[#D8D0BF] my-8 w-full"></div>

              {/* BOTÓN WHATSAPP */}
              <div className="text-center">
                <a 
                  href="https://wa.me/34654495508" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-primary inline-block w-full md:w-auto"
                >
                  ESCRIBIR POR WHATSAPP
                </a>
              </div>

              {/* Separador antes de redes sociales */}
              <div className="border-t border-[#D8D0BF] my-8 w-full"></div>

              {/* ICONOS REDES SOCIALES */}
              <div className="flex flex-col items-center">
                <div className="flex justify-center gap-[16px]">
                  <a 
                    href="https://instagram.com/move.pilatesboutique" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-[44px] h-[44px] rounded-full bg-[#493523] flex items-center justify-center text-[#F6F3EC] transition-all duration-200 hover:bg-[#7F7763] hover:-translate-y-[2px]"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://tiktok.com/@movepilatesboutique" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-[44px] h-[44px] rounded-full bg-[#493523] flex items-center justify-center text-[#F6F3EC] transition-all duration-200 hover:bg-[#7F7763] hover:-translate-y-[2px]"
                    aria-label="TikTok"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  </a>
                </div>
                <p className="mt-4 text-[13px] text-[#7F7763] font-sans text-center leading-[1.7] max-w-[280px] mx-auto mb-0">
                  Síguenos en Instagram y TikTok para ver cómo se vive el movimiento en MOVE.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-casi-negro py-[10px] w-full">
        <div className="w-full h-[280px] md:h-[400px]">
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
        </div>
      </section>

    </div>
  );
}
