# coxford.net
[![Netlify Status](https://api.netlify.com/api/v1/badges/2f78fc7a-bd11-4db7-a5b8-6dc0477d7c7f/deploy-status)](https://app.netlify.com/projects/coxford/deploys)

```bash
pnpm install
pnpm start      # dev server
pnpm run build  # production build
```

- Servers: `src/data/servers.js`
- Modpacks we build ourselves (GitHub release sources): `src/data/modpacks.js`; other packs are pinned per server in `servers.js`
- Docs: `docs/`, sidebar in `sidebars.js`

Publishing a GitHub release on the modpacks repo updates the site automatically, including the pack's mod list (read from the `.mrpack` itself).
