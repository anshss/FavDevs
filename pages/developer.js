/* eslint-disable @next/next/no-img-element */
import Nav from "../components/nav";
import { useEffect, useState } from "react";
import web3modal from "web3modal"
import { ethers } from "ethers"
import axios from "axios";
import { contractAddress } from "../address.js"; 
import contractAbi from "../artifacts/contracts/mood.sol/mood.json";
import Link from "next/link";
import styles from "../styles/Developer.module.scss"

export default function Developer() {

    const [cards, setCards] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch()
    }, [])
    
    async function fetch() {
        const modal = new web3modal(); 
        const connection = await modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
        const data = await contract.fetchStore();
        const items = await Promise.all(
            data.map(async (i) => {
                //when the array of promises is resolved then map over each promise
                const tokenUri = await contract.uri(i.tokenId.toString());
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    price,
                    name: meta.data.name,
                    tokenId: i.tokenId.toNumber(),
                    supplyL: i.supplyleft.toNumber(),
                    cover: meta.data.cover,
                    description: meta.data.work,
                };
                return item;
            })
            );
            
            // console.log(items);
            setCards(items);
        setLoaded(true);
    }
    
    function Card(prop) {
        return(
            <div className={styles.card}>
                <img src={prop.cover} width="200px" height="200px" />
                <p>{prop.name}</p>
                <p>{prop.price}</p>
                <p>{prop.description}</p>
            </div>
        )
    }
    
    if(loaded == true && !cards.length) {
        return(
            <div>
                <Nav />
                <h2>Nothing minted yet!</h2>
            </div>
        )
    }
    return(        
        <div className={styles.container}>
            <Nav />
            <div className={styles.cardDiv}>
                {cards.map( (card, i) => (
                    <Link key={i} href={`/developer/${card.tokenId-1}`}><a><Card cover={card.cover} name={card.name} price={card.price} description={card.description} /></a></Link>
                ))}
            </div>
        </div>
    )
}