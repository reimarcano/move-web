import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';

export default function Layout() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Clases', path: '/clases' },
    { name: 'Tarifas', path: '/precios' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Nuestro Estudio', path: '/estudio' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const leftLinks = navLinks.slice(0, 3);
  const rightLinks = navLinks.slice(3);

  return (
    <div className="min-h-screen flex flex-col font-sans text-casi-negro bg-crema-base">
      {/* Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-marron-move focus:text-crema-move focus:rounded-sm focus:shadow-lg outline-none"
      >
        Saltar al contenido principal
      </a>

      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 bg-crema-base border-b border-tostado transition-transform duration-[350ms] ease-in-out h-14 md:h-16 flex items-center ${
          isVisible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full h-full">
          {/* Desktop Nav */}
          <div className="hidden md:grid grid-cols-3 items-center h-full">
            {/* Left Column */}
            <nav className="flex justify-end gap-8" aria-label="Navegación principal izquierda">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Center Column - Logo */}
            <div className="flex justify-center">
              <Link to="/" className="flex items-center" aria-label="Ir a la página de inicio">
                <img 
                  src="/assets/LOGO REDUCIDO-09.png" 
                  alt="Logo de MOVE Pilates Boutique" 
                  className="h-10 md:h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>

            {/* Right Column */}
            <nav className="flex justify-start gap-8" aria-label="Navegación principal derecha">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Header Content */}
          <div className="flex md:hidden justify-between items-center h-full">
            <Link to="/" className="flex items-center" aria-label="Ir a la página de inicio">
              <img 
                src="/assets/LOGO REDUCIDO-09.png" 
                alt="Logo de MOVE Pilates Boutique" 
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>

            <button
              className="text-negro-move"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-crema-base z-[60] flex flex-col items-center justify-center md:hidden animate-in fade-in duration-300"
          >
            <button
              className="absolute top-4 right-6 text-negro-move"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={28} aria-hidden="true" />
            </button>
            <nav className="flex flex-col items-center gap-8" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-3xl font-serif text-negro-move"
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content with padding-top to account for fixed header */}
      <main id="main-content" className="flex-grow pt-14 md:pt-16 shadow-none outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* WhatsApp Bubble */}
      <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[9999] group">
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-negro-move text-crema-move text-[12px] px-3 py-1.5 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block font-sans">
          ¿Hablamos?
        </div>
        
        <a 
          href="https://wa.me/34654495508" 
          target="_blank" 
          rel="noreferrer"
          className="whatsapp-bubble w-[52px] h-[52px] md:w-[56px] md:h-[56px] bg-marron-move rounded-full flex items-center justify-center text-crema-move shadow-[0_4px_16px_rgba(73, 53, 35, 0.30)] hover:bg-hover-move hover:scale-108 transition-all duration-200 ease-in-out"
          aria-label="Contactar por WhatsApp"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-[#493523] text-[#F6F3EC] py-12 md:py-16 px-[24px] md:px-[8%]">
        <div className="max-w-[1200px] mx-auto">
          {/* Top Section - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-12 gap-y-9 md:gap-y-12 items-start">
            
            {/* Column 1 - Logo */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block">
                <img 
                  src="/assets/move pilates boutique pozuelo_logo.png" 
                  alt="MOVE Pilates Boutique" 
                  className="h-8 md:h-9 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <p 
                className="mt-4 font-normal"
                style={{ 
                  fontFamily: '"Times New Roman", Times, serif', 
                  fontStyle: 'italic',
                  fontSize: '13px',
                  color: 'rgba(246,243,236,0.55)',
                  letterSpacing: 'normal'
                }}
              >
                I like the way you <span style={{ fontStyle: 'italic' }}>Move</span>
              </p>
            </div>

            {/* Column 2 - Estudio */}
            <div>
              <h4 
                className="mb-5 font-normal"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  color: 'rgba(246,243,236,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                ESTUDIO
              </h4>
              <p 
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(246,243,236,0.70)',
                  lineHeight: '1.8'
                }}
              >
                Av. de Europa, 31, local 7<br />
                Pozuelo de Alarcón, Madrid
              </p>
              <p 
                className="mt-4 font-normal"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(246,243,236,0.45)',
                  lineHeight: '1.8'
                }}
              >
                Lun – Mar – Jue: 8:00 – 20:00<br />
                Mié: 8:00 – 16:00<br />
                Vie: 8:00 – 14:00
              </p>
            </div>

            {/* Column 3 - Contacto */}
            <div>
              <h4 
                className="mb-5 font-normal"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  color: 'rgba(246,243,236,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                CONTACTO
              </h4>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://wa.me/34654495508" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-[10px] transition-all duration-200 ease-in-out group"
                  aria-label="Contactar por WhatsApp"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(246,243,236,0.70)'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="group-hover:text-[#F6F3EC]" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="group-hover:text-[#F6F3EC] transition-colors">+34 654 49 55 08</span>
                </a>
                <a 
                  href="https://instagram.com/move.pilatesboutique" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-[10px] transition-all duration-200 ease-in-out group"
                  aria-label="Seguir en Instagram"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(246,243,236,0.70)'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#F6F3EC]" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="group-hover:text-[#F6F3EC] transition-colors">@move.pilatesboutique</span>
                </a>
                <a 
                  href="https://tiktok.com/@movepilatesboutique" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-[10px] transition-all duration-200 ease-in-out group"
                  aria-label="Seguir en TikTok"
                  style={{ 
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(246,243,236,0.70)'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="group-hover:text-[#F6F3EC]" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c.01 2.32-.6 4.67-2.06 6.47-1.46 1.8-3.65 2.93-5.91 3.03-2.26.1-4.56-.63-6.22-2.17-1.66-1.54-2.6-3.73-2.55-5.97.05-2.24.96-4.41 2.58-5.96 1.62-1.55 3.89-2.28 6.12-2.04v4.13c-1.13-.15-2.32.09-3.24.78-.92.69-1.45 1.83-1.41 2.97.04 1.14.65 2.2 1.61 2.82.96.62 2.18.73 3.24.31 1.06-.42 1.86-1.37 2.1-2.48.08-.38.11-.77.11-1.15V.02z"/>
                  </svg>
                  <span className="group-hover:text-[#F6F3EC] transition-colors">@movepilatesboutique</span>
                </a>
              </div>
            </div>

            {/* Column 4 - Páginas */}
            <div>
              <h4 
                className="mb-5 font-normal"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '10px',
                  color: 'rgba(246,243,236,0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em'
                }}
              >
                PÁGINAS
              </h4>
              <nav className="flex flex-col" aria-label="Navegación del pie de página">
                {[
                  { name: 'Clases', path: '/clases' },
                  { name: 'Tarifas', path: '/precios' },
                  { name: 'Eventos', path: '/eventos' },
                  { name: 'Nuestro Estudio', path: '/estudio' },
                  { name: 'Contacto', path: '/contacto' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="transition-colors duration-200 ease-in-out hover:text-[#F6F3EC]"
                    style={{ 
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '13px',
                      color: 'rgba(246,243,236,0.70)',
                      lineHeight: '2',
                      display: 'block'
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-[#F6F3EC] opacity-[0.12] mt-12 mb-6"></div>

          {/* Copyright Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <p 
              className="m-0 text-center md:text-left font-normal"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                fontSize: '11px',
                color: 'rgba(246,243,236,0.35)'
              }}
            >
              &copy; {new Date().getFullYear()} MOVE Pilates Boutique.<br className="md:hidden" /> Todos los derechos reservados.
            </p>
            <p 
              className="m-0 text-center md:text-right font-normal"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                fontSize: '11px',
                color: 'rgba(246,243,236,0.35)'
              }}
            >
              Diseñado con intención.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

