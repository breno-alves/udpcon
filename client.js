const PORT = 1338;
const HOST = 'localhost';
const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const fs = require("fs");

function chunk(s, maxBytes) {
  let buf = Buffer.from(s);
  const result = [];
  while (buf.length) {
    let i = buf.lastIndexOf(32, maxBytes + 1);

    if (i < 0) i = buf.indexOf(32, maxBytes);

    if (i < 0) i = buf.length;

    result.push(buf.slice(0, i).toString());
    buf = buf.slice(i + 1);
  }

  return result;
}

function sendFile() {
  fs.readFile('./files/a.txt', function (err, data) {
    if (err) {
      return console.log(err);
    }

    const chunks = chunk(data, 2300);

    buffer = [];
    chunks.map((value, index) => {
      const buffed = Buffer.from(value);
      buffer.push(buffed);
    });

    buffer.map((value, index) => {
      client.send(buffer[index], PORT, HOST, (err, bytes) => {
        if (err)
          throw err;
      });
    });

    setTimeout(() => {
      client.send('done', PORT, HOST);
      console.log('DONE!');
    }, 3000);
  });
}

sendFile();
