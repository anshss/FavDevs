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

  const CSC = {
    id: 53,
    name: 'CoinEx Smart Chain Testnet',
    network: 'CoinEx Smart Chain Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'CETT',
      symbol: 'CETT',
    },
    rpcUrls: {
      default: 'https://testnet-rpc.coinex.net/',
    },
    blockExplorers: {
      default: { name: 'CoinEx Smart Chain Explorer', url: 'https://testnet.coinex.net/' },
    },
    testnet: true,
  }

  const { chains, provider } = configureChains(
    [CSC],
    [
      infuraProvider({ apiKey: '1dbc3ef8703a4669a5cda4f7de7343bc'}),
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id !== CSC.id) return null
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
      <RainbowKitProvider chains={chains} >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
