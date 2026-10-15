import { INSTAGRAM_HANDLE, INSTAGRAM_URL, instagramPosts } from "../data/instagram";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* Galería de Instagram antes del footer: las fotos avanzan solas hacia la izquierda
   en bucle infinito (la pista va duplicada) y cada una abre Instagram. */
export default function InstagramFeed() {
  const loop = [...instagramPosts, ...instagramPosts];

  return (
    <section className="ig-feed" aria-labelledby="ig-feed-title">
      <div className="ig-head">
        <div>
          <span className="m-eyebrow">Dentro de MOVE</span>
          <h2 id="ig-feed-title" className="m-title">
            Sigue el <em>movimiento.</em>
          </h2>
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="ig-handle">
          <InstagramIcon size={30} />
          <span>
            <strong>@{INSTAGRAM_HANDLE}</strong>
            <small>Síguenos en Instagram</small>
          </span>
        </a>
      </div>

      <div className="ig-viewport">
        <ul className="ig-track">
          {loop.map((post, i) => {
            const clone = i >= instagramPosts.length;
            return (
              <li key={i} aria-hidden={clone || undefined}>
                <a
                  href={post.href ?? INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="ig-tile"
                  tabIndex={clone ? -1 : undefined}
                  aria-label={`${post.alt} — ver en Instagram`}
                >
                  <img src={post.src} alt="" loading="lazy" decoding="async" />
                  <span className="ig-badge">
                    <InstagramIcon size={18} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
