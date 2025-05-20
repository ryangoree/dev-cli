import { option } from 'clide-js';

export const encodingOption = option({
  type: 'string',
  alias: ['encoding'],
  description: 'The encoding type.',
  customType: 'encoding',
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
  interface OptionCustomTypeMap {
    encoding: BufferEncoding;
  }
}
