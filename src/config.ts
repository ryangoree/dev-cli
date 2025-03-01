import { getAppRootDir } from 'src/utils/getAppRootDir';
import { JsonStore } from 'src/utils/JsonStore';

export interface ClideConfig {
  rpcUrl?: string;
}

export const config = new JsonStore({
  name: 'web3-dev-cli',
  path: getAppRootDir(),
  schema: {
    rpcUrls: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          chainId: {
            type: 'number',
          },
          url: {
            type: 'string',
          },
        },
        required: ['chainId', 'url'],
      },
    },
    host: {
      type: 'string',
    },
    port: {
      type: 'number',
    },
    proxyPort: {
      type: 'number',
    },
  },
  defaults: {
    rpcUrls: [
      { chainId: 1, url: process.env.FORK_URL_1 },
      { chainId: 130, url: process.env.FORK_URL_130 },
    ],
    host: '127.0.0.1',
    port: 8545,
    proxyPort: 8546,
  },
});
