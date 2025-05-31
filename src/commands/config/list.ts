import { command } from 'clide-js';
import { config } from 'src/config';
import { inspect } from 'util';

export default command({
  description: 'List all config settings',

  handler: async ({ client, next }) => {
    const values = config.read();
    Object.entries(values).map(([setting, value]) => {
      client.log(
        `${setting}:`,
        inspect(value, {
          depth: null,
          colors: true,
          compact: false,
          maxArrayLength: null,
          maxStringLength: null,
          breakLength: 80,
        })
      );
    });
    return next(values);
  },
});
