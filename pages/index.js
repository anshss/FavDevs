import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setInterval(isConnected, 1000);
    
  }, [])
        
  async function isConnected() {
    if(window != undefined){
      if(window.ethereum){
        const accounts = await ethereum.request({method: 'eth_accounts'});       
        if (accounts.length) {
          setConnected(true);
        }
      }
    }
    else{
      setConnected(false);
    }
  }

  return(
    <div className={styles.container}>
      <h1 className={styles.heading}>Support your Favourite Developer</h1>
      <h2 className={styles.subHeading}>Connect you wallet now and mint your own Nfts</h2>
      <ConnectButton className={styles.connectButton} accountStatus="address" showBalance={false}/>
      <Link href="/mint"><div>{connected ? (<button className={styles.goAhead} >Go Ahead</button>) : (<button className={styles.goAhead} disabled >Go Ahead</button>)}</div></Link>

    </div>
  )
}