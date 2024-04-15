import hre from "hardhat";
//npx hardhat run scripts/UpFTESimple.ts
const fs = require("fs");
const FRONT_END_ABI_FILE = "../Ethereum_Transfer_NextJS/constants/SimpleContractABI.json";
const FRONT_END_ADDRESS_FILE = "../Ethereum_Transfer_NextJS/constants/SimpleContractAddress.json";
const main = async ()=>{
  if(process.env.UPDATE_FRONT_END){
    console.log("Writing to front end...")
    const contract = await hre.deployments.get("SimpleTransferETH")
    const contractABI = contract.abi;
    const contractAddress = contract.address;
    console.log("ABI updated",contractABI)
    await updateAbi(contractABI);
    console.log("Contract updated",contractAddress);
    await updateContractAddress(contractAddress);
  }
  else{
    console.log("NO Permission Given")
    console.log(process.env.UPDATE_FRONT_END)
  }
}

async function updateAbi(contractABI:any){
  console.log("Updating the ABI to FrontEnd")
  const abiJson = JSON.stringify(contractABI,null,2);
  fs.writeFileSync(FRONT_END_ABI_FILE,abiJson);
}

async function updateContractAddress(contractAddress:string){
  console.log("Updating the Address to FrontEnd");
  try{
    const chainId = hre.network.config.chainId;
    if(chainId == undefined){
      console.log("Chain ID is undefined. Cannot update contract addresses.")
      return;
    }
    const addressJson = JSON.stringify({[chainId]:contractAddress},null,2);
    fs.writeFileSync(FRONT_END_ADDRESS_FILE,addressJson)
  }catch(error){
    console.log("Error in updating address",error)
  }
}
main().catch(console.error)