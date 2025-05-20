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
const forkUrl1 = process.env.FORK_URL_1;
if (forkUrl1) {
  rpcUrls[1] = forkUrl1;
}
const forkUrl130 = process.env.FORK_URL_130;
if (forkUrl130) {
  rpcUrls[130] = forkUrl130;
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
