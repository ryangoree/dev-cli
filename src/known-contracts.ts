import type { Abi } from '@delvtech/drift';

type KnownContracts = {
  [chainId: string]: {
    [address: string]: {
      name: string;
      getAbi: () => Promise<Abi>;
    };
  };
};

export const knownContracts: KnownContracts = {
  // Unichain
  '130': {
    '0x284f11109359a7e1306c3e447ef14d38400063ff': {
      name: 'UniswapV2Router02',
      getAbi: () =>
        import('./abis/UniswapV2Router02').then(
          ({ UniswapV2Router02: { abi } }) => abi
        ),
    },
  },
};
