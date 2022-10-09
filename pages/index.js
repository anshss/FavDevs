
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {

  // const [connected, setConnected] = useState(false);

  // if(window != undefined) {
  //   window.onload = () => {
  //     isConnected();
  //   }
  // }
        
  // async function isConnected() {
  //   if(window.ethereum){
  //     const accounts = await ethereum.request({method: 'eth_accounts'});       
  //     if (accounts.length) {
  //       setConnected(true);
  //     }
  //   }
  // }

  return(
    <div className={styles.container}>
      <h1>NFT For Everyone</h1>
      <h2>Connect you wallet now and mint your own Nfts</h2>
      <ConnectButton accountStatus="address" showBalance={false}/>
      {/* <div>{connected ? (<button className={styles.goAhead} />) : (<button className={styles.goAhead} disabled/>)}</div> */}
      <Link href="/mint">Go Ahead</Link>
    </div>
  )
}