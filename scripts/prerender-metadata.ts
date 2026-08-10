import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { canonicalForPath, OG_IMAGE, seoByPath } from '../src/seo.ts';

const distDirectory = path.resolve('dist');
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
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="MOVE Pilates Boutique" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />`;
}

async function prerenderMetadata() {
  const template = await readFile(templatePath, 'utf8');

  await Promise.all(
    Object.entries(seoByPath).map(async ([pathname, seo]) => {
      const outputPath =
        pathname === '/'
          ? templatePath
          : path.join(distDirectory, pathname.slice(1), 'index.html');
      const output = template.replace('</head>', `${metadataFor(pathname, seo.title, seo.description)}\n  </head>`);

      await mkdir(path.dirname(outputPath), { recursive: true });
      await writeFile(outputPath, output);
    }),
  );
}

await prerenderMetadata();
