import { command, passThroughCommand } from 'clide-js';

export default command({
  ...passThroughCommand,
  description: 'Decode an input string',
});
