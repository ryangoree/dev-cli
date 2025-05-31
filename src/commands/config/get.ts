import { command } from 'clide-js';
import { config } from 'src/config';
import { configSetting } from 'src/options/config/setting';
import { chainIdPrompt } from 'src/prompts/chainId';
import { inspect } from 'util';

export default command({
  description: 'Get a config setting',

  options: {
    setting: {
      ...configSetting,
      alias: ['s'],
      required: true,
    },
  },

  handler: async ({ options, client, next }) => {
    const setting = await options.setting({
      prompt: 'Select a setting',
    });

    let value;
    if (setting === 'rpcUrls') {
      const chainId = await chainIdPrompt(client);
      value = config.get('rpcUrls')?.[chainId];
    } else {
      value = config.get(setting);
    }

    if (value === undefined) {
      client.log('No value set');
    } else {
      client.log(
        inspect(value, {
          depth: null,
          colors: true,
          compact: false,
          maxArrayLength: null,
          maxStringLength: null,
          breakLength: 80,
        })
      );
    }

    return next(value);
  },
});
