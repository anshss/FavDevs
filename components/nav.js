import Link from "next/link"
import styles from '../styles/Nav.module.css'

export default function Nav() { 
    return(
        <div className={styles.container}>
            <Link href="/"><img className={styles.logo} src="" width="80px" height="80px" /></Link>
            <Link href="/developer"><p>Developers</p></Link>
            <Link href="/mint"><p>Mint</p></Link>
            <Link href="/supporting"><p>Supporting</p></Link>
            <Link href="/"><p className={styles.viewCode}>View Code</p></Link>
            {/* <div className={styles.codeDiv}>
            </div> */}
        </div>
    )
}