// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyToken is ERC20Burnable, ERC20Capped, ERC20Pausable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    error LengthMismatch();
    error CapExceeded();

    constructor(
        string memory name,
        string memory symbol,
        uint256 cap,
        address initialReceiver,
        uint256 initialMint
    )
        ERC20(name, symbol)
        ERC20Capped(cap)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);

        if (initialMint > cap) revert CapExceeded();
        _mint(initialReceiver, initialMint);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        if (totalSupply() + amount > cap()) revert CapExceeded();
        _mint(to, amount);
    }

    function airdrop(address[] calldata to, uint256[] calldata amounts)
        external onlyRole(MINTER_ROLE)
    {
        if (to.length != amounts.length) revert LengthMismatch();

        uint256 total = 0;
        for (uint i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        if (totalSupply() + total > cap()) revert CapExceeded();

        for (uint i = 0; i < to.length; i++) {
            _mint(to[i], amounts[i]);
        }
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable, ERC20Capped)
    {
        super._update(from, to, value);
    }
}
