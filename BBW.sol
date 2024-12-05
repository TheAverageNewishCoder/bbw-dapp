// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BBW is ERC20 {
    constructor() ERC20("Bad Bxar Wrld", "BBW") {
        // Mint a fixed supply of 444 BBWs to the deployer's address
        _mint(msg.sender, 444 * 10 ** decimals());
    }
}
