// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";

/**
 * @title TransferETH
 * @dev A simple contract to transfer Ether between accounts.
 * The contract owner can transfer Ether to any address.
 * The owner can also withdraw any Ether stored in the contract.
 * The contract can be stopped by the owner in case of an emergency.
 */
contract TransferETH {
    address payable private owner;
    bool private stopped = false;

    // Event to log successful transfers
    event TransferSuccessful(address indexed receiver, uint256 amount);
    // Event to log failed transfers
    event TransferFailed(address indexed receiver, uint256 amount);
    // Event to log withdrawals

    /**
     * @dev Modifier to restrict function calls to the owner.
     */
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    /**
     * @dev Modifier to stop function execution in case of an emergency.
     */
    modifier stopInEmergency {
        require(!stopped, "Contract is stopped");
        _;
    }

    /**
     * @dev Constructor sets the contract deployer as the owner.
     */
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Transfers Ether from the contract to a specified address.
     * @param receiverAddress The address to transfer Ether to.
     */
    function transferFund(address payable receiverAddress) public payable stopInEmergency isOwner {
        require(address(this).balance >= msg.value, "Insufficient contract balance");
        bool txHistory = receiverAddress.send(msg.value);
        if (txHistory) {
            emit TransferSuccessful(receiverAddress, msg.value);
        } else {
            emit TransferFailed(receiverAddress, msg.value);
        }
    }


    /**
     * @dev Stops the contract in case of an emergency.
     */
    function stop() public isOwner {
        stopped = true;
    }
    
     /**
      * @dev Get the Owner of the contract
      */
    function getOwner() public view returns(address){
        return owner;
    }
}
