const { expect } = require("chai");
const { ethers } = require("hardhat"); // ✅ Required

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

const ID = 1
const NAME = "satriasp"
const CATEGORY = "kuisioner TA TC 2025"
const PRIZE = 1

describe("KuisionerWeb", () => {
  let kuisionerweb;
  let deployer;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const KuisionerWeb = await ethers.getContractFactory("KuisionerWeb");
    kuisionerweb = await KuisionerWeb.deploy();
  });

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await kuisionerweb.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await kuisionerweb.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        PRIZE
      );
      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await kuisionerweb.items(1);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.prize).to.equal(PRIZE);
    });
    it("Emits List event", ()=>{
        expect(transaction).to.emit(kuisionerweb, "List")
    })
  });
});
