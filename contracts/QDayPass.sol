// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title QDayPass
/// @notice A post-quantum readiness certificate for the QoreChain testnet.
///         Anyone can claim one pass for their own address. A pass records the
///         holder's display name and the time it was claimed. Passes are meant
///         to be claimed inside a QoreChain EVM authorisation window that was
///         opened with a hybrid-signed transaction (classical secp256k1 plus
///         post-quantum ML-DSA-87, NIST FIPS 204), so the claim itself rides on
///         quantum-safe authorisation.
contract QDayPass {
    struct Pass {
        string name;
        uint256 claimedAt;
        bool exists;
    }

    mapping(address => Pass) private passes;
    address[] private holders;

    /// @notice Emitted when an address claims its pass.
    event PassClaimed(address indexed holder, string name, uint256 claimedAt);

    /// @notice Claim a Q-Day Pass for the caller. One pass per address.
    /// @param name The display name to print on the pass.
    function claimPass(string calldata name) external {
        require(bytes(name).length > 0, "Name required");
        require(!passes[msg.sender].exists, "Pass already claimed");
        passes[msg.sender] = Pass(name, block.timestamp, true);
        holders.push(msg.sender);
        emit PassClaimed(msg.sender, name, block.timestamp);
    }

    /// @notice Read the pass of an address.
    function getPass(
        address holder
    ) external view returns (string memory name, uint256 claimedAt, bool exists) {
        Pass memory pass = passes[holder];
        return (pass.name, pass.claimedAt, pass.exists);
    }

    /// @notice How many passes have been claimed so far.
    function totalPasses() external view returns (uint256) {
        return holders.length;
    }

    /// @notice The holder address at an index (0-based, in claim order).
    function holderAt(uint256 index) external view returns (address) {
        return holders[index];
    }
}
