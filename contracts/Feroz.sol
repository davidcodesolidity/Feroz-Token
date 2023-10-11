// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

// Author: @adewalecancode
contract Feroz is ERC20Capped, ERC20Burnable {
    address payable public owner;

    constructor(
        uint256 cap
    ) ERC20("Feroz", "FRZ") ERC20Capped(cap * (10 ** decimals())) {
        owner = payable(msg.sender);
        _mint(owner, 1000000000000 * (10 ** decimals()));
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20Capped, ERC20) {
        super._update(from, to, value);

        if (from == address(0)) {
            uint256 maxSupply = cap();
            uint256 supply = totalSupply();
            if (supply > maxSupply) {
                revert ERC20ExceededCap(supply, maxSupply);
            }
        }
    }
}
