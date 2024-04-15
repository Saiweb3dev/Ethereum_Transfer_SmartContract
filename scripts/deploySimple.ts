import hre from "hardhat"
//npx hardhat run scripts/deploySimple.ts
const main = async () => {
  const SimpleFactory = await hre.ethers.getContractFactory("SimpleTransferETH")
  const simple = await SimpleFactory.deploy()
  console.log(`Simple Contract deployed at ${simple.target}`)

  const contractAddress:string = typeof simple.target === 'string' ? simple.target : simple.target.toString();

  const abi = SimpleFactory.interface.formatJson()
  const abiFormated = JSON.parse(abi)
  console.log(abiFormated)
  await hre.deployments.save("SimpleTransferETH",{
    abi:abiFormated,
    address:contractAddress
  })
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1);
})