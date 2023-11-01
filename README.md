# ERC20 Lending Platform

This platform lets end users borrow erc20 tokens through staking their NFTs

### Setup (Contracts)
Truffle is in typescript, there are a few steps before any deployment
- `npm install`
- execute `npm postinstall`. This will compile and generate types for the contracts
- execute `npx truffle migrate`

NOTE: Any time you change your contracts, run `npm run postinstall` to re-generate the types

### Setup UI

You will need a infura key and a few env variables
```
VITE_INFURA_API_KEY=<infura-api-key>
VITE_INFURA_API_SECRET=<infura-api-secret>
VITE_LENDING_ADDRESS=<lending-contract-address>
VITE_TEST_TOKEN_ADDRESS=<you-erc20-token-contract-address>
```
The truffle migrate will deploy a test erc20 contract. Feel free to use other.

- `npm install`
- `npx vite` to start server



