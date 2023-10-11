const { ethers } = require("hardhat");

async function main() {
  const FRZTOKEN = await ethers.getContractFactory("Feroz");
  const FRZToken = await FRZTOKEN.deploy(1000000000000);

  console.log("Feroz token deployed: ", await FRZToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
