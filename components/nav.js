import Link from "next/link"

export default function Nav() { 
    return(
        <div>
            <Link href="/"><img src="" width="20px" height="20px" /></Link>
            <Link href="/developer"><p>Developers</p></Link>
            <Link href="/mint"><p>Mint</p></Link>
            <Link href="/supporting"><p>Your Support</p></Link>
        </div>
    )
}