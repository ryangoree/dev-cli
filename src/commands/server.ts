import { command } from 'clide-js';
import { spawnSync } from 'node:child_process';
import { config } from 'src/config';

const { host, port, rpcUrls = {} } = config.read();

export default command({
  description: 'Start an anvil server',

  options: {
    chain: {
      alias: ['c'],
      type: 'number',
      description: 'Chain ID to run the server on',
      choices: [31337, ...Object.keys(rpcUrls).map((key) => parseInt(key))],
      required: true,
    },
    host: {
      type: 'string',
      description: 'The host to run the server on',
      default: host,
    },
    port: {
      alias: ['p'],
      type: 'number',
      description: 'The port to run the server on',
      default: port,
    },
  },

  handler: async ({ options }) => {
    const anvilOptions: string[] = [];

    const chain = await options.chain();
    const forkUrl = chain && rpcUrls[chain] ? rpcUrls[chain] : undefined;
    if (forkUrl) {
      anvilOptions.push(`--fork-url=${forkUrl}`);
    }

    const port = await options.port();
    if (port) {
      anvilOptions.push(`--port=${port}`);
    }

    const host = await options.host();
    if (host) {
      anvilOptions.push(`--host=${host}`);
    }

    spawnSync('anvil', anvilOptions, { stdio: 'inherit' });
  },
});
