import { useMetaMask } from '~/hooks/useMetaMask'
import { formatChainAsNum } from '~/utils'
import styles from './Display.module.css'
import {useEffect, useState} from 'react'
import axios from 'axios'



export const Display = () => {

  const { wallet, hasProvider } = useMetaMask()
  const [nftsCollection, setNftCollection] = useState([])

  const fetchOwnedNFTs = async () => {

    const Auth2 = btoa(import.meta.env.VITE_INFURA_API_KEY + ":" + import.meta.env.VITE_INFURA_API_SECRET).toString()

    try {
      const { data } = await axios.get(
        `https://nft.api.infura.io/networks/${formatChainAsNum(wallet.chainId)}/accounts/${wallet.accounts[0]}/assets/nfts`,
        {
          headers: {
            "Authorization": `Basic ${Auth2}`,
          },
        },
      );
      console.log(":rocket: ~ file: index.js:20 ~ result:", data);
      
      setNftCollection(data.assets)
      return data
    } catch (error) {
      console.log(":rocket: ~ file: index.js:17 ~ error:", error);
    }

  }

  const clearNFT = () => {
    setNftCollection([])
  }


  return (
  
    <div className={styles.display}>
  {wallet.accounts.length > 0 && (
    <div className={styles.userInfo}>
      <div>Connected Account Address: {wallet.accounts[0]} | Balance: {wallet.balance}</div>
      <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
    </div>
  )}
  <button onClick={fetchOwnedNFTs}>Fetch NFTs</button>
  <button onClick={clearNFT}>Clear NFTs</button>
  

  <div className={styles.nftContainer}>
    {nftsCollection.map((nft, index) => (
      <div key={index} className={styles.nftItem}>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(atob(nft.metadata.image.split(',')[1]))}`}
          alt={`NFT ${index}`}
          className={styles.nftImage}
        />
      </div>
    ))}
  </div>
</div>

    
  )
}