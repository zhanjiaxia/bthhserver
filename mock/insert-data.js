require('../models/bittorrent')

var btJson = require('./bt.json')

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/bt-site')

var Bittorrent = mongoose.model('Bittorrent')

btJson.forEach((magnet, index) => {
  var hash_info = magnet.magnet.slice(20)
  Bittorrent.findOne({ hash_info: hash_info }).exec((err, doc) => {
    if (err) return console.error(err)
    if (doc) {
      Bittorrent.update(doc, { $set: { hot: doc.hot + 1, update_at: Date.now() } }, err => {
        if (err) return console.error(err)
        console.log(`Update OK! name: ${doc.name}`)
        isExit(index)
      })
    } else {
      doc = new Bittorrent({
        magnet: magnet.magnet,
        name: magnet.name,
        hash_info: hash_info
      }).save(err => {
        if (err) return console.error(err)
        console.log(`Insert OK! name: ${doc.name}`)
        isExit(index)
      })
    }
  })
})

function isExit(index) {
  if (index + 1 == btJson.length)
    process.exit(0)
}

