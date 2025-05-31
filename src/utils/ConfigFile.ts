import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { getProjectRoot } from 'src/utils/getProjectRoot';
import type { OptionalValueKey } from 'src/utils/types';
import { z } from 'zod/v4';

/**
 * Options for the  creating a new {@linkcode ConfigFile} instance.
 */
export type ConfigFileOptions<T extends z.ZodObject> = {
  /**
   * The name to use for the config file. The name will be appended with `.json`
   * if it doesn't already end with it.
   * @default 'cli.config.json'
   */
  name?: string;

  /**
   * The path where the config will be saved; *excluding the filename*. Default
   * to the project root, determined by the presence of a `package.json` file.
   */
  path?: string;

  /**
   * A [Zod](https://zod.dev) schema to validate the config against.
   */
  schema?: T;
} & ({} extends z.infer<T> ? DefaultsOption<T> : Required<DefaultsOption<T>>);

type DefaultsOption<T extends z.ZodObject> = {
  /**
   * The default values the config will be created with and will reset to
   */
  defaults?: z.infer<T>;
};

/**
 * A JSON file for persisting config data.
 */
export class ConfigFile<T extends z.ZodObject> {
  /**
   * The path to the config file *including the filename*.
   */
  readonly path: string;

  /**
   * The default values the config will be created with and will reset to.
   */
  readonly defaults: ConfigFileOptions<T>['defaults'];

  /**
   * The schema to validate the config against.
   */
  readonly schema: T;

  constructor(
    {
      name = 'cli.config.json',
      path = getProjectRoot(),
      defaults = {},
      schema = z.object({}).passthrough() as T,
    } = {} as ConfigFileOptions<T>
  ) {
    if (!name.endsWith('.json')) name += '.json';
    this.path = resolve(process.cwd(), path, name);
    this.schema = schema;
    this.defaults = defaults;
  }

  /**
   * Read the config file and get the values as an object.
   */
  read(): z.infer<T> {
    type Data = z.infer<T>;
    let json: string;

    try {
      json = readFileSync(this.path, 'utf8');
    } catch (err) {
      this.reset();
      return this.defaults as Data;
    }

    try {
      return this.#parse(JSON.parse(json));
    } catch (err) {
      const backupPath = `${this.path}.bak`;
      writeFileSync(backupPath, json);
      this.reset();
      console.error(
        `Failed to parse config from ${this.path}. The file has been backed up at ${backupPath} and a new config file has been created with the default values.`
      );
      return this.defaults as Data;
    }
  }

  /**
   * Delete the config file.
   */
  rm(): void {
    try {
      rmSync(this.path);
    } catch (_) {}
  }

  /**
   * Set the value for a key or multiple keys in the config.
   * @param key - The key to set or an object of key-value pairs to set.
   * @param value - The value to set the key to if `key` is not an object.
   */
  set(values: Partial<z.infer<T>>): void;
  set<K extends keyof z.infer<T>>(key: K, value: z.infer<T>[K]): void;
  set<K extends keyof z.infer<T>>(
    keyOrValues: K | Partial<z.infer<T>>,
    value?: z.infer<T>[K]
  ): void {
    const data = this.read();

    if (typeof keyOrValues !== 'object' && value) {
      validateSerializable(keyOrValues.toString(), value);
      data[keyOrValues] = value;
    } else {
      for (const [key, value] of Object.entries(keyOrValues)) {
        validateSerializable(key as string, value);
      }
      Object.assign(data, keyOrValues);
    }
    this.#save(data);
  }

  /**
   * Get a value from the config by key.
   * @param key - The key to get the value for.
   * @returns The value of `config[key]`.
   */
  get<K extends keyof z.infer<T>>(key: K): z.infer<T>[K];
  get<K extends keyof z.infer<T>>(...keys: K[]): Pick<z.infer<T>, K>;
  get<K extends keyof z.infer<T>>(key: K, ...restKeys: K[]) {
    const data = this.read();
    return restKeys.length === 0
      ? data[key]
      : Object.fromEntries([
          [key, data[key]],
          ...Object.entries(data).filter(([k]) => restKeys.includes(k as any)),
        ]);
  }

  /**
   * Check to see if the config contains all given keys.
   * @param keys - The keys to look for.
   * @returns True if all keys exists, false otherwise.
   */
  has<T extends string>(...keys: T[]): boolean {
    const data = this.read();

    let hasAllKeys = true;

    for (const key of keys) {
      if (!(key in data)) {
        hasAllKeys = false;
      }
    }

    return hasAllKeys;
  }

  /**
   * Delete entries in the config by their keys.
   * @param keys - The keys of the entries to delete.
   * @returns True if all entries were deleted, false otherwise.
   */
  delete(...keys: OptionalValueKey<z.infer<T>>[]): boolean {
    const data = this.read();

    let didDeleteSome = false;
    let didDeleteAll = true;

    for (const key of keys) {
      if ((key as string) in data) {
        delete data[key];
        didDeleteSome = true;
      } else {
        didDeleteAll = false;
      }
    }

    if (didDeleteSome) {
      this.#save(data);
    }

    return didDeleteAll;
  }

  /**
   * Reset config to defaults.
   */
  reset() {
    this.#save(this.defaults as z.infer<T>);
    return this.defaults;
  }

  /**
   * Throw an error if the data doesn't match the schema.
   * @param data - The data to validate against thdeve schema.
   */
  #parse(data: unknown): z.infer<T> | undefined {
    const parsed = this.schema.safeParse(data);
    if (parsed.error) {
      throw new Error(
        `Failed to save config. Data does not match schema: ${parsed.error.message}`
      );
    }
    return parsed.data;
  }

  /**
   * Save the config as JSON.
   * @param data - The config data.
   */
  #save(data: z.infer<T>) {
    data = this.#parse(data);
    const json = JSON.stringify(data, null, 2);

    mkdirSync(dirname(this.path), { recursive: true });

    writeFileSync(this.path, json, {
      encoding: 'utf8',
      flag: 'w',
    });
  }
}

const invalidTypes = ['undefined', 'function', 'symbol', 'bigint'];

/**
 * Throw an error if a value is not JSON serializable
 * @param key - The key being set (used to provide more context in the error)
 * @param value - The value to validate
 */
function validateSerializable(key: string, value: unknown) {
  if (value === null || invalidTypes.includes(typeof value)) {
    throw new TypeError(
      `Failed to set value of type \`${typeof value}\` for key \`${key}\`. Values must be JSON serializable.`
    );
  }
}
