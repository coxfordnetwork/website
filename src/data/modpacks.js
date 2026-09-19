/**
 * The modpacks we build ourselves (packwiz packs in github.com/coxfordmc/modpacks).
 * A server points at a pack through `modpackId` in `servers.js`.
 *
 * Fields:
 * - repo:       GitHub repository whose releases hold the .mrpack files.
 * - tagPattern: regex (string) matched against release tags. The modpacks
 *               repo holds several packs, each tagged `<pack>-v<version>`, so
 *               every pack only picks up its own releases.
 */
const modpacks = [
  // e.g.
  // {
  //   id: 'my-pack',
  //   name: 'My Pack',
  //   repo: 'coxfordmc/modpacks',
  //   tagPattern: '^my-pack-v',
  // },
]

export default modpacks
