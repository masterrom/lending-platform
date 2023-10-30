import { useMetaMask } from '~/hooks/useMetaMask'
import { formatChainAsNum } from '~/utils'
import styles from './Display.module.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import lendingContract from '../../../build/contracts/CollateralizedNFTLending.json'
import testTokenContract from '../../../build/contracts/ClientToken.json'
import baseErc721Contract from '../../../build/contracts/ERC721.json'

import {ethers} from 'ethers'


export const Display = () => {

  interface Loan{
    borrower: string;
    nftId: bigint;
    nftAddress: string;
    loanAmount: bigint;
    loanId: number;
  }

  const { wallet, hasProvider } = useMetaMask()
  const [nftsCollection, setNftCollection] = useState([])
  const [loans, setLoans] = useState([])
  const [clientTokenBalance, setCTBalance] = useState('0')
  const [totalLoan, setTotalLoan] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0);
  const [collatoral, setCollatoral] = useState(null)
  const [payBackLoanIdx, setPayBackLoan] = useState(null)


  const makeALoan = async () => {

    const nftAddress = nftsCollection[collatoral]?.contract
    const tokenId = nftsCollection[collatoral]?.tokenId
    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner()

    const lendingAddress = '0x36A2e22A673BB6a7E14c9Ed16B81314C3642091a'
    const lendingInstance = new ethers.Contract(lendingAddress, lendingContract.abi, signer)

    const nftInstance = new ethers.Contract(nftAddress, baseErc721Contract.abi, signer)
    let tx = await nftInstance.approve(lendingAddress, tokenId)
    await tx.wait()
    

    const amount = ethers.parseUnits(loanAmount.toString(), 18)

    const loanId = await lendingInstance.createLoan(tokenId,nftAddress, amount, 1000)
    await loanId.wait()

    alert("Your loan has been approved. Happy Spending!")

    setCollatoral(null)
    setLoanAmount(0)
  }

  const payBackLoan = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner()

    const lendingAddress = '0x36A2e22A673BB6a7E14c9Ed16B81314C3642091a'
    const lendingInstance = new ethers.Contract(lendingAddress, lendingContract.abi, signer)

    const testTokenAddress = '0x6400f1cc5F737CB253dE73BA1E6f62a374481069'
    const testTokenInstance = new ethers.Contract(testTokenAddress, testTokenContract.abi, signer)

    const loan = loans[payBackLoanIdx]
    const payBackAmount = Number(ethers.formatEther(loan.loanAmount)) + 1
    const payBackAmountInChain = ethers.parseUnits(payBackAmount.toString(), 18)

    
    const approveLender = await testTokenInstance.approve(lendingAddress, payBackAmountInChain)
    await approveLender.wait()

    const payBackTx = await lendingInstance.repayLoan(loan.loanId)
    await payBackTx.wait()

    alert("Loan Has Been Payed Back. Thank you")
    
    setPayBackLoan(null)

  }

  const getRelevantLoans = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner()
    const signerAdderss = await signer.getAddress()

    const lendingAddress = '0x36A2e22A673BB6a7E14c9Ed16B81314C3642091a'
    const lendingInstance = new ethers.Contract(lendingAddress, lendingContract.abi, signer)

    const totalLoans = Number(await lendingInstance.getLoanCount())
    
    let userLoans = []
    let totalBorrowed = 0
    for (let i = 0; i < totalLoans; i ++){
      const loanData = await lendingInstance.loans(i)
      let loan: Loan = {
        borrower: loanData.borrower,
        loanAmount: loanData.loanAmount,
        loanId: i,
        nftId: loanData.nftId,
        nftAddress: loanData.nftAddress,
      }
      if (loan.borrower == signerAdderss){
        userLoans.push(loan)
        totalBorrowed += Number(ethers.formatEther(loan.loanAmount))
      }
    }
    setLoans(userLoans)
    setTotalLoan(totalBorrowed)


  }
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

  const fetchClientTokenbalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner()
    const testTokenAddress = '0x6400f1cc5F737CB253dE73BA1E6f62a374481069'
    const testTokenInstance = new ethers.Contract(testTokenAddress, testTokenContract.abi, signer)

    const currentBalance = await testTokenInstance.balanceOf(await signer.getAddress())

    setCTBalance(ethers.formatEther(currentBalance.toString()))

  }

  useEffect(() => {
    fetchOwnedNFTs()
    fetchClientTokenbalance()
    getRelevantLoans()
  }, [wallet])

  return (
    <div className={styles.display}>
  {wallet.accounts.length > 0 && (
    <div className={styles.userInfo}>
      <div className={styles.infoItem}>
        Numeric ChainId: {formatChainAsNum(wallet.chainId)}
      </div>
      <div className={styles.infoItem}>
        Balance: {wallet.balance} GoerliETH
      </div>
      <div className={styles.infoItem}>
        Client Token Balance: {clientTokenBalance} CT
      </div>
      <div className={styles.infoItem}>
        Borrowed Amount: {totalLoan} Client Tokens
      </div>
      <div className={styles.infoItem}>
        Expected Repayment Amount: {totalLoan > 0 ? totalLoan + (loans.length) : 0} Client Tokens
      </div>
    </div>
  )}

  <div className={styles.nftHeader}>
    <span>Available NFTs</span>
    <button onClick={fetchOwnedNFTs}>Refresh NFTs</button>
  </div>

  <div className={styles.nftContainer}>
    {nftsCollection.map((nft, index) => (
      <div key={index} className={styles.nftItem}>
        <img
          id={nft.tokenId}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            atob(nft.metadata.image.split(',')[1])
          )}`}
          alt={`NFT ${index}`}
          className={styles.nftImage}
          onClick={getRelevantLoans}
        />
      </div>
    ))}
  </div>


  <div className={styles.tableContainer}>
    <h2 className={styles.tableHeading}>Loan Information</h2>
    <table className={styles.loanTable}>
      <thead>
        <tr>
          <th>Loan ID</th>
          <th>Loan Amount</th>
          <th>Collateral NFT</th>
          <th>Pay Back Amount</th>
          
        </tr>
      </thead>
      <tbody>
        {loans.map((loan, index) => (
          <tr key={index} className={styles.loanItem}>
            <td>{loan.loanId}</td>
            <td>{Number(ethers.formatEther(loan.loanAmount))} Client Token</td>
            <td>{Number(loan.nftId)}</td>
            <td>{Number(ethers.formatEther(loan.loanAmount)) + 1} Client Token</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className={styles.formsContainer}>
    <div className={styles.formContainer}>
      <h4>Request Loan</h4>
      <label className={styles.formLabel}>
        Loan Amount:
        <input type='number' className={styles.formInput} onChange={(e) => setLoanAmount(e.target.value)} />
      </label>

      <label className={styles.formLabel}>
        Collateral NFT:
        <select className={styles.formSelect} onChange={(e) => setCollateral(e.target.value)} defaultValue={null}>
          {nftsCollection.map((nft, index) => (
            <option value={index} key={index}>
              {nft.tokenId}
            </option>
          ))}
        </select>
      </label>
      <button className={styles.formButton} onClick={makeALoan}>Request Loan</button>
    </div>  

    <div className={styles.formContainer}>
      <h4>Pay Back Loan</h4>
      <label className={styles.formLabel}>
        Loan ID:
        <select className={styles.formSelect} onChange={(e) => setPayBackLoan(e.target.value)}>
          {loans.map((loan, index) => (
            <option value={index} key={index}>
              {loan.loanId}
            </option>
          ))}
        </select>
      </label>
      <button className={styles.formButton} onClick={payBackLoan}>Pay Back Loan</button>
    </div>  
  </div>
</div> 
  )
}