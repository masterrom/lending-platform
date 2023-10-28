const ClientToken = artifacts.require("ClientToken");
const BasicNFT = artifacts.require('BasicNFT')
const CollateralizedNFTLending = artifacts.require('CollateralizedNFTLending')

module.exports = async function(deployer, network, accounts) {
  
  await deployer.deploy(ClientToken, "ClientToken", "CT");
  
  await deployer.deploy(BasicNFT, "Test NFT", 'TNFT')

  await deployer.deploy(CollateralizedNFTLending, ClientToken.address, BasicNFT.address)


  console.log(`CollateralizedNFTLending Address: ${CollateralizedNFTLending.address}`)
  console.log(`BasicNFT Address: ${BasicNFT.address}`)
  console.log(`ClientToken Address: ${ClientToken.address}`);

};
