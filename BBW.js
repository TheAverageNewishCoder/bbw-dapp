const { expect } = require("chai");

describe("BBW Token Contract", function () {
  let BBW, bbw, owner, addr1, addr2;

  beforeEach(async function () {
    BBW = await ethers.getContractFactory("BBW");
    [owner, addr1, addr2] = await ethers.getSigners();
    bbw = await BBW.deploy(ethers.parseEther("1000"));
    await bbw.waitForDeployment();
  });

  it("Should assign the total supply to the owner", async function () {
    const ownerBalance = await bbw.balanceOf(owner.address);
    expect(await bbw.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    await bbw.transfer(addr1.address, ethers.parseEther("50"));
    const addr1Balance = await bbw.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.parseEther("50"));
  });
});
