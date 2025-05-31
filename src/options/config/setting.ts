import { option } from 'clide-js';
import { configSettings, type ConfigSetting } from 'src/config';

export const configSetting = option({
  type: 'string',
  customType: 'configSetting',
  description: 'The name of the config setting',
  choices: configSettings,
});

declare module 'clide-js' {
  interface OptionCustomTypeMap {
    configSetting: ConfigSetting;
  }
}
