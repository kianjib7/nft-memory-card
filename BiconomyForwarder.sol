// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BiconomyForwarder
 * @dev A contract for forwarding meta-transactions using Biconomy
 */
contract BiconomyForwarder is EIP712, Ownable {
    using ECDSA for bytes32;

    struct ForwardRequest {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint256 nonce;
        bytes data;
    }

    bytes32 private constant _TYPEHASH = keccak256(
        "ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)"
    );

    mapping(address => uint256) private _nonces;
    mapping(address => bool) private _trustedContracts;

    event MetaTransactionExecuted(
        address indexed from,
        address indexed to,
        bytes data
    );

    constructor() EIP712("BiconomyForwarder", "1") {}

    /**
     * @dev Returns the current nonce for an account
     * @param from The address to query
     * @return Current nonce
     */
    function getNonce(address from) external view returns (uint256) {
        return _nonces[from];
    }

    /**
     * @dev Verifies the signature for a request
     * @param req The meta-transaction request
     * @param signature The signature to verify
     * @return True if the signature is valid
     */
    function verify(ForwardRequest calldata req, bytes calldata signature)
        public
        view
        returns (bool)
    {
        address signer = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    _TYPEHASH,
                    req.from,
                    req.to,
                    req.value,
                    req.gas,
                    req.nonce,
                    keccak256(req.data)
                )
            )
        ).recover(signature);

        return _nonces[req.from] == req.nonce && signer == req.from;
    }

    /**
     * @dev Executes a meta-transaction
     * @param req The meta-transaction request
     * @param signature The signature authorizing the request
     * @return success Whether the call was successful
     * @return returndata The return data from the call
     */
    function execute(
        ForwardRequest calldata req,
        bytes calldata signature
    ) external returns (bool success, bytes memory returndata) {
        require(verify(req, signature), "BiconomyForwarder: signature does not match request");
        require(_trustedContracts[req.to], "BiconomyForwarder: target contract not trusted");

        _nonces[req.from] = req.nonce + 1;

        (success, returndata) = req.to.call{gas: req.gas, value: req.value}(
            abi.encodePacked(req.data, req.from)
        );

        if (success) {
            emit MetaTransactionExecuted(req.from, req.to, req.data);
        }

        return (success, returndata);
    }

    /**
     * @dev Adds a contract to the trusted list
     * @param contractAddress The address of the contract to trust
     */
    function addTrustedContract(address contractAddress) external onlyOwner {
        _trustedContracts[contractAddress] = true;
    }

    /**
     * @dev Removes a contract from the trusted list
     * @param contractAddress The address of the contract to untrust
     */
    function removeTrustedContract(address contractAddress) external onlyOwner {
        _trustedContracts[contractAddress] = false;
    }

    /**
     * @dev Checks if a contract is trusted
     * @param contractAddress The address of the contract to check
     * @return Whether the contract is trusted
     */
    function isTrustedContract(address contractAddress) external view returns (bool) {
        return _trustedContracts[contractAddress];
    }
} 