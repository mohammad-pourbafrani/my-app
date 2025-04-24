// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { bsc, mainnet } from '@reown/appkit/networks'
import { ConnectButton } from './connect_button.js'


// 1. Get projectId
const projectId = '8136f750acdfad3c20903e479bfa004e';

// 2. Set the networks
const networks = [mainnet, bsc ];

// 3. Create a metadata object - optional
const metadata = {
  name: 'test_alpa',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  enableWalletConnect: true,
  defaultNetwork: bsc,
   includeWalletIds: [
    "664b505fea4c2117b8a55c054ef209664e0a68ddaafd7534df739f97a293fa1d",
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  ],
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: false,
    connectMethodsOrder: ["wallet"],
    // connectorTypeOrder
  },
    allWallets: "HIDE",
  //   customWallets: [
  //     {
  //       id: "664b505fea4c2117b8a55c054ef209664e0a68ddaafd7534df739f97a293fa1d",
  //       name: "Hippo Wallet",
  //       homepage: "https://hippowallet.io/", // Optional
  //       image_url: "https://walletguide.walletconnect.network/_next/image?url=https%3A%2F%2Fapi.web3modal.com%2Fv2%2Fwallet-image%2F200x200%2Ff9570968-45f7-47c1-3189-98cf60e25c00%3FprojectId%3Dad53ae497ee922ad9beb2ef78b1a7a6e%26st%3Dwallet-guide%26sv%3D1.0.0&w=384&q=75", // Optional
  //       mobile_link: "mobile_link", // Optional - Deeplink or universal
  //       // desktop_link: "desktop_link", // Optional - Deeplink
  //       webapp_link: "chrome://extensions/?id=hddkffjleepiafmkhcneldjipkfkkofk", // Optional
  //       app_store: "https://apps.apple.com/ae/app/hippo-non-custodial-wallet/id1613041499", // Optional
  //       play_store: "https://play.google.com/store/apps/details?id=com.blockchaincommodities.hippo_wallet", // Optional
  //     },
  //   ],
})

export default function App() {
  return <ConnectButton /> // Configure the <w3m-button> or a similar button inside
}