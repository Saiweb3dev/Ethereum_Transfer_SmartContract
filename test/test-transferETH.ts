import {expect,use} from 'chai'
import { ethers } from 'hardhat';
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

describe('TransferETH Testing',() => {
   
   let TransferETH_Factory : any,TransferETH:any,owner:any;

  beforeEach('Deploying Contract',async () => {
     TransferETH_Factory = await ethers.getContractFactory("TransferETH");
     [owner] = await ethers.getSigners();
      TransferETH = await TransferETH_Factory.deploy();

  })
  it("Owner is as expected",async () => {
    const ownerAddressPromise = Promise.resolve(await TransferETH.getOwner());

    console.log("Owner Address:",await ownerAddressPromise)
     console.log("Owner Object:",owner)
    await expect(ownerAddressPromise).to.eventually.equal(owner.address)
  })
})