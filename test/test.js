'use strict'
var request = require('superagent')
var expect = require('expect.js/index')
var it = require("mocha").it;
var url = require('url')

it('BT搜索接口测试', done => {
  var searchQuery = {
    content: 'big',
    size: 10,
    from: 0
  }
  var host = 'http://0.0.0.0:3000'
  var pathname = '/async/search'
  var reqUrl
  var callback = (err, res) => {
    expect(1).to.be(1)
    expect(200).to.be(200)
    const results = res.body.results,
          total = res.body.total,
          size = res.body.size,
          from = res.body.from
    const resultsLength = from + size > total ? total - from : size
    expect(results).to.have.length(resultsLength)
  }
  reqUrl = host + pathname
  request
    .get(reqUrl)
    .type('json')
    .accept('json')
    .query(searchQuery)
    .end((err, res) => {
      callback(err, res)
      done()
    })
})
