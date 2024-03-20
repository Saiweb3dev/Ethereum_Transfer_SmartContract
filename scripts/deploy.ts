import hre from "hardhat"

async function main(){
  const TransferFactory = await hre.ethers.getContractFactory("TransferETH");
  const Transfer = await TransferFactory.deploy();

  const contractAddress:string = typeof Transfer.target === 'string' ? Transfer.target : Transfer.target.toString();

  console.log(`The TransferETH Contract deployed at ${contractAddress}`)


  await hre.deployments.save("TransferETH",{
    abi:TransferFactory.interface.format(),
    address:contractAddress,
  })
}

main()
 .then(() => process.exit(0)) // Exit with success status code if deployment is successful
 .catch((error) => {
    console.error(error); // Log any errors that occur during deployment
    process.exit(1); // Exit with error status code if deployment fails
 });