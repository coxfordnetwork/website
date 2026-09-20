// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
  future: {
    v4: true,
  },
  title: 'coxford',
  tagline: '',
  favicon: '/img/logos/coxford.svg',

  url: 'https://coxford.net',
  baseUrl: '/',

  organizationName: 'coxfordnetwork',
  projectName: 'website',

  onBrokenLinks: 'throw',
  trailingSlash: true,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/styles/custom.css',
        },
      }),
    ],
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    colorMode: {
      // Two-state light/dark toggle. `respectPrefersColorScheme: true` turns
      // the button into a confusing three-way system/light/dark cycle.
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: 'coxford network',
      logo: {
        // Two files rather than one: the mark is a flat silhouette, and the
        // site's theme toggle is its own switch, so it can't be a media query
        // inside the SVG the way the favicon's is.
        alt: 'coxford',
        src: 'img/logos/coxford-light.svg',
        srcDark: 'img/logos/coxford-dark.svg',
      },
      items: [
        // faqs.md carried `slug: /`, so it was the /docs/ index; with it gone
        // there's no bare /docs/ route. docSidebar points at whatever sits
        // first in the `docs` sidebar, so this keeps working as pages move.
        { type: 'docSidebar', sidebarId: 'docs', label: 'Docs', position: 'right' },
        {
          // Launcher downloads, in place of the launcher cards that used to be
          // repeated on every server page. Styles live in src/styles/custom.css
          // under `.launcher-link`; the logos are in static/img/logos/.
          type: 'html',
          position: 'right',
          value: `<span class="launcher-links">
            <a class="launcher-link" href="https://prismlauncher.org/download/" target="_blank" rel="noopener noreferrer" title="Get Prism Launcher" aria-label="Get Prism Launcher">
              <img src="/img/logos/prismlauncher.svg" alt="Prism Launcher" width="20" height="20" />
            </a>
            <a class="launcher-link" href="https://modrinth.com/app" target="_blank" rel="noopener noreferrer" title="Get the Modrinth App" aria-label="Get the Modrinth App">
              <img src="/img/logos/modrinth.svg" alt="Modrinth App" width="20" height="20" />
            </a>
          </span>`,
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash'],
    },
  },

  plugins: ['./docusaurus-tailwind-v3'],
}

export default config
