import { command } from 'clide-js';
import { config } from 'src/config';

export default command({
  description: 'Get the config path',

  handler: async ({ next, client }) => {
    const path = config.path;
    client.log(path);
    return next(path);
  },
});
