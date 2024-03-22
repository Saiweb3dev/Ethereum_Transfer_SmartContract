// Import necessary libraries and modules
import { expect, use } from 'chai';
import hre from 'hardhat';
import chaiAsPromised from "chai-as-promised";
import { ethers } from 'ethers';

// Use chai-as-promised for handling promises in tests
use(chaiAsPromised);

// Describe the test suite for TransferETH contract
describe('TransferETH Testing', () => {
    // Declare variables for the contract factory, contract instance, and signers
    let TransferETH_Factory: any, TransferETH: any, owner: any, receiver: any = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    // Before each test, deploy the TransferETH contract and get the owner's signer
    beforeEach('Deploying Contract', async () => {
        TransferETH_Factory = await hre.ethers.getContractFactory("TransferETH");
        [owner] = await hre.ethers.getSigners();
        TransferETH = await TransferETH_Factory.deploy();
        console.log("Deployed the Contract");
    });

    // Test setting the receiver address in the contract
    describe("Setting Receiver Address", () => {
        // Before each test in this describe block, set the receiver address in the contract
        beforeEach("Owner sets the receiver address", async function () {
            await TransferETH.connect(owner).setReceiver(receiver);
            const receiverInContract = await TransferETH.getReceiver();
            console.log("Receiver In Contract", receiverInContract);
            console.log("Receiver original", receiver);
            // Assert that the receiver address set in the contract matches the original receiver address
            expect(receiver).to.equal(receiverInContract);
        });

        // Test transferring funds to the receiver
        describe("Transferring Funds", () => {
            it("Owner transfers funds to the receiver", async function () {
                console.log(`To Address :${receiver}`);

                // Fund the contract with some Ether
                const transferAmount = ethers.parseEther("1"); // Transferring 1 Ether
                await TransferETH.connect(owner).transferFund({ value: transferAmount });

                // Get the amount sent to the contract
                const amountReceivedInContract = await TransferETH.getAmountSent();

                console.log(`Amount sent in ether 1: ${transferAmount}`);
                console.log(`Amount sent in ether 2: ${amountReceivedInContract}`);
                // Assert that the receiver's balance has increased by the transfer amount
                expect(transferAmount).to.equal(amountReceivedInContract);
            });
        });
    });

    // Test that the owner's address is as expected
    it("Owner is as expected", async () => {
        const ownerAddressPromise = Promise.resolve(await TransferETH.getOwner());

        console.log("Owner Address:", await ownerAddressPromise);
        // Assert that the owner's address in the contract matches the owner's signer address
        await expect(ownerAddressPromise).to.eventually.equal(owner.address);
    });
});
