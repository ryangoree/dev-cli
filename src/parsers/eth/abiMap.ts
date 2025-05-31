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

    // Hyperdrive
    '0xd7e470043241C10970953Bd8374ee6238e77D735': getHyperdriveAbi,
    '0x324395D5d835F84a02A75Aa26814f6fD22F25698': getHyperdriveAbi,
    '0xca5dB9Bb25D09A9bF3b22360Be3763b5f2d13589': getHyperdriveAbi,
    '0xd41225855A5c5Ba1C672CcF4d72D1822a5686d30': getHyperdriveAbi,
    '0xA29A771683b4857bBd16e1e4f27D5B6bfF53209B': getHyperdriveAbi,
    '0x4c3054e51b46BE3191be9A05e73D73F1a2147854': getHyperdriveAbi,
    '0x158Ed87D7E529CFE274f3036ade49975Fb10f030': getHyperdriveAbi,
    '0xc8D47DE20F7053Cc02504600596A647A482Bbc46': getHyperdriveAbi,
    '0x7548c4F665402BAb3a4298B88527824B7b18Fe27': getHyperdriveAbi,
    '0xA4090183878d5B7b6Ad104863743dd7E58985321': getHyperdriveAbi,
    '0x8f2AC104e07d94488a1821E5A393351FCA9239aa': getHyperdriveAbi,
    '0x05b65FA90AD702e6Fd0C3Bd7c4c9C47BAB2BEa6b': getHyperdriveAbi,
    '0xf1232Dc21eADAf503D82f1e1361CfF2BBf40394D': getHyperdriveAbi,
  },

  // Gnosis
  100: {
    '0x2f840f1575EE77adAa43415Ac5953F7Db9F8C6ba': getHyperdriveAbi,
    '0xEe9BFf933aDD313C4289E98dA80fEfbF9d5Cd9Ba': getHyperdriveAbi,
    '0x9248f874AaA2c53AD9324d7A2D033ea133443874': getHyperdriveAbi,
  },

  // Unichain
  130: {
    ...Multicall,
    '0x284f11109359a7e1306c3e447ef14d38400063ff': async () => {
      const { UniswapV2Router02 } = await import('./abis/UniswapV2Router02');
      return UniswapV2Router02.abi;
    },
  },

  // Base
  8453: {
    '0x2a1ca35Ded36C531F77c614b5AAA0d4F86edbB06': getHyperdriveAbi,
    '0xFcdaF9A4A731C24ed2E1BFd6FA918d9CF7F50137': getHyperdriveAbi,
    '0x1243C06146ACa2D4Aaf8F9860F6D8d59d636d46C': getHyperdriveAbi,
    '0xceD9F810098f8329472AEFbaa1112534E96A5c7b': getHyperdriveAbi,
    '0x9bAdB6A21FbA04EE94fde3E85F7d170E90394c89': getHyperdriveAbi,
    '0xD9b66D9a819B36ECEfC26B043eF3B422d5A6123a': getHyperdriveAbi,
    '0xdd8E1B14A04cbdD98dfcAF3F0Db84A80Bfb8FC25': getHyperdriveAbi,
  },

  // Linea
  59144: {
    '0xB56e0Bf37c4747AbbC3aA9B8084B0d9b9A336777': getHyperdriveAbi,
    '0x1cB0E96C07910fee9a22607bb9228c73848903a3': getHyperdriveAbi,
  },

  // Sepolia
  11155111: {
    '0xC7cb718D5f1c5B4839045aed2620FABc1cF13CD3': getHyperdriveAbi,
    '0xfA8dB2177F1e1eE4327c9b9d1389b1173bC5A5e2': getHyperdriveAbi,
    '0x54A93937EE00838d659795b9bbbe904a00DdF278': getHyperdriveAbi,
    '0x87621c072B1967730b70F4c0536D739c2053d34c': getHyperdriveAbi,
    '0x8DFc7c74331162FE2FCc2Ee83173d806E4Ca2CE8': getHyperdriveAbi,
    '0x1F5625B9d2B1c02b06bcA6F95BEE71b9700Bf95D': getHyperdriveAbi,
    '0xb59b98209e82Fc0549Bb2572809B7CD10289Bb91': getHyperdriveAbi,
    '0x51C054F75b2c4b53E8E5114430C3ded4572473D8': getHyperdriveAbi,
    '0xE352F4D16C7Ee4162d1aa54b77A15d4DA8f35f4b': getHyperdriveAbi,
    '0x0399BBA8DE5959007148a95ADaaD04eA3172513E': getHyperdriveAbi,
  },
};

async function getCoreVotingAbi() {
  const { CoreVoting } = await import('@delvtech/council-artifacts/CoreVoting');
  return CoreVoting.abi;
}

async function getHyperdriveAbi() {
  const { IHyperdrive } = await import(
    '@delvtech/hyperdrive-artifacts/IHyperdrive'
  );
  return IHyperdrive.abi;
}
