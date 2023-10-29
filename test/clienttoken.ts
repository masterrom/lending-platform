
contract('ClientToken', (accounts: string[]) => {
  const ethers = require('ethers')
  const ClientToken = artifacts.require("ClientToken");
  it('should put 1000 ClientToken in the first account', async () => {
    const clientTokenInstance = await ClientToken.deployed();
    const balance = await clientTokenInstance.balanceOf(accounts[0]);
    
    assert.equal(ethers.formatEther(balance.toString()), 1000.0, "1000 wasn't in the first account");
  });
  
});
