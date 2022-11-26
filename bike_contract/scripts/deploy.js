const hre = require("hardhat");

async function main() {
  const BikeChain = await hre.ethers.getContractFactory("BikeChain");
  const bikechain = await BikeChain.deploy();

  await bikechain.deployed();

  console.log(`BikeChain contract deployed to ${bikechain.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
