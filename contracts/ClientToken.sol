// contracts/ClientToken.sol
// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity ^0.8.8;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ClientToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000 * 10 ** uint(decimals()));
    }
}
