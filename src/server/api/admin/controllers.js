module.export = exports
exports.index = {
  get: async (req, res) => {
    res.json({ message: 'This is going to be the admin API.' })
  }
}
