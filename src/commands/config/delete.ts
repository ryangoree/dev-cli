import { command } from 'clide-js';
import { config } from 'src/config';
import { configSetting } from 'src/options/config/setting';
import { chainIdPrompt } from 'src/prompts/chainId';

export default command({
  description: 'Delete a config setting',

  options: {
    setting: {
      ...configSetting,
      alias: ['s'],
      required: true,
    },
    force: {
      type: 'boolean',
      description: 'Force delete the setting without confirmation',
      default: false,
    },
  },

  handler: async ({ options, client, next }) => {
    const setting = await options.setting({
      prompt: 'Select a setting',
    });

    let deleted = false;

    if (setting === 'rpcUrls') {
      const chainId = await chainIdPrompt(client);
      const confirmed = await options.force({
        prompt: `Delete rpcUrl for chain ${chainId}?`,
      });
      if (confirmed) {
        const currentChainIds = config.get('rpcUrls') || {};
        if (`${chainId}` in currentChainIds) {
          delete currentChainIds[`${chainId}`];
          config.set('rpcUrls', currentChainIds);
          deleted = true;
        }
      }
    } else {
      const confirmed = await options.force({
        prompt: `Delete ${setting}?`,
      });
      if (confirmed) {
        deleted = config.delete(setting);
      }
    }

    if (deleted) {
      client.log(`Deleted ${setting}`);
    }

    return next(deleted);
  },
});
