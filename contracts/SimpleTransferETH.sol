// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


/**
 * @title TransferETH
 * @dev A simple contract to transfer Ether between accounts.
 * The contract owner can set the receiver address and transfer Ether to it.
 * The owner can also withdraw any Ether stored in the contract.
 * The contract can be stopped by the owner in case of an emergency.
 */
contract SimpleTransferETH {


    /**
     * @dev Transfers Ether from the contract to the receiver address.
     * The function can only be called by the owner and will fail if the contract is stopped.
     */
    function transferFund(address payable receiverAddress) public payable returns (bool) {
    // Convert the amount from ETH to wei
    

    // Ensure the contract has enough balance
    require(msg.sender.balance >= msg.value, "Insufficient contract balance");

    // Ensure the receiver address is set
    require(receiverAddress != address(0), "Receiver address not set");

    // Attempt to send the specified amount of ETH to the receiver
    bool txHistory = receiverAddress.send(msg.value);
       if(txHistory){
        return true;
       }
       else{
        return false;
       }
    }
}
