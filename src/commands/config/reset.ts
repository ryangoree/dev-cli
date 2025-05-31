import { command } from 'clide-js';
import { config } from 'src/config';
import listCommand from 'src/commands/config/list';

export default command({
  description: 'Reset all config settings to default',

  handler: async ({ fork }) => {
    config.reset();
    console.log('Reset all config settings to default');
    return fork({ commands: [listCommand] });
  },
});
