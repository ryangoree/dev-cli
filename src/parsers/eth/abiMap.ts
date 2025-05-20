import type { Abi, Address } from '@delvtech/drift';

export type AbiMap = {
  [chainId: number]: {
    [address: Address]: () => Promise<Abi>;
  };
};

const Multicall: AbiMap[number] = {
  '0xcA11bde05977b3631167028862bE2a173976CA11': async () => {
    const { IMulticall3 } = await import('./abis/IMulticall3');
    return IMulticall3.abi;
  },
};

export const abiMap: AbiMap = {
  1: {
    ...Multicall,
    // Element DAO
    '0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a': getCoreVotingAbi,
    '0x40309f197e7f94B555904DF0f788a3F48cF326aB': getCoreVotingAbi,
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
