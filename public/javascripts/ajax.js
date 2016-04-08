(function () {
  var Ajax = function (options) {
    this._options = getOptions(options)
    this._xhr = new XMLHttpRequest()
     this._xhr.open(
      this._options.method,
      this._options.url,
      this._options.async
    )
    Object.keys(this._options.headers).forEach(function (headerKey) {
      var headerValue = this._options.headers[headerKey]
      this._xhr.setRequestHeader(headerKey, headerValue)
    })
    if (this._options.method.toLocaleUpperCase() == 'POST')
      this._xhr.send(this._options.body)
    else
      this._xhr.send()
    return this
  }

  Ajax.prototype.success = function (func) {
    this._xhr.onreadystatechange = function () {
      var status = this._xhr.status
      var readyState = this._xhr.readyState
      if (readyState == 4 && status >= 200 && status < 300)
        func(this._xhr.responseText, status)
    }
    return this
  }

  Ajax.prototype.error = function (func) {
    this._xhr.onreadystatechange = function () {
      var status = this._xhr.status
      var readyState = this._xhr.readyState
      if (readyState == 4 && status >= 400)
        func(this._xhr.responseText)
    }
    return this
  }

  function getOptions(options) {
    var defaultOptions = {
      method: 'GET',
      async: true,
      headers: {}
    }
    if (typeof options == 'string')
      options = { url: options }
    if (options.query) {
      var queryArr = []
      Object.keys(options.query).forEach(function (q) {
        queryArr.push(
          decodeURIComponent( [q, options.query[q]].join('=') )
        )
      })
      options.url += '?' + queryArr.join('')
    }
    return Object.assign({}, defaultOptions, options)
  }

  window.Ajax = Ajax
})()