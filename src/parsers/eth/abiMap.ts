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
    '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84': getErc20Abi,
    // Dai Stablecoin (DAI)
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': getErc20Abi,
    // ether.fi ETH (eETH)
    '0x35fA164735182de50811E8e2E824cFb9B6118ac2': getErc20Abi,
    // USD Coin (USDC)
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': getErc20Abi,
    // Rocket Pool ETH (rETH)
    '0xae78736Cd615f374D3085123A210448E74Fc6393': getErc20Abi,
    // USDA (USDA)
    '0x0000206329b97DB379d5E1Bf586BbDB969C63274': getErc20Abi,
    // Staked USDA (stUSD)
    '0x0022228a2cc5E7eF0274A7Baa600d44da5aB5776': getErc20Abi,
    // Renzo Restaked ETH (ezETH)
    '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110': getErc20Abi,
    // Savings Dai (sDAI)
    '0x83F20F44975D03b1b09e64809B757c47f942BEeA': getErc20Abi,
    // USDS Stablecoin (USDS)
    '0xdC035D45d973E3EC169d2276DDab16f1e407384F': getErc20Abi,
    // Savings USDS (sUSDS)
    '0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD': getErc20Abi,
    // USDe (USDe)
    '0x4c9EDD5852cd905f086C759E8383e09bff1E68B3': getErc20Abi,
    // Staked USDe (sUSDe)
    '0x9D39A5DE30e57443BfF2A8307A4256c8797A3497': getErc20Abi,
    // Gyro Dollar (GYD)
    '0xe07F9D810a48ab5c3c914BA3cA53AF14E4491e8A': getErc20Abi,
    // Savings GYD (sGYD)
    '0xeA50f402653c41cAdbaFD1f788341dB7B7F37816': getErc20Abi,
    // Morpho Token (MORPHO)
    '0x58D97B57BB95320F9a05dC918Aef65434969c2B2': getErc20Abi,
    // Legacy Morpho Token (MORPHO)
    '0x9994E35Db50125E0DF82e4c2dde62496CE330999': getErc20Abi,

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
    // Tokens //

    // Wrapped liquid staked Ether 2.0 from Mainnet (wstETH)
    '0x6C76971f98945AE98dD7d4DFcA8711ebea946eA6': getErc20Abi,
    // Gyro Dollar (GYD)
    '0xCA5d8F8a8d49439357d3CF46Ca2e720702F132b8': getErc20Abi,
    // Savings GYD (sGYD)
    '0xeA50f402653c41cAdbaFD1f788341dB7B7F37816': getErc20Abi,
    // Wrapped XDAI (WXDAI)
    '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d': getErc20Abi,
    // Savings xDAI (sDAI)
    '0xaf204776c7245bF4147c2612BF6e5972Ee483701': getErc20Abi,
    // Hyperdrive Miles (MILES)
    '0x79385D4B4c531bBbDa25C4cFB749781Bd9E23039': getErc20Abi,

    // Hyperdrive
    '0x666fa9ef9bca174a042c4c306b23ba8ee0c59666': getHyperdriveRegistryAbi,
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
    // Tokens //

    // Volatile AMM - USDC/AERO (vAMM-USDC/AERO)
    '0x6cDcb1C4A4D1C3C6d054b27AC5B77e89eAFb971d': getErc20Abi,
    // Coinbase Wrapped Staked ETH (cbETH)
    '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22': getErc20Abi,
    // USD Coin (USDC)
    '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': getErc20Abi,
    // Moonwell Flagship USDC (mwUSDC)
    '0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca': getErc20Abi,
    // Wrapped Ether (WETH)
    '0x4200000000000000000000000000000000000006': getErc20Abi,
    // Moonwell Flagship ETH (mwETH)
    '0xa0E430870c4604CcfC7B38Ca7845B1FF653D0ff1': getErc20Abi,
    // EURC (EURC)
    '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42': getErc20Abi,
    // Moonwell Flagship EURC (mwEURC)
    '0xf24608E0CCb972b0b0f4A6446a0BBf58c701a026': getErc20Abi,
    // Num ARS (nARS)
    '0x5e40f26E89213660514c51Fb61b2d357DBf63C85': getErc20Abi,
    // Num Yield Bearing Num ARS (snARS)
    '0xC1F4C75e8925A67BE4F35D6b1c044B5ea8849a58': getErc20Abi,
    // WELL (WELL)
    '0xA88594D404727625A9437C3f886C7643872296AE': getErc20Abi,
    // Aerodrome (AERO)
    '0x940181a94A35A4569E4529A3CDfB74e38FD98631': getErc20Abi,
    // Morpho Token (MORPHO)
    '0xBAa5CC21fd487B8Fcc2F632f3F4E8D37262a0842': getErc20Abi,

    // Hyperdrive
    '0x6668310631Ad5a5ac92dC9549353a5BaaE16C666': getHyperdriveRegistryAbi,
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
    // Tokens //

    // Renzo Restaked ETH (ezETH)
    '0x2416092f143378750bb29b79eD961ab195CcEea5': getErc20Abi,
    // rsETHWrapper (wrsETH)
    '0xD2671165570f41BBB3B0097893300b6EB6101E6C': getErc20Abi,

    // Hyperdrive
    '0x6668310631Ad5a5ac92dC9549353a5BaaE16C666': getHyperdriveRegistryAbi,
    '0xB56e0Bf37c4747AbbC3aA9B8084B0d9b9A336777': getHyperdriveAbi,
    '0x1cB0E96C07910fee9a22607bb9228c73848903a3': getHyperdriveAbi,
  },

  // Sepolia
  11155111: {
    // Tokens //

    // RocketPool ETH (RETH)
    '0x4713c86d0e467064A4CD2a974b7fDA79F7efc338': getErc20Abi,
    // Liquid staked Ether 2.0 (stETH)
    '0x7c485f458aD1F32FF66BC45306fd32974C963c32': getErc20Abi,
    // DAI (DAI)
    '0xe8b99bF4249D90C0eB900651F92485F7160A0513': getErc20Abi,
    // Savings DAI (SDAI)
    '0xFF8AFe6bb92eB9D8e80c607bbe5bbb78BF1201Df': getErc20Abi,
    // Renzo ezETH (ezETH)
    '0xDD0D63E304F3D9d9E54d8945bE95011867c80E4f': getErc20Abi,

    // Hyperdrive
    '0x03f6554299acf544ac646305800f57db544b837a': getHyperdriveRegistryAbi,
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
