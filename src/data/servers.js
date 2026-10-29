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
    description: 'survival, minigames, and good vibes',
    docs: '/docs/servers/creative/',
    instances: [
      {
        id: 'vanilla++',
        name: 'Vanilla++',
        blurb: 'Vanilla Minecraft, but with some quality-of-life enhancements.',
        // Copy-and-paste into Prism, like the other instances. No `links` yet;
        // add a Modrinth entry here if the pack is ever published there.
        copyOnly: true,
        copyLabel: 'Copy instance link',
        external: {
          url: 'https://github.com/coxfordnetwork/modpacks/tree/Vanilla++',
          download: 'https://github.com/coxfordnetwork/modpacks/archive/refs/heads/Vanilla++.zip',
        },
      },
      {
        id: 'consolerevamp',
        name: 'ConsoleRevamp',
        blurb: 'Java Edition, but with an Xbox 360 vibe. controller support, old textures and sounds, console settings. Built for a TV.',
        // Same mod list as BasicallyVanilla plus Controlify, on the same
        // Minecraft version, so it joins exactly like BasicallyVanilla does.

        copyOnly: true,
        copyLabel: 'Copy instance link',
        external: {
          url: 'https://github.com/coxfordnetwork/modpacks/tree/ConsoleRevamp',
          download: 'https://github.com/coxfordnetwork/modpacks/archive/refs/heads/ConsoleRevamp.zip',
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
  {
    id: 'beamng',
    name: 'Multiplayer (Modded)',
    platform: 'BeamNG',
    game: 'beamng',
    address: 'beamng.coxford.net',
    description: 'BeamNG.drive multiplayer over BeamMP.',
    docs: '/docs/servers/beamng/',
    status: 'planned',
    instances: [
      {
        id: 'beammp',
        name: 'BeamMP launcher',
        blurb: 'Required! Patches BeamNG.drive for multiplayer (fyi, you need the game on Steam first).',
        external: {
          url: 'https://beammp.com/',
          download: 'https://beammp.com/installer/BeamMP_Installer.zip',
        },
      },
    ],
  },
]

export default servers
