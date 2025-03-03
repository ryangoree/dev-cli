import type { MaybePromise } from '@delvtech/drift';

export type Parser = {
  init?: (targetUrl: string) => MaybePromise<void>;
  parse: (body: string) => MaybePromise<unknown>;
};
