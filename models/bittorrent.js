var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BittorrentSchema = new Schema({
  hot: { type: Number, default: 1 },
  magnet: String,
  name: { type: String, text: true },
  hash_info: String,
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: Date.now() }
})

mongoose.model('Bittorrent', BittorrentSchema)
