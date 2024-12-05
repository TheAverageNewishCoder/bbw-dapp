const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying the contract with the account:", deployer.address);

  const BBW = await hre.ethers.getContractFactory("BBW");
  const bbw = await BBW.deploy(hre.ethers.parseEther("1000"));

  await bbw.waitForDeployment();

  const contractAddress = await bbw.getAddress();

  console.log("BBW Token deployed to:", contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
