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
  let deployer, winner;

  beforeEach(async () => {
    [deployer, winner] = await ethers.getSigners();
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

  describe("Winning", () => {
    let transaction
    beforeEach(async ()=> {
        transaction = await kuisionerweb.connect(deployer).list()
        await transaction.wait()

        transaction = await kuisionerweb.connect(winner).win(ID, { value: PRIZE})
    })
    it("Updates the contract balance", async () => {
        const result = await ethers.provider.getBalance(kuisionerweb.address)
        expect(result).to.equal(COST)
    })
    it("Updates winner's order count", async () => {
        const result = await kuisionerweb.connect(winner.address)
        expect(result.orderCount).to.equal(1)
  })
  it("Adds the order", async () => {
    const order = await kuisionerweb.orders(winner.address, 1)

    expect(order.time).to.be.greaterThan(0)
    expect(order.item.name).to.equal(NAME)
  })
})
})
