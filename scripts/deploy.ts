import hre from "hardhat"

async function main(){
  const TransferFactory = await hre.ethers.getContractFactory("TransferETH");
  const transfer = await hre.ethers.getContractFactory("TransferETH");
  const Transfer = await transfer.deploy();

  const contractAddress:string = typeof Transfer.target === 'string' ? Transfer.target : Transfer.target.toString();

  console.log(`The TransferETH Contract deployed at ${contractAddress}`)

  const abi = TransferFactory.interface.formatJson();
  const abiFormated = JSON.parse(abi);
  console.log(abiFormated)
  // work in here of sending the abi properly
  await hre.deployments.save("TransferETH",{
    abi:abiFormated,
    address:contractAddress,
  })
}

main()
 .then(() => process.exit(0)) // Exit with success status code if deployment is successful
 .catch((error) => {
    console.error(error); // Log any errors that occur during deployment
    process.exit(1); // Exit with error status code if deployment fails
 });