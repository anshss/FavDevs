import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../../components/nav";
import web3modal from "web3modal"
import { ethers } from "ethers"
import axios from "axios";
import { contractAddress } from "../../address.js"; 
import contractAbi from "../../artifacts/contracts/mood.sol/mood.json";

export default function NFTs() {
    const router = useRouter()
    const { id } = router.query
    
    const [cards, setCards] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        if (id) {
            fetch()
        }
    }, [id])

    
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
            
        setCards(items[id]);
        setLoaded(true);
    }
    
    function Card(prop) {
        return(
            <div>
                <img src={prop.cover} width="200px" height="200px" />
                <p>{prop.name}</p>
                <p>{prop.price}</p>
                <p>{prop.description}</p>
            </div>
        )
    }
    if(loaded==true)
    return(
        <div>
            <Nav />
            {/* {console.log(cards)} */}
            <Card cover={cards.cover} name={cards.name} price={cards.price} description={cards.description} />
        </div>
    )
}