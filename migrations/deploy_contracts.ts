type Network = "development" | "kovan" | "mainnet";

module.exports = (artifacts: Truffle.Artifacts, web3: Web3) => {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
  
    const ClientToken = artifacts.require("ClientToken");
    const BasicNFT = artifacts.require('BasicNFT')
    const CollateralizedNFTLending = artifacts.require('CollateralizedNFTLending')
    const ethers = require('ethers')

    await deployer.deploy(ClientToken, 'ClientToken', 'CLT')
    await deployer.deploy(BasicNFT, "Test NFT", 'TNFT')


    const clientToken = await ClientToken.deployed()
    const basicNft = await BasicNFT.deployed()

    await deployer.deploy(CollateralizedNFTLending, clientToken.address)
    const lendingInstance = await CollateralizedNFTLending.deployed()

    let totalTokenForLending = ethers.parseUnits('1000', 18)

    await clientToken.approve(lendingInstance.address, totalTokenForLending)

    
    console.log(`Client Token Deployed! Contract Address ${clientToken.address}`)
    console.log(`Test NFT Contract Deployed! Contract Address ${basicNft.address}`)
    console.log(`Lending Protocol Deployed! Contract Address ${lendingInstance.address}`)

  };
};