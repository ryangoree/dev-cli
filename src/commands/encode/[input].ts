import { command } from 'clide-js';
import { encodingOption } from 'src/options/encoding';

export default command({
  description: 'Encode an input string',

  options: {
    e: {
      ...encodingOption,
      required: true,
    },
  },

  handler: async ({ options, params, next }) => {
    const encoding = await options.encoding();
    const input = params.input as string;
    let encoded = '';

    switch (encoding) {
      case 'binary':
        encoded = Array.from(Buffer.from(input))
          .map((byte) => byte.toString(2).padStart(8, '0'))
          .join(' ');
        break;
      case 'hex':
        encoded = `0x${Buffer.from(input).toString('hex')}`;
        break;
      default:
        encoded = Buffer.from(input).toString(encoding);
    }

    console.log(encoded);
    next(encoded);
  },
});
