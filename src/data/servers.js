/**
 * The list of servers shown on the homepage.
 *
 * To add a server, append an entry here — it shows up on the homepage
 * automatically. Give it a docs page under docs/servers/ and list it in
 * sidebars.js.
 *
 * Fields:
 * - game:       'minecraft' (default) gets a live status check via the
 *               mcsrvstat.us public API. Any other value (e.g. 'beamng',
 *               'gta') skips the ping and just lists the address.
 * - version:    shown on the card even while the server is offline.
 * - docs:       the server's documentation page (address, how to join).
 * - modpackId:  links the card to a pack defined in `modpacks.js`; the card
 *               embeds a download button for the pack's latest release.
 * - modpack:    for packs we don't build ourselves (CurseForge etc.):
 *               { name, version, url, source, download } — `download` is the
 *               direct file link for the pinned version (CurseForge:
 *               https://www.curseforge.com/api/v1/mods/<projectId>/files/<fileId>/download).
 *               Omit both for servers without a pack.
 */
const servers = [
  {
    id: 'creative',
    name: 'Creative Vanilla Foreverworld',
    address: 'creative.coxford.net',
    version: '26.2',
    description: 'build cool shit and shit. find out why this server isnt boring by joining it',
    docs: '/docs/servers/creative/',
  },
  {
    id: 'atm11',
    name: 'Modded Survival ATM11',
    address: 'atm11.coxford.net',
    version: '0.6.0-beta',
    description: 'all the mods are installed! jk, that would be impossible. it is just the modpack name.',
    docs: '/docs/servers/atm11/',
    modpack: {
      name: 'All the Mods 11',
      version: '0.6.0-beta',
      url: 'https://www.curseforge.com/minecraft/modpacks/all-the-mods-11',
      source: 'CurseForge',
      // project 1148445, file 8700161 = 0.6.0-beta
      download: 'https://www.curseforge.com/api/v1/mods/1148445/files/8700161/download',
    },
  },
  // // Non-Minecraft servers work too, e.g.:
  // {
  //   id: 'beamng',
  //   name: 'BeamNG',
  //   game: 'beamng',
  //   address: 'beamng.coxford.net',
  //   description: 'BeamNG.drive multiplayer.',
  //   docs: '/docs/servers/beamng/',
  // },
]

export default servers
