import type { Abi, Address } from '@delvtech/drift';

export type AbiMap = {
  [chainId: number]: {
    [address: Address]: () => Promise<Abi>;
  };
};

const Multicall: AbiMap[number] = {
  '0xca11bde05977b3631167028862be2a173976ca11': async () => {
    const { IMulticall3 } = await import('./abis/IMulticall3');
    return IMulticall3.abi;
  },
};

export const abiMap: AbiMap = {
  1: {
    ...Multicall,

    // DAI
    '0x6b175474e89094c44da98b954eedeac495271d0f': async () => {
      const { erc20 } = await import('./abis/erc20');
      return erc20.abi;
    },

    // Element DAO
    '0xeacd577c3f6c44c3ffa398baad97ae12cdcfed4a': getCoreVotingAbi,
    '0x40309f197e7f94b555904df0f788a3f48cf326ab': getCoreVotingAbi,
    '0xca870e8aa4fcea85b5f0c6f4209c8cba9265b940': async () => {
      const { GSCVault } = await import('@delvtech/council-artifacts/GSCVault');
      return GSCVault.abi;
    },
    '0x02bd4a3b1b95b01f2aa61655415a5d3eaacaafdd': async () => {
      const { LockingVault } = await import(
        '@delvtech/council-artifacts/LockingVault'
      );
      return LockingVault.abi;
    },
    '0x6de73946eab234f1ee61256f10067d713af0e37a': async () => {
      const { VestingVault } = await import(
        '@delvtech/council-artifacts/VestingVault'
      );
      return VestingVault.abi;
    },
  },

  // Unichain
  130: {
    ...Multicall,
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
