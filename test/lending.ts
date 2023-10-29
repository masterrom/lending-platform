import { isEqualsGreaterThanToken } from "typescript";


contract('CollateralizedNFTLending', (accounts: string[]) => {
    const ethers = require('ethers')
    const ClientToken = artifacts.require("ClientToken");
    const BasicNFT = artifacts.require('BasicNFT')
    const CollateralizedNFTLending = artifacts.require('CollateralizedNFTLending')

    let testToken: any;
    let basicNft: any;
    let lending: any;

    let loanAmount = ethers.parseUnits('10', 18)
    let repayloanAmount = ethers.parseUnits('11', 18)

    let lender = accounts[0]
    let borrower = accounts[1]

    let totalTokenForLending = ethers.parseUnits('1000', 18)


    before(async () => {
        testToken = await ClientToken.deployed()
        basicNft = await BasicNFT.deployed()
        lending = await CollateralizedNFTLending.deployed()

        await testToken.approve(lending.address, totalTokenForLending)
    })

  it('should put 1000 ClientToken in the lender Account', async () => {
    // const clientTokenInstance = await ClientToken.deployed();
    const balance = await testToken.balanceOf(lender);
    assert.equal(ethers.formatEther(balance.toString()), 1000.0, "1000 wasn't in the lender account");
  });

  it("Should be able to mint NFTs to an borrower", async () => {
      await basicNft.mint(borrower, 1)

      const nftOwner = await basicNft.ownerOf(1)

      assert.equal(nftOwner, borrower, `NFT with token id 1 should owned by account[1]`)
  })

  it("Should be able to take out a loan", async () => {
    await basicNft.approve(lending.address, 1, {from: borrower})

    await lending.createLoan(1,basicNft.address, loanAmount, 1, {from: borrower})

    const nftOwner = await basicNft.ownerOf(1)

    assert.equal(nftOwner, lending.address, `NFT with token id 10 should owned by the lending Contract`)
  })

  it("Borrower should own the loaned testTokens", async () => {
    let borrowerTokenBalance = await testToken.balanceOf(borrower)
    borrowerTokenBalance = ethers.formatEther(borrowerTokenBalance.toString())

    assert.equal(borrowerTokenBalance, 10.0, `Borrower should have the loaned amount`)
  })

  it("Lender should less tokens", async () => {
    let lenderTokenBalance = await testToken.balanceOf(lender)
    lenderTokenBalance = ethers.formatEther(lenderTokenBalance.toString())

    assert.equal(lenderTokenBalance, 990.0, `lenderr should have the loaned amount`)
  })

  it("Borrower should not be approved or owner of the collateralized NFT", async () => {
      const approvedAddress = await basicNft.getApproved(1)
      assert.equal(approvedAddress, 0, 'There should be no one approved')
  })

  it("Should be able to repay the loan back and regain nft", async () =>{
    
    const loanID = Number(await lending.getLoanCount()) - 1

    // Some User interaction that results in the borrowerr getting 1 more clientToken
    await testToken.transfer(accounts[2], ethers.parseUnits('1', 18))
    await testToken.transfer(borrower, ethers.parseUnits('1', 18), {from: accounts[2]})
    
    await testToken.approve(lending.address, repayloanAmount, {from: borrower})
    
    await lending.repayLoan(loanID, {from: borrower})
    const testTokenBalance = await testToken.balanceOf(borrower)
    assert.equal(testTokenBalance.toString(), '0', `accounts[1] should have 0 test tokens`)
    
    const nftOwner = await basicNft.ownerOf(1)
    assert.equal(nftOwner, borrower, `NFT with token id 10 should owned by account[1]`)

  })

  it("Lender should full 1000 tokens", async () => {
    let lenderTokenBalance = await testToken.balanceOf(lender)
    lenderTokenBalance = ethers.formatEther(lenderTokenBalance.toString())
    console.log(lenderTokenBalance)
    assert.equal(lenderTokenBalance, 1000.0, `lenderr should have the loaned amount`)
  })

  it("Borrower should have 0 testTokens", async () => {
    let borrowerTokenBalance = await testToken.balanceOf(borrower)
    borrowerTokenBalance = ethers.formatEther(borrowerTokenBalance.toString())

    assert.equal(borrowerTokenBalance, 0.0, `Borrower should have the loaned amount`)
  })

  
  
});
