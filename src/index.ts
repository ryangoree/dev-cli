import { help, run } from 'clide-js';
import { commandMenu } from 'clide-plugin-command-menu';
import 'dotenv/config';

await run({
  plugins: [
    help({ maxWidth: 100 }),
    commandMenu({
      enabled: (options) => !options.help,
    }),
  ],
});
