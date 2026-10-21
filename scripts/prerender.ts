import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { canonicalForPath, NOT_FOUND_SEO, OG_IMAGE, seoByPath } from '../src/seo.ts';

/* Cada ruta pública se publica con su página completa en el HTML (titulares, textos,
   preguntas, reseñas, dirección…), no solo con los metadatos: así la leen también los
   buscadores, asistentes de IA y previsualizaciones que no ejecutan JavaScript. En el
   navegador, React hidrata ese mismo HTML (src/main.tsx). */

const distDirectory = path.resolve('dist');
// Compilación para Node de src/entry-server.tsx (vite build --ssr, ver package.json)
const serverEntry = path.resolve('dist-ssr', 'entry-server.js');
const templatePath = path.join(distDirectory, 'index.html');

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

function metadataFor(pathname: string, title: string, description: string) {
  const canonical = canonicalForPath(pathname);

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:secure_url" content="${OG_IMAGE}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="MOVE Pilates Boutique, estudio de Pilates Reformer en Pozuelo de Alarcón" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="Move Pilates Boutique" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <meta name="twitter:image:alt" content="MOVE Pilates Boutique, estudio de Pilates Reformer en Pozuelo de Alarcón" />`;
}

async function prerender() {
  const template = await readFile(templatePath, 'utf8');
  const { render } = (await import(pathToFileURL(serverEntry).href)) as {
    render: (pathname: string) => Promise<string>;
  };

  // Una ruta tras otra: las páginas comparten estado de módulo (la carga diferida)
  for (const [pathname, seo] of Object.entries(seoByPath)) {
    const outputPath =
      pathname === '/'
        ? templatePath
        : path.join(distDirectory, pathname.slice(1), 'index.html');
    // Datos estructurados propios de la página, escritos en el HTML (los leen también
    // los buscadores y asistentes de IA que no ejecutan JavaScript)
    const jsonLd = (seo.jsonLd ?? [])
      .map((data) => `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\u003c')}</script>`)
      .join('\n');
    // La página entera; `data-prerendered` le dice al navegador qué ruta trae el HTML
    const html = await render(pathname);
    const output = template
      .replace('</head>', () => `${metadataFor(pathname, seo.title, seo.description)}\n${jsonLd}\n  </head>`)
      .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${pathname}">${html}</div>`);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output);
  }

  // Página 404: Vercel sirve dist/404.html con estado 404 en cualquier ruta que no existe.
  // Sin canonical y con noindex; `data-prerendered="*"` = vale para cualquier ruta.
  const html404 = await render('/404');
  const notFound = template
    .replace(
      '</head>',
      () => `
    <title>${escapeHtml(NOT_FOUND_SEO.title)}</title>
    <meta name="description" content="${escapeHtml(NOT_FOUND_SEO.description)}" />
    <meta name="robots" content="noindex" />
  </head>`,
    )
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="*">${html404}</div>`);
  await writeFile(path.join(distDirectory, '404.html'), notFound);
}

await prerender();
