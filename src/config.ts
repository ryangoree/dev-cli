import { ConfigFile } from 'src/utils/ConfigFile';
import { getProjectRoot } from 'src/utils/getProjectRoot';
import { z } from 'zod/v4';

const Config = z
  .object({
    rpcUrls: z.record(
      z.string().refine((s) => parseInt(s)),
      z.string()
    ),
    host: z.string(),
    port: z.coerce.number(),
    proxyPort: z.coerce.number(),
  })
  .partial();
export type Config = z.infer<typeof Config>;
export type ConfigSetting = keyof Config;
export const configSettings = Object.keys(Config.shape) as ConfigSetting[];

const rpcUrls: Config['rpcUrls'] = {};
for (const [key, value] of Object.entries(process.env)) {
  const [, chainId] = key.match(/^FORK_URL_(\d+)$/) || [];
  if (chainId && value) rpcUrls[parseInt(chainId)] = value;
}

export const config = new ConfigFile({
  name: 'web3-dev-cli',
  path: getProjectRoot(),
  schema: Config,
  defaults: {
    rpcUrls,
    host: '127.0.0.1',
    port: 8545,
    proxyPort: 8546,
  },
});
