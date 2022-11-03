import { useState } from "react"
import web3modal from "web3modal"
import { ethers } from "ethers"
import Nav from "../components/nav";
import { useRouter} from "next/router";
import { Web3Storage } from 'web3.storage'
import { contractAddress } from "../address.js"; 
import contractAbi from "../artifacts/contracts/FavDevs.sol/FavDevs.json";
import styles from "../styles/Mint.module.css"

export default function Mint() {

    const [details, setDetails] = useState({
        name: "",
        price: "",
        cover: "",
        work: "",
    })

    const router = useRouter()

    function getAccessToken () {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4NzhFNjQ1NkUwYzUyYzE2RDI5ODI0MWUzNzA1MWY0NDgyM2Q1MTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM2MTU3ODEyMTksIm5hbWUiOiJGb3IgbXkgcHJvamVjdCJ9.4p3tWCPEz4FA9kO9M6-JvrNVyQorsVWXCvJ89ByoWx4'
    }
    
    function makeStorageClient () {
        return new Web3Storage({ token: getAccessToken() })
    }

     const uploadToIPFS = async (files) => {
        const client = makeStorageClient()
        const cid = await client.put(files)
        return cid
    }      
    

    async function handleCover(e) {
        // const file = e.target.files[0]
        const fileInput = document.getElementById('cover');
        const filePath = e.target.files[0].name;
        console.log(filePath)
        try {
            const coverCID = await uploadToIPFS(fileInput.files);
            const url = `https://ipfs.io/ipfs/${coverCID}/${filePath}`
            setDetails({ ...details, cover: url });
            console.log(url);
        } catch (error) {
            console.log(error)
        }
    }

    async function metaData() {
        const { name, price, cover, work } = details;
        if (!name || !price || !cover || !work) return;
        const data = JSON.stringify({ name, cover, work });
        try {
            const files = [ new File([data], 'data.json') ]
            const metaCID = await uploadToIPFS(files);
            return `https://ipfs.io/ipfs/${metaCID}/data.json`
          
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }
    
    async function mint() {
        const uri = metaData();
        const modal = new web3modal(); 
        const connection = await modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer)
        const price = ethers.utils.parseEther(details.price);
        const data = await contract.createToken(uri, price, details.name);
        data.wait();
        router.push('/developer')
    }

    return(
        <div className={styles.container}>
            <Nav />
            <div className={styles.mint}>
            <h2 className={styles.heading}>Mint Your Developer NFT Now!</h2>
                <p>Name:</p>
                <input name="name" className={styles.input} required type="text" onChange={(e) => setDetails({...details, name: e.target.value})} />
                <p>Work:</p>
                <input name="work" className={styles.input} required type="text"  onChange={(e) => setDetails({...details, work: e.target.value})} />
                <p>Price:</p>
                <input name="price" className={styles.input} required type="text"  onChange={(e) => setDetails({...details, price: e.target.value})} />
                <p>Cover:</p>
                <input name="cover" className={styles.input} id="cover" required type="file" onChange={handleCover} />
                <button className={styles.mintBtn} onClick={mint}> Mint!</button>
            </div>
        </div>
    )
}