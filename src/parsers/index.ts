import type { Parser } from 'src/parsers/types';
import { ethParser } from 'src/parsers/eth/eth';
import { urlencodedParser } from 'src/parsers/urlencoded';

export const parsers: Record<string, Parser> = {
  eth: ethParser,
  json: JSON,
  urlencoded: urlencodedParser,
};
