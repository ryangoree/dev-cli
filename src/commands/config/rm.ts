import { command } from 'clide-js';
import { config } from 'src/config';

export default command({
  description: 'Delete the config file',

  options: {
    force: {
      type: 'boolean',
      description: 'Force delete the file without confirmation',
      default: false,
    },
  },

  handler: async ({ options }) => {
    const confirmed = await options.force({
      prompt: 'Delete the config file?',
    });

    if (confirmed) {
      config.rm();
    }
  },
});
