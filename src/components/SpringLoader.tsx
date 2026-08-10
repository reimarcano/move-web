import { useEffect, useMemo, useState } from 'react';

const HERO_IMAGE = '/assets/move_portada_pilates-pozuelo.webp';
const LOADER_DURATION = 1050;
const SESSION_KEY = 'move-spring-loader-seen';

function springPath(progress: number) {
  const start = 20;
  const length = 40 + 180 * progress;
  const end = start + length;
  const cycles = 25;
  const amplitude = 3.2;
  const step = length / (cycles * 2);
  let path = `M ${start} 16`;

  for (let index = 0; index < cycles * 2; index += 1) {
    const direction = index % 2 === 0 ? -1 : 1;
    const x = start + (index + 1) * step;
    path += ` Q ${x - step / 2} ${16 + direction * amplitude} ${x} 16`;
  }

  return { path, end };
}

export default function SpringLoader({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const previewMode = new URLSearchParams(window.location.search).has(
      'preview-loader',
    );

    if (
      !previewMode &&
      (reducedMotion || window.sessionStorage.getItem(SESSION_KEY))
    ) {
      setVisible(false);
      return;
    }

    let cancelled = false;
    let animationFrame = 0;
    let impactTimeout = 0;
    let closeTimeout = 0;
    let animationReady = false;
    let imageReady = false;

    setVisible(true);
    setProgress(0);
    setIsComplete(false);
    setIsExiting(false);

    const finish = () => {
      if (!animationReady || !imageReady || cancelled) return;

      setIsComplete(true);
      impactTimeout = window.setTimeout(() => {
        if (cancelled) return;
        setIsExiting(true);
        closeTimeout = window.setTimeout(() => {
          if (cancelled) return;
          if (!previewMode) {
            window.sessionStorage.setItem(SESSION_KEY, 'true');
          }
          setVisible(false);
        }, 190);
      }, 360);
    };

    const hero = new Image();
    hero.onload = () => {
      imageReady = true;
      finish();
    };
    hero.onerror = () => {
      imageReady = true;
      finish();
    };
    hero.src = HERO_IMAGE;

    const startedAt = performance.now();
    const animate = (now: number) => {
      const elapsed = Math.min((now - startedAt) / LOADER_DURATION, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(eased);

      if (elapsed < 1) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      animationReady = true;
      finish();
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(impactTimeout);
      window.clearTimeout(closeTimeout);
    };
  }, [active]);

  const spring = useMemo(() => springPath(progress), [progress]);

  if (!visible) return null;

  return (
    <div
      className={`spring-loader${isComplete ? ' spring-loader--complete' : ''}${isExiting ? ' spring-loader--exiting' : ''}`}
      role="status"
      aria-label="Cargando MOVE Pilates Boutique"
    >
      <div className="spring-loader__content" aria-hidden="true">
        <img
          src="/assets/move pilates boutique pozuelo_logo.png"
          alt=""
          className="spring-loader__brand"
          width={240}
          height={84}
        />
        <svg className="spring-loader__bar" viewBox="0 0 260 32">
          <circle cx="20" cy="16" r="3.4" className="spring-loader__cap" />
          <path d={spring.path} className="spring-loader__coil" />
          <path d={spring.path} className="spring-loader__glint" />
          <g className="spring-loader__impact">
            <circle cx="240" cy="16" r="7" />
            <path d="M 240 5.5 V 2.5 M 240 26.5 V 29.5" />
          </g>
          <g transform={`translate(${spring.end} 0)`}>
            <g className="spring-loader__head-motion">
              <circle cy="16" r="7" className="spring-loader__head" />
              <circle cy="16" r="4.5" className="spring-loader__head-inner" />
            </g>
          </g>
          <g className="spring-loader__socket">
            <circle cx="240" cy="16" r="3.3" />
            <circle cx="240" cy="16" r="1.45" />
          </g>
        </svg>
      </div>
    </div>
  );
}
