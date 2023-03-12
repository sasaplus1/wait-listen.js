const assert = require('node:assert/strict');
const http = require('http');
const { after, before, describe, it } = require('node:test');

const { /* executeCommand, */ sendRequest, waitListen } = require('./index');

describe('executeCommand', function () {
  it('how to test');
});

describe('sendRequest', function () {
  const port = 4567;

  let server;

  before(function () {
    server = http.createServer(function (_req, res) {
      res.writeHead(200);
      res.end('Hello!');
    });
    server.listen(port);
  });

  after(function () {
    server.closeAllConnections();
    server.close();
    server = null;
  });

  it('can send request', async function () {
    const url = new URL(`http://127.0.0.1:${port}`);
    const res = await sendRequest(url);

    assert(res.statusCode === 200);
  });
});

describe('waitListen', function () {
  it('can wait listen', async function () {
    const port = 4321;

    const server = http.createServer(function (_req, res) {
      res.writeHead(200);
      res.end('Hello!');
    });

    try {
      const url = new URL(`http://127.0.0.1:${port}`);

      const [result] = await Promise.all([
        waitListen({
          interval: 50,
          status: 200,
          timeout: 1000 * 60 * 3,
          url
        }),
        new Promise(function (resolve) {
          setTimeout(function () {
            server.listen(port, resolve);
          }, 500);
        })
      ]);

      assert(result);
    } finally {
      server.closeAllConnections();
      server.close();
    }
  });
});
