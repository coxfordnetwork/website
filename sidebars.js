module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Servers',
      collapsed: false,
      // Same order as the homepage cards, which follow the array order in
      // src/data/servers.js. Keep the two in step.
      // 'servers/beamng' is parked with its entry there too.
      items: ['servers/creative', 'servers/beta173', 'servers/atm11'],
    },
  ],
}
