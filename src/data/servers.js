/**
 * The servers shown on the homepage.
 *
 * To add a server, append an entry here — it shows up on the homepage
 * automatically. Give it a docs page under docs/servers/ and list it in
 * sidebars.js.
 *
 * Fields:
 * - platform:   the badge before the version — 'Minecraft', 'BeamNG'. It says
 *               what the thing runs on, so the name doesn't have to: the card
 *               reads `Minecraft` `26.2`  Coxford MC, not the old
 *               "Minecraft - Coxford Network (Vanilla)".
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
 *               MultiMC/Prism instance zip, or a CurseForge pack. The row then
 *               shows a copy button instead of the split Download menu, so it
 *               never offers a .mrpack or .zip entry that would not work.
 *               `links: [{ label, href }]` adds entries beside it (the pack's
 *               own page, say); with none, the copy button stands alone.
 */
const servers = [
  {
    id: 'creative',
    name: 'Coxford MC',
    platform: 'Minecraft',
    address: 'mc.coxford.net',
    version: '1.8-26.3',
    description: 'survival, creative, parkour, and tnt run',
    docs: '/docs/servers/creative/',
    instances: [
      {
        id: 'basically-vanilla',
        name: 'BasicallyVanilla',
        blurb: 'Optional — nothing is required client-side, plain Minecraft joins fine. This is the setup we use.',
        // Copy-and-paste into Prism, like the other instances. No `links` yet;
        // add a Modrinth entry here if the pack is ever published there.
        copyOnly: true,
        copyLabel: 'Copy instance link',
        external: {
          url: 'https://github.com/coxfordnetwork/modpacks/tree/BasicallyVanilla',
          download: 'https://github.com/coxfordnetwork/modpacks/archive/refs/heads/BasicallyVanilla.zip',
        },
      },
    ],
  },
  {
    id: 'beta173',
    name: 'Nostalgia',
    platform: 'Minecraft',
    address: 'beta.coxford.net',
    version: 'Beta 1.8.1',
    description: '',
    docs: '/docs/servers/beta173/',
    // Not 'minecraft', so the card skips the live ping. Not a quirk of ours:
    // beta-era servers answer the pre-2013 server-list ping, which mcsrvstat.us and every
    // other status API do not speak, so a live server would be reported offline
    // forever. The card lists the address instead.
    game: 'minecraft-legacy',
    instances: [
      {
        id: 'beta173-nostalgia',
        name: 'Nostalgia',
        blurb: 'Required. WorldEdit and the b1.8.1 compatibility fixes, already patched in.',
        // A MultiMC/Prism instance, NOT a .mrpack, and there is no .mrpack to
        // offer: beta-era mods are patched into minecraft.jar, which no modern
        // pack format can express. Prism imports it from a pasted link, so the
        // row offers the link and nothing else.
        copyOnly: true,
        copyLabel: 'Copy instance link',
        external: {
          version: 'Beta 1.8.1',
          url: 'https://github.com/coxfordnetwork/modpacks/tree/Beta-Nostalgia',
          download: 'https://github.com/coxfordnetwork/modpacks/archive/refs/heads/Beta-Nostalgia.zip',
        },
      },
    ],
  },
    {
    id: 'atm11',
    name: 'All the Mods 11',
    platform: 'Minecraft',
    address: 'atm11.coxford.net',
    // The Minecraft version, not the pack's — 0.6.0-beta is the pack and lives
    // on the instance below. Matches the NeoForge build the server launches
    // (26.1.2.94, in infra/servers/atm11.conf).
    version: '26.1.2',
    description: 'all the mods are installed! jk, that would be impossible. it is just the modpack name.',
    docs: '/docs/servers/atm11/',
    instances: [
      {
        id: 'atm11',
        name: 'All the Mods 11',
        blurb: 'Required, on exactly this version — anything else is refused on connect.',
        // Same flow as the other instances: copy the link, paste it into Prism's
        // importer. This is our own MultiMC/Prism instance, not the CurseForge
        // pack -- nobody has to touch a storefront to join. The CurseForge page
        // stays in `links` for the changelog and mod list.
        copyOnly: true,
        copyLabel: 'Copy instance link',
        links: [
          {
            label: 'Open the CurseForge page',
            href: 'https://www.curseforge.com/minecraft/modpacks/all-the-mods-11',
          },
        ],
        external: {
          version: '0.6.0-beta',
          url: 'https://github.com/coxfordnetwork/modpacks/tree/AllTheMods11',
          download: 'https://github.com/coxfordnetwork/modpacks/archive/refs/heads/AllTheMods11.zip',
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
  //   name: 'Multiplayer (Modded)',
  //   platform: 'BeamNG',
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
