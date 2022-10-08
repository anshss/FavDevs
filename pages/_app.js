import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme 
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

function MyApp({ Component, pageProps }) {

  // ------------

  const avalancheChain = {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'Avalanche',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    testnet: false,
  }

  const { chains, provider } = configureChains(
    [avalancheChain],
    [
      infuraProvider({ apiKey: '1dbc3ef8703a4669a5cda4f7de7343bc'}),
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id !== avalancheChain.id) return null
          return { http: chain.rpcUrls.default }
        },
      }),
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })

  // ------------

  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <Component {...pageProps} />
    </RainbowKitProvider>
  </WagmiConfig>
  )
}

export default MyApp
