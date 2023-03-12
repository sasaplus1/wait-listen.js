# wait-listen.js

wait for server to listen

## Installation

```
$ npm install wait-listen
```

## Usage

```
$ wait-listen --help
Usage: wait-listen [options]

wait for server to listen

Options:
  -c, --command <command>  execute command (default: "")
  -d, --debug              show command's stdout and stderr (default: false)
  -i, --interval <ms>      request interval (default: 500)
  -s, --status <code>      target status code (default: 200)
  -t, --timeout <ms>       timeout (default: 180000)
  -v, --version            output the version number
  -h, --help               display help for command

Example:
  $ wait-listen http://localhost:8080 && echo ready
  $ wait-listen http://localhost:8080 -c 'node server.js'
  $ wait-listen http://localhost:8080 -s 418
```

## License

The MIT license
