const http = require('http')

http.createServer((request, response) => {
  let body = []
  // listen to three possible condition error, data and end
  request.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body.push(chunk.toString())
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log('body:', body)
    response.writeHead(200, { 'Content-type': 'text/html' })
    response.end('Hello World\n')
  })
}).listen(8088)

console.log('server started')
