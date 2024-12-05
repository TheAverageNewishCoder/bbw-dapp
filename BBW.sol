// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BBW is ERC20 {
    constructor(uint256 initialSupply) ERC20("Bad Bxar Wrld", "BBW") {
        _mint(msg.sender, initialSupply);
    }
}
