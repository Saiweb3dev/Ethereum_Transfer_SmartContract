import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { BigNumberish, ethers } from "ethers";
import hre from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import {
  FlexiEtherTransactor,
  FlexiEtherTransactor__factory,
} from "../typechain-types";

use(chaiAsPromised);

describe("FlexiEtherTransactor Testing", () => {
  let FlexiEtherTransactor_Factory: FlexiEtherTransactor__factory;
  let FlexiEtherTransactor: FlexiEtherTransactor;
  const receiver: Address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  beforeEach("Deploying Contract", async () => {
    // Get the contract factory
    FlexiEtherTransactor_Factory = await hre.ethers.getContractFactory(
      "FlexiEtherTransactor"
    );

    // Deploy the contract
    FlexiEtherTransactor = await FlexiEtherTransactor_Factory.deploy();
    console.log("Deployed the Contract");
  });

  describe("Transferring Funds", () => {
    it("should transfer funds and emit Transfer event", async () => {
      const value = ethers.parseEther("1");

      // Transfer funds
      const tx = await FlexiEtherTransactor.transferFund(receiver, { value });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      // Initialize variables to store event values
      let senderInContract: string | null = null;
      let receiverInContract: string | null = null;
      let etherValue:BigNumberish | null = null;

      // Check if the transaction receipt has event logs
      if (receipt && receipt.logs && receipt.logs.length > 0 && 'args' in receipt.logs[0]) {
        const eventArgs = receipt.logs[0].args;

        // Destructure the event arguments
        [senderInContract, receiverInContract, etherValue] = eventArgs;

        // Log the event values
        console.log("____________________________");
        console.log("Sender:", senderInContract);
        console.log("Receiver:", receiverInContract);
        console.log("Value in Ether:",etherValue);
        console.log("____________________________");
      } else {
        console.log("No event logs found.");
      }
      // Assert the event values
      expect(senderInContract).to.equal(receipt?.from);
      expect(receiverInContract).to.equal(receiver);
      expect(etherValue).to.equal(value.toString());
    });
  });
});