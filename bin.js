#!/usr/bin/env node

const { program } = require('commander');
const debug = require('debug');

const { name, version } = require('./package');

const { executeCommand, waitListen } = require('./index');

const log = debug('wait-listen');

program
  .name(name)
  .description('wait for server to listen')
  .option('-c, --command <command>', 'execute command', '')
  .option('-d, --debug', `show command's stdout and stderr`, false)
  .option('-i, --interval <ms>', 'request interval', 500)
  .option('-s, --status <code>', 'target status code', 200)
  .option('-t, --timeout <ms>', 'timeout', 1000 * 60 * 3)
  .version(version, '-v, --version')
  .action(onAction);

program.on('--help', function () {
  console.log('');
  console.log('Example:');
  console.log('  $ wait-listen http://localhost:8080 && echo ready');
  console.log(`  $ wait-listen http://localhost:8080 -c 'node server.js'`);
  console.log('  $ wait-listen http://localhost:8080 -s 418');
});

program.parse();

/** main */
async function onAction() {
  const args = this.args;
  const opts = this.opts();

  log('args', args);
  log('opts', opts);

  //-- check URL ---------------------------------------------------------------

  const maybeUrl = args[0];

  let url;

  try {
    url = new URL(maybeUrl);
  } catch (e) {
    process.exitCode = 1;
    console.error(`${maybeUrl} is not a valid URL`);
    return;
  }

  //-- execute command ---------------------------------------------------------

  const { command, debug } = opts;

  if (command) {
    executeCommand(command, { debug });
  }

  //-- wait for server to listen -----------------------------------------------

  const { interval, status, timeout } = opts;

  process.exitCode = 3;

  if (
    await waitListen({
      interval,
      status,
      timeout,
      url
    })
  ) {
    process.exitCode = 0;
  }
}
