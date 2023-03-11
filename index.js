const { spawn } = require('node:child_process');
const http = require('node:http');
const https = require('node:https');
const { setTimeout: setTimeoutPromise } = require('node:timers/promises');

const debug = require('debug');

const log = debug('wait-listen');

/**
 * execute command
 *
 * @param {string} command - command string
 * @param {{ debug: boolean }} options - options
 * @returns {ChildProcess}
 */
function executeCommand(command, options = { debug: false }) {
  log('executeCommand', command, options);

  const { debug } = options;

  const subprocess = spawn(command, [], {
    detached: true,
    shell: true,
    stdio: debug ? ['ignore', 'inherit', 'inherit'] : 'ignore'
  });

  subprocess.unref();

  return subprocess;
}

/**
 * send request to URL
 *
 * @param {URL} url - URL
 * @returns {Promise<http.ServerResponse|Error>}
 */
function sendRequest(url) {
  log('sendRequest', url);

  return new Promise(function (resolve, reject) {
    const client = url.protocol === 'http:' ? http : https;

    const req = client.request(url, function (res) {
      resolve(res);
    });

    req.on('error', function (e) {
      reject(e);
    });

    req.end();
  });
}

/**
 * wait for server to listen
 *
 * @param {{ interval: number, status: number, timeout: number, url: URL }} params - params
 * @returns {Promise<boolean>}
 */
async function waitListen(params = {}) {
  const { interval, status, timeout, url } = params;

  let isTimedout = false;
  let statusCode = NaN;

  const timer = setTimeout(function () {
    isTimedout = true;
  }, timeout);

  do {
    try {
      statusCode = (await sendRequest(url, 5000)).statusCode;
    } catch (e) {
      await setTimeoutPromise(interval);
    }
  } while (!isTimedout && statusCode !== status);

  clearTimeout(timer);

  return statusCode === status;
}

module.exports = {
  executeCommand,
  sendRequest,
  waitListen
};
