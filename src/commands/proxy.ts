import { command } from 'clide-js';
import { createWriteStream, writeFileSync, WriteStream } from 'node:fs';
import { createServer, request } from 'node:http';
import { config } from 'src/config';

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
      default: `requests.log`,
    },
    c: {
      alias: ['clear'],
      type: 'boolean',
      description: 'Clear the log file before starting the server',
      default: false,
    },
  },

  async handler({ options }) {
    // Options //

    const host = await options.host();
    const port = await options.port();
    const proxyPort = await options.proxyPort();
    const saveLogs = await options.saveLogs();
    const logsDir = await options.logsDir();
    const logsFile = await options.logsFile();
    const clear = await options.clear();

    // Logger //

    const logPath = `${logsDir}/${logsFile}`;
    let logStream: WriteStream | undefined;

    if (saveLogs) {
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

    // Server //

    const server = createServer((req, res) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', async () => {
        // Log the request
        log('⬇ Request:', JSON.parse(body));

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
            proxyRes.on('end', () => log('⬆ Response:', JSON.parse(body)));

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
    server.listen(proxyPort, () =>
      console.log(`Proxy server running at: ${`http://${host}:${proxyPort}`}`)
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
