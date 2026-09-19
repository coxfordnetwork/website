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

  organizationName: 'coxfordmc',
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
        alt: 'coxford',
        src: 'img/logos/coxford.svg',
      },
      items: [
        { to: 'docs', label: 'Docs', position: 'right' },
    
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
