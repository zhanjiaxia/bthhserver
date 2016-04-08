var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var Bittorrent = mongoose.model('Bittorrent')

router.get('/search', function (req, res, next) {
  var content = req.query.content,
      size = Number(req.query.size || 10),
      from = Number(req.query.from || 0)
  var btQuery = Bittorrent.find({ $text: { $search: content } }).limit(size).skip(from)
  btQuery.exec(function (err, docs) {
    if (err) return next(err)
    res.json({
      results: docs,
      from: from,
      size: size,
      total: docs.length
    })
  })
})

module.exports = router