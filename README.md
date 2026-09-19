# coxford.net

Website for the coxford Minecraft servers. Docusaurus, deployed on Netlify.

```bash
pnpm install
pnpm start      # dev server
pnpm run build  # production build
```

- Servers: `src/data/servers.js`
- Modpacks we build ourselves (GitHub release sources): `src/data/modpacks.js`; other packs are pinned per server in `servers.js`
- Docs: `docs/`, sidebar in `sidebars.js`

Publishing a GitHub release on the modpacks repo updates the site automatically, including the pack's mod list (read from the `.mrpack` itself).
