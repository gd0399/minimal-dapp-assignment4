// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CustomToken is ERC20, ERC20Burnable, ERC20Capped, ERC20Pausable, AccessControl {
    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Custom errors
    error LengthMismatch();
    error CapExceeded(uint256 cap, uint256 attempted);

    constructor(
        string memory name,
        string memory symbol,
        uint256 cap,              // In wei units
        address initialReceiver,  // Address that receives initialMint
        uint256 initialMint       // In wei units
    )
        ERC20(name, symbol)
        ERC20Capped(cap)
    {
        // Grant roles to deployer
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);

        // Mint initial supply to receiver
        if (initialMint > cap) {
            revert CapExceeded(cap, initialMint);
        }
        _mint(initialReceiver, initialMint);
    }

    // --- Overrides for multiple inheritance ---
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable, ERC20Capped)
    {
        super._update(from, to, value);
    }

    // --- Admin functions ---
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        if (totalSupply() + amount > cap()) {
            revert CapExceeded(cap(), totalSupply() + amount);
        }
        _mint(to, amount);
    }

    // --- Batch airdrop ---
    function airdrop(address[] calldata to, uint256[] calldata amounts)
        external
        onlyRole(MINTER_ROLE)
    {
        if (to.length != amounts.length) {
            revert LengthMismatch();
        }

        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }

        if (totalSupply() + total > cap()) {
            revert CapExceeded(cap(), totalSupply() + total);
        }

        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], amounts[i]);
        }
    }

    // --- Decimals ---
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
