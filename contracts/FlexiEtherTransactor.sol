// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Importing OpenZeppelin's ReentrancyGuard to protect against re-entrancy attacks
import "@openzeppelin/contracts/token/utils/ReentrancyGuard.sol";

// Define a new contract named SimpleTransferETH that inherits from ReentrancyGuard
contract FlexiEtherTransactor is ReentrancyGuard {
    // Define an event for logging transfers
    // This event will be emitted whenever Ether is transferred
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Function to perform batch transfers of Ether to multiple receiver addresses
    // - Receivers must be provided as an array of payable addresses
    // - The function must be called with Ether attached
    // - Returns true upon successful completion
    function batchTransferFund(address payable[] memory _receiverAddresses) public payable nonReentrant returns (bool) {
        // Require that at least one receiver address is provided
        require(_receiverAddresses.length > 0, "Receiver addresses array cannot be empty");
        // Require that no more than 4 receiver addresses are provided
        require(_receiverAddresses.length <= 4, "Maximum of 4 receiver addresses allowed");
        // Require that some Ether is sent with the transaction
        require(msg.value > 0, "Must send positive Ether value");
        
        // Calculate the amount of Ether to send to each receiver address
        uint256 amountPerAddress = msg.value / _receiverAddresses.length;

        // Iterate over each receiver address
        for (uint256 i = 0; i < _receiverAddresses.length; i++) {
            // Require that the receiver address is valid
            require(_receiverAddresses[i]!= address(0), "Invalid receiver address");
            // Transfer the calculated amount of Ether to the receiver address
            _receiverAddresses[i].transfer(amountPerAddress);
            // Emit the Transfer event with details of the transfer
            emit Transfer(msg.sender, _receiverAddresses[i], amountPerAddress);
        }

        // Indicate successful completion of the batch transfer
        return true;
    }

    // Function to transfer Ether to a single receiver address
    // - The receiver address must be provided as a payable address
    // - The function must be called with Ether attached
    // - Returns true upon successful completion
    function transferFund(address payable _receiverAddress) public payable returns (bool) {
        // Ensure the receiver address is valid
        require(_receiverAddress!= address(0), "Receiver address not set");

        // Transfer the specified amount of Ether to the receiver address
        // This line will automatically revert if the contract doesn't have enough Ether
        _receiverAddress.transfer(msg.value);
        // Emit the Transfer event with details of the transfer
        emit Transfer(msg.sender, _receiverAddress, msg.value);
        // Indicate successful completion of the transfer
        return true;
    }
}
