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

    // Tokens //

    // Liquid staked Ether 2.0 (stETH)
    '0xae7ab96520de3a18e5e111b5eaab095312d7fe84': getErc20Abi,
    // Dai Stablecoin (DAI)
    '0x6b175474e89094c44da98b954eedeac495271d0f': getErc20Abi,
    // ether.fi ETH (eETH)
    '0x35fa164735182de50811e8e2e824cfb9b6118ac2': getErc20Abi,
    // USD Coin (USDC)
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': getErc20Abi,
    // Rocket Pool ETH (rETH)
    '0xae78736cd615f374d3085123a210448e74fc6393': getErc20Abi,
    // USDA (USDA)
    '0x0000206329b97db379d5e1bf586bbdb969c63274': getErc20Abi,
    // Staked USDA (stUSD)
    '0x0022228a2cc5e7ef0274a7baa600d44da5ab5776': getErc20Abi,
    // Renzo Restaked ETH (ezETH)
    '0xbf5495efe5db9ce00f80364c8b423567e58d2110': getErc20Abi,
    // Savings Dai (sDAI)
    '0x83f20f44975d03b1b09e64809b757c47f942beea': getErc20Abi,
    // USDS Stablecoin (USDS)
    '0xdc035d45d973e3ec169d2276ddab16f1e407384f': getErc20Abi,
    // Savings USDS (sUSDS)
    '0xa3931d71877c0e7a3148cb7eb4463524fec27fbd': getErc20Abi,
    // USDe (USDe)
    '0x4c9edd5852cd905f086c759e8383e09bff1e68b3': getErc20Abi,
    // Staked USDe (sUSDe)
    '0x9d39a5de30e57443bff2a8307a4256c8797a3497': getErc20Abi,
    // Gyro Dollar (GYD)
    '0xe07f9d810a48ab5c3c914ba3ca53af14e4491e8a': getErc20Abi,
    // Savings GYD (sGYD)
    '0xea50f402653c41cadbafd1f788341db7b7f37816': getErc20Abi,
    // Morpho Token (MORPHO)
    '0x58d97b57bb95320f9a05dc918aef65434969c2b2': getErc20Abi,
    // Legacy Morpho Token (MORPHO)
    '0x9994e35db50125e0df82e4c2dde62496ce330999': getErc20Abi,

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
    '0xbe082293b646cb619a638d29e8eff7cf2f46aa3a': getHyperdriveRegistryAbi,
    '0xd7e470043241c10970953bd8374ee6238e77d735': getHyperdriveAbi,
    '0x324395d5d835f84a02a75aa26814f6fd22f25698': getHyperdriveAbi,
    '0xca5db9bb25d09a9bf3b22360be3763b5f2d13589': getHyperdriveAbi,
    '0xd41225855a5c5ba1c672ccf4d72d1822a5686d30': getHyperdriveAbi,
    '0xa29a771683b4857bbd16e1e4f27d5b6bff53209b': getHyperdriveAbi,
    '0x4c3054e51b46be3191be9a05e73d73f1a2147854': getHyperdriveAbi,
    '0x158ed87d7e529cfe274f3036ade49975fb10f030': getHyperdriveAbi,
    '0xc8d47de20f7053cc02504600596a647a482bbc46': getHyperdriveAbi,
    '0x7548c4f665402bab3a4298b88527824b7b18fe27': getHyperdriveAbi,
    '0xa4090183878d5b7b6ad104863743dd7e58985321': getHyperdriveAbi,
    '0x8f2ac104e07d94488a1821e5a393351fca9239aa': getHyperdriveAbi,
    '0x05b65fa90ad702e6fd0c3bd7c4c9c47bab2bea6b': getHyperdriveAbi,
    '0xf1232dc21eadaf503d82f1e1361cff2bbf40394d': getHyperdriveAbi,
  },

  // Gnosis
  100: {
    // Tokens //

    // Wrapped liquid staked Ether 2.0 from Mainnet (wstETH)
    '0x6c76971f98945ae98dd7d4dfca8711ebea946ea6': getErc20Abi,
    // Gyro Dollar (GYD)
    '0xca5d8f8a8d49439357d3cf46ca2e720702f132b8': getErc20Abi,
    // Savings GYD (sGYD)
    '0xea50f402653c41cadbafd1f788341db7b7f37816': getErc20Abi,
    // Wrapped XDAI (WXDAI)
    '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d': getErc20Abi,
    // Savings xDAI (sDAI)
    '0xaf204776c7245bf4147c2612bf6e5972ee483701': getErc20Abi,
    // Hyperdrive Miles (MILES)
    '0x79385d4b4c531bbbda25c4cfb749781bd9e23039': getErc20Abi,

    // Hyperdrive
    '0x666fa9ef9bca174a042c4c306b23ba8ee0c59666': getHyperdriveRegistryAbi,
    '0x2f840f1575ee77adaa43415ac5953f7db9f8c6ba': getHyperdriveAbi,
    '0xee9bff933add313c4289e98da80fefbf9d5cd9ba': getHyperdriveAbi,
    '0x9248f874aaa2c53ad9324d7a2d033ea133443874': getHyperdriveAbi,
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
    // Tokens //

    // Volatile AMM - USDC/AERO (vAMM-USDC/AERO)
    '0x6cdcb1c4a4d1c3c6d054b27ac5b77e89eafb971d': getErc20Abi,
    // Coinbase Wrapped Staked ETH (cbETH)
    '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22': getErc20Abi,
    // USD Coin (USDC)
    '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': getErc20Abi,
    // Moonwell Flagship USDC (mwUSDC)
    '0xc1256ae5ff1cf2719d4937adb3bbccab2e00a2ca': getErc20Abi,
    // Wrapped Ether (WETH)
    '0x4200000000000000000000000000000000000006': getErc20Abi,
    // Moonwell Flagship ETH (mwETH)
    '0xa0e430870c4604ccfc7b38ca7845b1ff653d0ff1': getErc20Abi,
    // EURC (EURC)
    '0x60a3e35cc302bfa44cb288bc5a4f316fdb1adb42': getErc20Abi,
    // Moonwell Flagship EURC (mwEURC)
    '0xf24608e0ccb972b0b0f4a6446a0bbf58c701a026': getErc20Abi,
    // Num ARS (nARS)
    '0x5e40f26e89213660514c51fb61b2d357dbf63c85': getErc20Abi,
    // Num Yield Bearing Num ARS (snARS)
    '0xc1f4c75e8925a67be4f35d6b1c044b5ea8849a58': getErc20Abi,
    // WELL (WELL)
    '0xa88594d404727625a9437c3f886c7643872296ae': getErc20Abi,
    // Aerodrome (AERO)
    '0x940181a94a35a4569e4529a3cdfb74e38fd98631': getErc20Abi,
    // Morpho Token (MORPHO)
    '0xbaa5cc21fd487b8fcc2f632f3f4e8d37262a0842': getErc20Abi,

    // Hyperdrive
    '0x6668310631ad5a5ac92dc9549353a5baae16c666': getHyperdriveRegistryAbi,
    '0x2a1ca35ded36c531f77c614b5aaa0d4f86edbb06': getHyperdriveAbi,
    '0xfcdaf9a4a731c24ed2e1bfd6fa918d9cf7f50137': getHyperdriveAbi,
    '0x1243c06146aca2d4aaf8f9860f6d8d59d636d46c': getHyperdriveAbi,
    '0xced9f810098f8329472aefbaa1112534e96a5c7b': getHyperdriveAbi,
    '0x9badb6a21fba04ee94fde3e85f7d170e90394c89': getHyperdriveAbi,
    '0xd9b66d9a819b36ecefc26b043ef3b422d5a6123a': getHyperdriveAbi,
    '0xdd8e1b14a04cbdd98dfcaf3f0db84a80bfb8fc25': getHyperdriveAbi,
  },

  // Linea
  59144: {
    // Tokens //

    // Renzo Restaked ETH (ezETH)
    '0x2416092f143378750bb29b79ed961ab195cceea5': getErc20Abi,
    // rsETHWrapper (wrsETH)
    '0xd2671165570f41bbb3b0097893300b6eb6101e6c': getErc20Abi,

    // Hyperdrive
    '0x6668310631ad5a5ac92dc9549353a5baae16c666': getHyperdriveRegistryAbi,
    '0xb56e0bf37c4747abbc3aa9b8084b0d9b9a336777': getHyperdriveAbi,
    '0x1cb0e96c07910fee9a22607bb9228c73848903a3': getHyperdriveAbi,
  },

  // Sepolia
  11155111: {
    // Tokens //

    // RocketPool ETH (RETH)
    '0x4713c86d0e467064a4cd2a974b7fda79f7efc338': getErc20Abi,
    // Liquid staked Ether 2.0 (stETH)
    '0x7c485f458ad1f32ff66bc45306fd32974c963c32': getErc20Abi,
    // DAI (DAI)
    '0xe8b99bf4249d90c0eb900651f92485f7160a0513': getErc20Abi,
    // Savings DAI (SDAI)
    '0xff8afe6bb92eb9d8e80c607bbe5bbb78bf1201df': getErc20Abi,
    // Renzo ezETH (ezETH)
    '0xdd0d63e304f3d9d9e54d8945be95011867c80e4f': getErc20Abi,

    // Hyperdrive
    '0x03f6554299acf544ac646305800f57db544b837a': getHyperdriveRegistryAbi,
    '0xc7cb718d5f1c5b4839045aed2620fabc1cf13cd3': getHyperdriveAbi,
    '0xfa8db2177f1e1ee4327c9b9d1389b1173bc5a5e2': getHyperdriveAbi,
    '0x54a93937ee00838d659795b9bbbe904a00ddf278': getHyperdriveAbi,
    '0x87621c072b1967730b70f4c0536d739c2053d34c': getHyperdriveAbi,
    '0x8dfc7c74331162fe2fcc2ee83173d806e4ca2ce8': getHyperdriveAbi,
    '0x1f5625b9d2b1c02b06bca6f95bee71b9700bf95d': getHyperdriveAbi,
    '0xb59b98209e82fc0549bb2572809b7cd10289bb91': getHyperdriveAbi,
    '0x51c054f75b2c4b53e8e5114430c3ded4572473d8': getHyperdriveAbi,
    '0xe352f4d16c7ee4162d1aa54b77a15d4da8f35f4b': getHyperdriveAbi,
    '0x0399bba8de5959007148a95adaad04ea3172513e': getHyperdriveAbi,
  },
};

async function getErc20Abi() {
  const { erc20 } = await import('./abis/erc20');
  return erc20.abi;
}

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

async function getHyperdriveRegistryAbi() {
  const { IHyperdriveRegistry } = await import(
    '@delvtech/hyperdrive-artifacts/IHyperdriveRegistry'
  );
  return IHyperdriveRegistry.abi;
}
