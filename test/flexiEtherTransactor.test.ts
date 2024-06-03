import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { BigNumberish, ethers } from "ethers";
import hre from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import {
  FlexiEtherTransactor,
  FlexiEtherTransactor__factory,
} from "../typechain-types";

// Enable chai-as-promised for handling promises in tests
use(chaiAsPromised);

// Describe block for testing the FlexiEtherTransactor contract
describe("FlexiEtherTransactor Testing", () => {
  // Variables to hold the contract factory and instance
  let FlexiEtherTransactor_Factory: FlexiEtherTransactor__factory;
  let FlexiEtherTransactor: FlexiEtherTransactor;
  // Define receiver addresses for testing
  const receiver: Address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const receivers: Address[] = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  ];

  // Before each test, deploy a fresh instance of the contract
  beforeEach("Deploying Contract", async () => {
    // Get the contract factory
    FlexiEtherTransactor_Factory = await hre.ethers.getContractFactory(
      "FlexiEtherTransactor"
    );

    // Deploy the contract
    FlexiEtherTransactor = await FlexiEtherTransactor_Factory.deploy();
    console.log("Deployed the Contract");
  });

  // Describe block for transferring funds tests
  describe("Transferring Funds", () => {
    // Test case for transferring funds and checking the emitted Transfer event
    it("should transfer funds and emit Transfer event", async () => {
      // Define the amount to transfer
      const value = ethers.parseEther("1");

      // Execute the fund transfer
      const tx = await FlexiEtherTransactor.transferFund(receiver, { value });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      // Initialize variables to store event values
      let senderInContract: string | null = null;
      let receiverInContract: string | null = null;
      let etherValue: BigNumberish | null = null;

      // Check if the transaction receipt contains event logs
      if (
        receipt &&
        receipt.logs &&
        receipt.logs.length > 0 &&
        "args" in receipt.logs[0]
      ) {
        // Extract event arguments
        const eventArgs = receipt.logs[0].args;

        // Assign event argument values to variables
        [senderInContract, receiverInContract, etherValue] = eventArgs;

        // Log the extracted event values
        console.log("____________________________");
        console.log("Sender:", senderInContract);
        console.log("Receiver:", receiverInContract);
        console.log("Value in Ether:", etherValue);
        console.log("____________________________");
      } else {
        console.log("No event logs found.");
      }
      // Assert that the event values match expectations
      expect(senderInContract).to.equal(receipt?.from);
      expect(receiverInContract).to.equal(receiver);
      expect(etherValue).to.equal(value.toString());
    });

    // Test case for splitting and transferring funds to multiple receivers
    it("should split and transfer funds", async () => {
      // Define the total amount to transfer
      const value = ethers.parseEther("1");
      // Calculate the expected value per receiver
      const expectedValuePerReceiver = BigInt(
        Math.floor(Number(value) / receivers.length)
      );

      // Execute batch transfer of funds
      const tx = await FlexiEtherTransactor.batchTransferFund(receivers, {
        value,
      });

      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      let etherValue: BigNumberish | null = null;
      let receiversInContract: Address[] = new Array<Address>(receivers.length);

      // Iterate through transaction logs to extract event data
      if (
        receipt &&
        receipt.logs &&
        receipt.logs.length > 0 &&
        "args" in receipt.logs[0]
      ) {
        for(let i = 0; i < receipt.logs.length; i++) {
          // Extract event arguments
          const eventArgs = (receipt.logs[i] as any).args;
          // Store receiver address and transferred value from each event log
          receiversInContract[i] = eventArgs[1];
          etherValue = eventArgs[2];
          console.log(`Event Logs: ${i} `, eventArgs[1]);
        }
      } else {
        console.log("No event logs found.");
      }
      // Log details about the receivers and transferred amounts
      console.log("Receiver 0 in Test -> ",receivers[0])
      console.log("Receiver 1 in Test -> ",receivers[1])
      console.log("Receiver 0 in Contract -> ",receiversInContract[0])
      console.log("Receiver 1 in Contract -> ",receiversInContract[1])
      console.log("Value per Receiver -> ", expectedValuePerReceiver)

      // Assert that the transferred amounts and receiver addresses match expectations
      expect(etherValue).to.equal(expectedValuePerReceiver);
      expect(receivers[0]).to.equal(receiversInContract[0]);
      expect(receivers[1]).to.equal(receiversInContract[1]);
      expect(1).to.equal(1); // This line seems redundant and can be removed
    });
  });
});
