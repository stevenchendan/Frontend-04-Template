const net = require("net");

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } 
    else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[text])}`).join('&');
    }

    this.headers["Content-Length"] = this.bodyText.length;
  }

  send (connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser;
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString());
        })
      }
      connection.on('data', (data) => {
        console.log(data.toString());
        parser.receive(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
          connection.end();
        }
      });
      connection.on('error', (err) => {
        reject(err);
        connection.end();
      });
    })
  }
}

class ResponseParser {
  constructor() {

  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {

  }
}




// create request and recevive response after send it
void async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "steven"
    }
  });

  let response = await request.send();

  console.log(response);
}();