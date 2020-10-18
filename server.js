var PORT = 1338;
var HOST = 'localhost';
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var fs = require("fs");
var wstream = fs.createWriteStream('./files/b.txt');

let buffer = []

wstream.on('finish', function () {
  console.log('file has been written');
});

server.on('message', function (message, remote) {

  if (message.toString('utf8') == 'done') {
    const b = Buffer.concat(buffer);
    wstream.write(b);
    wstream.end();
  }

  buffer.push(message);
});

server.bind(PORT, HOST);

