var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var Bittorrent = mongoose.model('Bittorrent')

var _ = next => func => (err, arg) => {
  return err ? next(err) : func(arg)
}

// 获取 BT 列表（搜索, HotTop 等）
router.get('/search', (req, res, next) => {
  var content = req.query.content || null,
      size = Number(req.query.size || 10),
      from = Number(req.query.from || 0),
      sort = JSON.parse(req.query.sort || JSON.stringify({}))

  const btQuery =
    Bittorrent
      .find( content ? { $text: { $search: content } } : {} )

  const results = []

  btQuery.count(_(next)(count => {
    btQuery
      .limit(size)
      .skip(from)
      .sort(Object.assign({'create_at': -1}, sort))
      .stream()
      .on('data', doc => results.push(doc))
      .on('error', err => console.log(err))
      .on('close', () => {
        res.header({
          'Access-Control-Allow-Origin': '*'
        })
        res.json({
          results,
          from: from,
          size: size,
          count: count
        })
      })
  }))
})

module.exports = router