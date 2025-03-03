import type { Parser } from 'src/parsers/types';

export const urlencodedParser: Parser = {
  parse: (body: string) => {
    const result: Record<string, string> = {};
    const params = new URLSearchParams(body);
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  },
};
