const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Feroz Token Deployment Test", function () {
  async function deployFixture() {
    const Token = await ethers.getContractFactory("Feroz");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const FRZToken = await Token.deploy(1000000000000);

    return { FRZToken, owner, addr1, addr2 };
  }

  // TEST 1
  it("Should assign the total supply of tokens to the owner", async function () {
    const { FRZToken, owner } = await loadFixture(deployFixture);

    const ownerBalance = await FRZToken.balanceOf(owner.address);
    expect(await FRZToken.totalSupply()).to.equal(ownerBalance);
  });

  // TEST 2
  it("Should transfer tokens between accounts", async function () {
    const { FRZToken, owner, addr1, addr2 } = await loadFixture(deployFixture);

    await expect(FRZToken.transfer(addr1.address, 50)).to.changeTokenBalances(
      FRZToken,
      [owner, addr1],
      [-50, 50]
    );

    await expect(
      FRZToken.connect(addr1).transfer(addr2.address, 50)
    ).to.changeTokenBalances(FRZToken, [addr1, addr2], [-50, 50]);
  });
});
