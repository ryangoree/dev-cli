import { command } from 'clide-js';
import { inspect } from 'node:util';
import { config, type Config, type ConfigSetting } from 'src/config';
import { configSetting } from 'src/options/config/setting';
import { chainIdPrompt } from 'src/prompts/chainId';
import { z } from 'zod/v4';

export default command({
  description: 'Set a config setting',

  options: {
    setting: {
      ...configSetting,
      alias: ['s'],
      required: true,
    },
    value: {
      alias: ['v'],
      type: 'string',
      description: 'The value to set the setting to.',
      required: true,
    },
  },

  handler: async ({ options, client, next }) => {
    const setting = await options.setting({
      prompt: 'Select a setting',
    });

    let chainId: number | undefined;
    if (setting === 'rpcUrls') {
      chainId = await chainIdPrompt(client);
    }

    const rawValue = await options.value();
    let value: Config[ConfigSetting] = rawValue.trim();
    if (setting === 'rpcUrls') {
      if (!rawValue.startsWith('http://') && !rawValue.startsWith('https://')) {
        client.error('RPC URL must start with http:// or https://');
        return next();
      }
      value = {
        ...config.get('rpcUrls'),
        [`${chainId}`]: value,
      };
    }

    config.set(setting, value);
    client.log(
      `Set ${setting} to:`,
      inspect(value, {
        depth: null,
        colors: true,
        compact: false,
        maxArrayLength: null,
        maxStringLength: null,
        breakLength: 80,
      })
    );
    return next(value);
  },
});

type ZodDefType = z.ZodType['def']['type'];
const wrappedTypes: ZodDefType[] = ['optional', 'nullable'];
const objectTypes: ZodDefType[] = ['object', 'record', 'array'];
function isObjectType(schema: z.ZodType): boolean {
  let def = schema.def;
  while (wrappedTypes.includes(def.type)) {
    console.log('Unwrapping schema', def.type);
    def = (def as any).innerType.def;
  }
  console.log('Final schema type', def.type);
  return objectTypes.includes(def.type);
}
