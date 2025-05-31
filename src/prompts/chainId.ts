import type { Client } from 'clide-js';

export function chainIdPrompt(client: Client) {
  return client.prompt({
    message: 'Enter the chain ID',
    type: 'number',
    validate: (value) => {
      if (isNaN(value)) return 'Chain ID must be a number';
      if (value < 0) return 'Chain ID must be a positive number';
      if (parseInt(value) !== value) return 'Chain ID must be an integer';
      return true;
    },
  });
}
