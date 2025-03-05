import { command, passThroughCommand } from 'clide-js';

export default command({
  ...passThroughCommand,
  description: 'Encode an input string',
});
