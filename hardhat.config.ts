import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
require('dotenv').config();
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/8cAuHYtk5pZaV5S4z9QKIKLbAj3JEc3i"
const PRIVATE_KEY = process.env.PRIVATE_KEY || '976ec26d8620bbdeff41ac071ad26407ee1bd7e03cf7b10d27067e91ccfc2ff9'

const config: HardhatUserConfig = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId:31337,
      showRevertReason: true,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      //   accounts: {
      //     mnemonic: MNEMONIC,
      //   },
      saveDeployments: true,
      chainId: 11155111,
  },
  },
  solidity: "0.8.24",
};

export default config;
