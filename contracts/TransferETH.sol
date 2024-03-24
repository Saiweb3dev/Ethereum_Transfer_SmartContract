// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "hardhat/console.sol";

/**
 * @title TransferETH
 * @dev A simple contract to transfer Ether between accounts.
 * The contract owner can set the receiver address and transfer Ether to it.
 * The owner can also withdraw any Ether stored in the contract.
 * The contract can be stopped by the owner in case of an emergency.
 */
contract TransferETH {

    error AddressInvalid();

    address payable private owner;
    address payable private receiver;
    bool private stopped = false;
    uint amountSent;

    // Event to log successful transfers
    event TransferSuccessful(address indexed receiver, uint256 amount);
    // Event to log failed transfers
    event TransferFailed(address indexed receiver, uint256 amount);

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
     * @dev Function to set the receiver address.
     * @param _receiver The address to set as the receiver.
     */
    function setReceiver(address payable _receiver) public isOwner returns(address) {
        if(_receiver == address(0)) {
            revert AddressInvalid();
        }
        receiver = _receiver;
        return receiver;
    }

    /**
     * @dev Transfers Ether from the contract to the receiver address.
     * The function can only be called by the owner and will fail if the contract is stopped.
     */
    function transferFund() public payable stopInEmergency isOwner {
        //Transfer acc local 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
        require(address(this).balance >= msg.value, "Insufficient contract balance");
        require(receiver != address(0), "Receiver address not set"); // Ensure receiver address is set
        bool txHistory = receiver.send(msg.value);
        if (txHistory) {
            emit TransferSuccessful(receiver, msg.value);
            amountSent = msg.value;
        } else {
            emit TransferFailed(receiver, msg.value);
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

    /**
     * @dev Amount sent by the owner
     */
    function getAmountSent() public view returns(uint){
        return amountSent;
    }

    /**
     * @dev Get the receiver address
     */
    function getReceiver() public view returns(address){
        return receiver;
    }
}
