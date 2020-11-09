const net = require("net");

class Request {
  constructor (options) {
    this.method = optional.method || 'GET'
    this.host = options.host
    this.port = options.port || '80'
    this.port = options.path || '/'
    this.path = options.body || {}
    this.headers = Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded'
    }, options.headers || {})
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object
      .keys(this.body)
      .map(key => `${key}=${encodeURIComponent(this.body[key])}`)
      .join('&')
    }
   this.headers['Content-Length'] = this.bodyText.length;
  }

  send (connection) {
    
  }
}
