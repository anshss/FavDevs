
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';

export default function Home() {

  const [connection, setConnection] = useState(false);

  if(window) {
    isConnected();
    window.onload = () => {
  };
  }
        
  async function isConnected() {
    if(window) {
      if(window.ethereum){
      const accounts = await ethereum.request({method: 'eth_accounts'});       
      if (accounts.length) {
            setConnection(true);
         }
      }     
    }
  }

  return(
    <div className={styles.container}>
      <h1>NFT For Everyone</h1>
      <h2>Connect you wallet now and mint your own Nfts</h2>
      <ConnectButton accountStatus="avatar"/>
      <div>{connection ? (<button className={styles.goAhead} />) : (<button className={styles.goAhead} disabled/>)}</div>
    </div>
  )
}