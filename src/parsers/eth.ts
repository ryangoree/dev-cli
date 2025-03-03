import {
  createDrift,
  decodeFunctionData,
  decodeFunctionReturn,
  type Abi,
  type Address,
  type Bytes,
  type Extended,
  type Hash,
  type HexString,
  type MaybePromise,
  type OneOf,
} from '@delvtech/drift';
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
    Extended<{
      id: number;
      method?: OpenRpcRequest['method'];
    }>
  > {
    const payload = JSON.parse(body) as OpenRpcRequest;
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
        const abi = await abiMap[chainId]?.[address]?.();
        let parsedTopics: any = topics;
        if (abi) {
          parsedTopics = topics.map((topic) =>
            decodeFunctionData({ abi, data: topic })
          );
        }
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

type AbiMap = {
  [chainId: number]: {
    [address: Address]: () => Promise<Abi>;
  };
};

export const abiMap: AbiMap = {
  1: {
    // Element DAO
    '0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a': async () => {
      const { CoreVoting } = await import(
        '@delvtech/council-artifacts/CoreVoting'
      );
      return CoreVoting.abi;
    },
    '0x40309f197e7f94B555904DF0f788a3F48cF326aB': async () => {
      // GSC
      const { CoreVoting } = await import(
        '@delvtech/council-artifacts/CoreVoting'
      );
      return CoreVoting.abi;
    },
    '0xcA870E8aa4FCEa85b5f0c6F4209C8CBA9265B940': async () => {
      const { GSCVault } = await import('@delvtech/council-artifacts/GSCVault');
      return GSCVault.abi;
    },
    '0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD': async () => {
      const { LockingVault } = await import(
        '@delvtech/council-artifacts/LockingVault'
      );
      return LockingVault.abi;
    },
    '0x6De73946eab234F1EE61256F10067D713aF0e37A': async () => {
      const { VestingVault } = await import(
        '@delvtech/council-artifacts/VestingVault'
      );
      return VestingVault.abi;
    },
  },

  // Unichain
  130: {
    '0x284f11109359a7e1306c3e447ef14d38400063ff': async () => {
      const { UniswapV2Router02 } = await import('./abis/UniswapV2Router02');
      return UniswapV2Router02.abi;
    },
  },
};

async function getCoreVotingAbi() {
  const { CoreVoting } = await import('@delvtech/council-artifacts/CoreVoting');
  return CoreVoting.abi;
}
