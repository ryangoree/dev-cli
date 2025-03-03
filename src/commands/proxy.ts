import { command } from 'clide-js';
import { createWriteStream, writeFileSync, WriteStream } from 'node:fs';
import { createServer, request } from 'node:http';
import { config } from 'src/config';
import { parsers } from 'src/parsers';

const { host, port, proxyPort } = config.data();

export default command({
  description: 'Start a reverse proxy server to log requests and responses',

  options: {
    h: {
      alias: ['host'],
      type: 'string',
      description: 'The target host to proxy requests to',
      default: host,
    },
    p: {
      alias: ['port'],
      type: 'number',
      description: 'The target port to proxy requests to',
      default: port,
    },
    P: {
      alias: ['proxy-port'],
      type: 'number',
      description: 'The port to listen on',
      default: proxyPort,
    },
    l: {
      alias: ['save-logs'],
      type: 'boolean',
      description: 'Save logs to a file',
      default: true,
    },
    d: {
      alias: ['logs-dir'],
      type: 'string',
      description: 'The directory to save logs to',
      default: 'logs',
    },
    f: {
      alias: ['logs-file'],
      type: 'string',
      description: 'The file to save logs to',
      default: 'requests.log',
    },
    c: {
      alias: ['clear'],
      type: 'boolean',
      description: 'Clear the log file before starting the server',
      default: false,
    },
    b: {
      alias: ['body', 'body-parser'],
      type: 'string',
      description:
        'The parser to use for the request body. Supported parsers: json, urlencoded, abi',
      default: 'json',
      required: true,
    },
  },

  async handler({ options }) {
    // Logger //

    const saveLogs = await options.saveLogs({
      prompt: 'Save logs to a file?',
    });
    const logsDir = await options.logsDir();
    const logsFile = await options.logsFile();
    const clear = await options.clear();
    const logPath = `${logsDir}/${logsFile}`.replace(/(\.log)?$/i, '.log');
    let logStream: WriteStream | undefined;

    if (saveLogs) {
      console.log(`Logging requests to: ${logPath}`);
      if (clear) writeFileSync(logPath, '');
      logStream = createWriteStream(logPath, {
        flags: 'a', // Append mode
      });
    }

    function log(...args: any[]) {
      const timestamp = new Date().toISOString();
      const message = formatArgs(...args);
      const logLine = `[${timestamp}] ${message}\n`;
      if (logStream) logStream.write(logLine);
      console.log(logLine);
    }

    // Body parser

    const parserType = await options.body({
      prompt: {
        message: 'Choose a request parser',
        type: 'select',
        choices: Object.keys(parsers).map((name) => ({
          title: name,
          value: name,
        })),
      },
    });
    let parser = parsers[parserType];

    // Server //

    const host = await options.host();
    const port = await options.port();
    const proxyPort = await options.proxyPort();

    const server = createServer((req, res) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', async () => {
        // Log the request
        const parsedRequest = await parser.parse(body);
        log('⬇ Request:', parsedRequest);

        // Forward the request to Anvil
        const proxyReq = request(
          {
            hostname: host,
            port: port,
            path: req.url,
            method: req.method,
            headers: req.headers,
          },
          (proxyRes) => {
            // Log the response
            let body = '';
            proxyRes.on('data', (chunk) => (body += chunk));
            proxyRes.on('end', async () => {
              const parsedResponse = await parser.parse(body);
              log('⬆ Response:', parsedResponse);
            });

            // Send response back to client
            res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
            proxyRes.pipe(res);
          }
        );
        proxyReq.on('error', (err) => {
          log('Proxy Error:', err);
          res.writeHead(500);
          res.end('Proxy error');
        });
        proxyReq.write(body);
        proxyReq.end();
      });
    });

    // Start server
    await parser.init?.(`http://${host}:${port}`);
    server.listen(proxyPort, () =>
      console.log(`Proxy server running at: http://${host}:${proxyPort}`)
    );
  },
});

function formatArgs(...args: any[]) {
  return args.map(formatArg).join(' ');
}

function formatArg(arg: any) {
  if (typeof arg === 'object') {
    return JSON.stringify(arg, bigintReplacer, 2);
  }
  return arg;
}

function bigintReplacer(_: string, value: any) {
  return typeof value === 'bigint' ? value.toString() : value;
}
