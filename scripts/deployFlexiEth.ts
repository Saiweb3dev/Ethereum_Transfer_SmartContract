import hre from "hardhat";

const main = async () => {
  console.log("Deploying FlexiEtherTransactor...");
  const FlexiEtherTransactor_Factory = await hre.ethers.getContractFactory(
    "FlexiEtherTransactor"
  );
  const FlexiEtherTransactor = await FlexiEtherTransactor_Factory.deploy();
  console.log("Contract Deployed !!!");
  const contractAddress: string =
    typeof FlexiEtherTransactor.target === "string"
      ? FlexiEtherTransactor.target
      : FlexiEtherTransactor.target.toString();
  console.log(`Contract deployed at ${contractAddress}`);
  const rawContractABI = FlexiEtherTransactor.interface.formatJson();
  const contractABI = JSON.parse(rawContractABI);
  await hre.deployments.save("FlexiEtherTransactor", {
    abi: contractABI,
    address: contractAddress,
  });
  console.log("Deployment Saved !!!");
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
