/**
 * The servers shown on the homepage.
 *
 * To add a server, append an entry here — it shows up on the homepage
 * automatically. Give it a docs page under docs/servers/ and list it in
 * sidebars.js.
 *
 * Fields:
 * - game:       kept for the (currently disabled) live status check; see
 *               LIVE_STATUS in utils/serverStatus.js. Nothing is pinged today,
 *               so this only documents what a server is.
 * - status:     'planned' holds the slot for a server that isn't up yet. The
 *               card renders greyed out with *** in place of anything it can't
 *               honestly report, and no ping is made. Drop the field to make
 *               the card real — the data below it is already correct.
 * - version:    the MINECRAFT version, and nothing else. It is only the
 *               fallback for the card's badge: while the server is up the badge
 *               shows what the ping actually reports, so a declared and a live
 *               version can never sit next to each other. Pack versions belong
 *               on the instance, not here.
 * - docs:       the server's documentation page (address, how to join).
 * - instances:  the client setups for this server, rendered as the table on its
 *               doc page. Zero, one or several — a vanilla server can have
 *               none, and nothing renders. Each is either
 *                 { id, name, blurb?, modpackId }
 *                   a pack we build; its files come from the latest release of
 *                   the matching entry in modpacks.js, and the row offers
 *                   whichever of .mrpack / .zip that release actually has.
 *                 { id, name, blurb?, external: { version, url, download } }
 *                   a pack someone else publishes; the row offers that link.
 *               Add `copyOnly: true` (with an optional `copyLabel`) when the file
 *               is only useful pasted into a launcher rather than downloaded — a
 *               MultiMC/Prism instance zip. The row then shows one copy button
 *               instead of the split Download menu, so it never offers a .mrpack
 *               or .zip entry that would not actually work.
 */
const servers = [
  {
    id: 'creative',
    name: 'Minecraft - Coxford Network (Vanilla)',
    address: 'mc.coxford.net',
    version: '1.8-26.3',
    description: 'survival, creative, parkour, and tnt run',
    docs: '/docs/servers/creative/',
    instances: [
      {
        id: 'creative-preset',
        name: 'Shader preset',
        blurb: 'Optional — the server is vanilla and plain Minecraft joins fine. Iris and Sodium with Complementary Unbound, on out of the box.',
        modpackId: 'creative-preset',
      },
    ],
  },
  {
    id: 'beta173',
    name: 'Minecraft - Beta 1.7.3 (Vanilla)',
    address: 'beta.coxford.net',
    version: 'Beta 1.7.3',
    description: 'Classic Survival Minecraft (with quality of life enhancements)',
    docs: '/docs/servers/beta173/',
    // Not 'minecraft', so the card skips the live ping. Not a quirk of ours:
    // b1.7.3 answers the pre-2013 server-list ping, which mcsrvstat.us and every
    // other status API do not speak, so a live server would be reported offline
    // forever. The card lists the address instead.
    game: 'minecraft-legacy',
    instances: [
      {
        id: 'beta173-nostalgia',
        name: 'Beta 1.7.3 - Nostalgia',
        blurb: 'Required. ModLoader, WorldEdit and the b1.7.3 compatibility fixes, already patched in.',
        // A MultiMC/Prism instance, NOT a .mrpack, and there is no .mrpack to
        // offer: b1.7.3 mods are patched into minecraft.jar, which no modern
        // pack format can express. Prism imports it from a pasted link, so the
        // row offers the link and nothing else.
        copyOnly: true,
        copyLabel: 'Copy instance link',
        external: {
          url: 'https://github.com/coxfordnetwork/modpacks/tree/Beta-1.7.3-Nostalgia',
          download: 'https://github.com/coxfordnetwork/modpacks/archive/refs/heads/Beta-1.7.3-Nostalgia.zip',
        },
      },
    ],
  },
    {
    id: 'atm11',
    name: 'Minecraft - All The Mods 11 (Modded)',
    address: 'atm11.coxford.net',
    // TODO: the Minecraft version ATM11 0.6.0-beta runs on. Only used as the
    // badge's fallback while the server is unreachable; 0.6.0-beta is the
    // pack's version and lives on the instance below.
    version: null,
    description: 'all the mods are installed! jk, that would be impossible. it is just the modpack name.',
    docs: '/docs/servers/atm11/',
    instances: [
      {
        id: 'atm11',
        name: 'All the Mods 11',
        blurb: 'Required, on exactly this version — anything else is refused on connect.',
        external: {
          version: '0.6.0-beta',
          url: 'https://www.curseforge.com/minecraft/modpacks/all-the-mods-11',
          // project 1148445, file 8700161 = 0.6.0-beta
          download: 'https://www.curseforge.com/api/v1/mods/1148445/files/8700161/download',
        },
      },
    ],
  },
  // BeamNG is parked until the server actually exists. To bring it back:
  //   1. uncomment this entry
  //   2. rename docs/servers/_beamng.mdx -> beamng.mdx (Docusaurus ignores
  //      files prefixed with an underscore, which is what keeps the page out
  //      of the build while this entry is gone -- the page does
  //      servers.find(id === 'beamng') and would fail on undefined)
  //   3. put 'servers/beamng' back in sidebars.js
  //
  // {
  //   id: 'beamng',
  //   name: 'BeamNG - Multiplayer (Modded)',
  //   game: 'beamng',
  //   address: 'beamng.coxford.net',
  //   description: 'BeamNG.drive multiplayer over BeamMP.',
  //   docs: '/docs/servers/beamng/',
  //   status: 'planned',
  //   instances: [
  //     {
  //       id: 'beammp',
  //       name: 'BeamMP launcher',
  //       blurb: 'Required! Patches BeamNG.drive for multiplayer (fyi, you need the game on Steam first).',
  //       external: {
  //         url: 'https://beammp.com/',
  //         download: 'https://beammp.com/installer/BeamMP_Installer.zip',
  //       },
  //     },
  //   ],
  // },
]

export default servers
