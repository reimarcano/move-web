import React, { useState, useEffect, useRef } from 'react';
import Reviews from '../components/Reviews';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';

export default function Pricing() {
  useEffect(() => {
    document.title = "Tarifas | MOVE Pilates Boutique Pozuelo de Alarcón";
  }, []);

  return (
    <div className="w-full pb-0">
      <section className="px-6 text-center max-w-4xl mx-auto section-padding-claro pb-0">
        <h1 className="mb-0 reveal">
          Encuentra tu <span className="italic">plan.</span>
        </h1>
      </section>

      {/* Clases Grupales */}
      <section className="max-w-4xl mx-auto px-6 section-padding-claro text-negro-move">
        <h2 className="mb-text-lg reveal">Clases Grupales</h2>
        <p className="text-texto-move mb-text-lg reveal reveal-delay-1">Máximo 4 personas por sesión</p>
        
        <dl className="space-y-6">
          <div className="flex justify-between items-end border-b border-negro-move/20 pb-4 reveal reveal-delay-1">
            <dt className="mb-0 font-medium text-texto-move">1 clase / semana</dt>
            <dd className="price-highlight mb-0">115 €<span className="text-sm font-sans font-light opacity-70">/mes</span></dd>
          </div>
          <div className="flex justify-between items-end border-b border-negro-move/20 pb-4 reveal reveal-delay-2">
            <dt className="mb-0 font-medium text-texto-move">2 clases / semana</dt>
            <dd className="price-highlight mb-0">190 €<span className="text-sm font-sans font-light opacity-70">/mes</span></dd>
          </div>
          <div className="flex justify-between items-end border-b border-negro-move/20 pb-4 reveal reveal-delay-3">
            <dt className="mb-0 font-medium text-texto-move">3 clases / semana</dt>
            <dd className="price-highlight mb-0">220 €<span className="text-sm font-sans font-light opacity-70">/mes</span></dd>
          </div>
        </dl>
      </section>

      {/* Sesiones Privadas */}
      <section className="max-w-4xl mx-auto px-6 section-padding-claro pt-0 text-negro-move">
        <h2 className="mb-text-lg reveal">Sesiones Privadas</h2>
        <p className="text-texto-move mb-text-lg reveal reveal-delay-1">Atención 1:1 · Totalmente personalizada</p>
        
        <dl className="space-y-6">
          <div className="flex justify-between items-end border-b border-negro-move/20 pb-4 reveal reveal-delay-1">
            <dt className="mb-0 font-medium text-texto-move">Bono 4 sesiones</dt>
            <dd className="price-highlight mb-0">210 €<span className="text-sm font-sans font-light opacity-70">/bono</span></dd>
          </div>
          <div className="flex justify-between items-end border-b border-negro-move/20 pb-4 reveal reveal-delay-2">
            <dt className="mb-0 font-medium text-texto-move">Bono 8 sesiones</dt>
            <dd className="price-highlight mb-0">400 €<span className="text-sm font-sans font-light opacity-70">/bono</span></dd>
          </div>
        </dl>
      </section>

      {/* Primera Vez - Aligned Style */}
      <section className="max-w-4xl mx-auto px-6 section-padding-claro pt-0 reveal">
        <div className="bg-[#F0EADE] border border-[#D8D0BF] rounded-[8px] p-10 md:p-16 text-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#493523] mb-6 block">Cortesía de Bienvenida</span>
          
          <h2 className="font-serif text-3xl md:text-5xl text-[#493523] mb-6 leading-tight font-normal">
            Tu primera sesión <br />
            <span className="italic font-light">sin coste.</span>
          </h2>
          
          <p className="font-sans text-sm md:text-base text-[#7F7763] max-w-lg mx-auto mb-10 leading-relaxed font-medium">
            Te invitamos a descubrir nuestro método con una sesión inaugural gratuita.
          </p>
          
          <a 
            href="https://wa.me/34654495508" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            SOLICITAR PLAZA
          </a>
        </div>
      </section>

      <Reviews />

      {/* Contact Information Card */}
      <section className="max-w-7xl mx-auto px-6 section-padding-claro pt-0">
        <div className="flex justify-center">
          <div className="bg-[#F0EADE] border border-[#D8D0BF] rounded-[8px] p-[32px_24px] md:p-[48px] flex flex-col max-w-2xl w-full reveal">
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
    </div>
  );
}
