import {
  createDrift,
  decodeFunctionData,
  decodeFunctionReturn,
  type Address,
  type Bytes,
  type Extended,
  type Hash,
  type HexString,
  type MaybePromise,
  type OneOf,
} from '@delvtech/drift';
import { abiMap } from 'src/parsers/eth/abiMap';
import type { Parser } from 'src/parsers/types';

let chainId = 1;
let responseHandlerMap = new Map<
  number, // request id
  (response: OpenRpcRequest<undefined>) => MaybePromise<{
    id: number;
    result: unknown;
    method?: OpenRpcRequest['method'];
  }>
>();

export const ethParser: Parser = {
  async init(targetUrl: string) {
    chainId = await createDrift({ rpcUrl: targetUrl }).getChainId();
  },

  async parse(body: string): Promise<
    Extended<
      | {
          id: number;
          method?: OpenRpcRequest['method'];
        }
      | {
          body: string;
        }
    >
  > {
    let payload: OpenRpcRequest;
    try {
      payload = JSON.parse(body);
    } catch (error) {
      return { body: String(body) };
    }
    const { id, method, result, params } = payload;

    if (result) {
      const handler = responseHandlerMap.get(id);
      const response = { id, method, result };
      return handler?.(response) || response;
    }

    switch (method) {
      case 'eth_chainId': {
        responseHandlerMap.set(id, ({ result }) => {
          chainId = parseInt(result, 16);
          return {
            id,
            method: 'eth_chainId',
            result: chainId,
          };
        });

        return { id, method };
      }

      case 'eth_call': {
        const [{ to, data }] = params;
        const abi = await abiMap[chainId]?.[to]?.();
        let parsedData: any = data;
        let fn: string | undefined;

        if (abi) {
          const { args, functionName } = decodeFunctionData({ abi, data });
          fn = functionName;
          parsedData = { fn, args };
        }

        responseHandlerMap.set(id, ({ id, result }) => {
          return {
            id,
            method: 'eth_call',
            result: fn
              ? {
                  fn,
                  address: to,
                  return: decodeFunctionReturn({ abi, data, fn }),
                }
              : result,
          };
        });

        return { id, method, to, data: parsedData };
      }

      case 'eth_getLogs': {
        const [{ address, topics }] = params;
        responseHandlerMap.set(id, ({ id, result }) => {
          return { id, method, result };
        });
        return { id, method, address, topics };
      }

      default:
        responseHandlerMap.set(id, ({ id, result }) => {
          return { id, method, result };
        });
        return payload;
    }
  },
};

// Eth RPC //

type OpenRpcRequest<
  TMethod extends OpenRpcRequest['method'] | (string & {}) | undefined =
    | string
    | undefined
> = OneOf<
  | {
      id: number;
      result: Bytes;
    }
  | {
      id: number;
      method: 'eth_chainId';
    }
  | {
      id: number;
      method: 'eth_call';
      params: [{ to: Address; data: Bytes }, HexString];
    }
  | {
      id: number;
      method: 'eth_getLogs';
      params: [{ address: Address; topics: Hash[] }, HexString];
    }
  | {
      id: number;
      result: Bytes;
    }
> &
  (undefined extends TMethod ? { method?: TMethod } : { method: TMethod });

// ABIs //
