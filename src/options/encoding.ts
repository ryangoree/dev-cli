import { option } from 'clide-js';

export const encodingOption = option({
  type: 'encoding',
  alias: ['encoding'],
  description: 'The encoding type.',
  choices: [
    'ascii',
    'base64',
    'base64url',
    'binary',
    'hex',
    'latin1',
    'ucs-2',
    'utf-16le',
    'utf-8',
  ],
});

declare module 'clide-js' {
  interface OptionPrimitiveTypeMap {
    encoding: BufferEncoding;
  }
}
