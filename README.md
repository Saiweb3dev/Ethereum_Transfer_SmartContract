

# Ethereum_Transfer_SmartContract

This is a Solidity smart contract that allows users to send Ether to a specified Ethereum address. The contract has been deployed to the Sepolia test network.

## Features
- Accept Ether transfers to the contract
- Send Ether from the contract to a specified address

## Installation

1. Clone the repository:
```
git clone https://github.com/Saiwebdev2005/Ethereum_Transfer_SmartContract.git
```

2. Install the dependencies:
```
cd Ethereum_Transfer_SmartContract
npm install
```

3. Compile the Solidity smart contract:
```
npx hardhat compile
```

## Usage

To interact with the deployed smart contract, you can use a web3 library like Web3.js or Ethers.js in your frontend application. Refer to the [Frontend](#frontend) section for more information.

## Deployment

The smart contract has been deployed to the Sepolia test network. You can deploy the contract to the Sepolia network using the following command:

```
npx hardhat run scripts/deploySimple.ts --network sepolia
```

This will deploy the `SimpleTransfer` contract to the Sepolia network and provide the contract address.

## Contract Details

The `SimpleTransfer` contract has the following functions:

- `sendEther(address payable _recipient, uint256 _amount)`: This function allows users to send Ether to the specified address. The function checks if the contract has enough Ether to transfer and reverts the transaction if the balance is insufficient.

The contract is deployed on the Sepolia test network at the following address:

```
0x123456789abcdef0123456789abcdef01234567
```

## License

This project is licensed under the [MIT License](LICENSE).
