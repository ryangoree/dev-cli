import { getAppRootDir } from 'src/utils/getAppRootDir';
import { JsonStore } from 'src/utils/JsonStore';
import { z } from 'zod';

// Schema
const Config = z
  .object({
    rpcUrls: z.record(z.coerce.number(), z.string()),
    host: z.string(),
    port: z.number(),
    proxyPort: z.number(),
  })
  .partial();
type Config = z.infer<typeof Config>;

// RPC URLs
const rpcUrls: Config['rpcUrls'] = {};
for (const [key, value] of Object.entries(process.env)) {
  const [, chainId] = key.match(/^FORK_URL_(\d+)$/) || [];
  if (chainId && value) {
    rpcUrls[parseInt(chainId)] = value;
  }
}

// Store
export const config = new JsonStore({
  name: 'web3-dev-cli',
  path: getAppRootDir(),
  schema: Config,
  defaults: {
    rpcUrls,
    host: '127.0.0.1',
    port: 8545,
    proxyPort: 8546,
  },
});
