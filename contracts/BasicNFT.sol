// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicNFT is ERC721Enumerable, Ownable {

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable(){}

    // Mint a new NFT
    function mint(address to, uint256 tokenId) external onlyOwner {
        _mint(to, tokenId);
    }

    // Burn an existing NFT
    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }
}
