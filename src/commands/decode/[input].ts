import { command } from 'clide-js';
import { encodingOption } from 'src/options/encoding';

export default command({
  description: 'Decode an input string',

  options: {
    e: {
      ...encodingOption,
      required: true,
    },
  },

  handler: async ({ options, params, next }) => {
    const encoding = await options.encoding();
    const input = params.input as string;
    let decoded = Buffer.from(input, encoding).toString();

    switch (encoding) {
      case 'binary':
        decoded = input
          .replace(/^0b/, '')
          .split(' ')
          .map((char) => String.fromCharCode(parseInt(char, 2)))
          .join('');
        break;
      case 'hex':
        decoded = Buffer.from(input.replace(/^0x/, ''), encoding).toString();
        break;
      default:
        decoded = Buffer.from(input, encoding).toString();
    }

    console.log(decoded);
    next(decoded);
  },
});
