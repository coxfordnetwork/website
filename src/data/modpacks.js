/**
 * The modpacks we build ourselves (packwiz packs in github.com/coxfordnetwork/modpacks).
 * A server points at a pack through `modpackId` in `servers.js`; a docs page can
 * also embed one directly with <ModpackDownloads modpackId="..." />.
 *
 * Fields:
 * - repo:       GitHub repository whose releases hold the .mrpack files.
 * - tagPattern: regex (string) matched against release tags. The modpacks
 *               repo holds several packs, each tagged `<pack>-v<version>`, so
 *               every pack only picks up its own releases. It deliberately does
 *               not match the moving `<pack>-latest` tag — that one carries the
 *               permanent paste-able link and is overwritten on every build, so
 *               it would otherwise show up here as a duplicate of the newest
 *               version.
 *
 * `packs/example` in the modpacks repo is the template for new packs. It builds
 * and releases like the rest, but it's deliberately not listed here.
 */
const modpacks = [
  {
    id: 'creative-preset',
    name: 'Coxford Creative Preset',
    repo: 'coxfordnetwork/modpacks',
    tagPattern: '^creative-preset-v',
  },
  {
    id: 'survival',
    name: 'Coxford Survival',
    repo: 'coxfordnetwork/modpacks',
    tagPattern: '^survival-v',
  },
]

export default modpacks
