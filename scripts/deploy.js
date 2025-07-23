// Script to deploy the Memory Game smart contracts
const hre = require("hardhat");

async function main() {
  console.log("Deploying NFT Memory Game contracts...");

  // Get the contract factories
  const BiconomyForwarder = await hre.ethers.getContractFactory("BiconomyForwarder");
  const MemoryGame = await hre.ethers.getContractFactory("MemoryGame");

  // Deploy the BiconomyForwarder contract
  console.log("Deploying BiconomyForwarder...");
  const biconomyForwarder = await BiconomyForwarder.deploy();
  await biconomyForwarder.deployed();
  console.log("BiconomyForwarder deployed to:", biconomyForwarder.address);

  // Deploy the MemoryGame contract
  console.log("Deploying MemoryGame...");
  const baseURI = "https://ipfs.io/ipfs/"; // Replace with your IPFS gateway
  const memoryGame = await MemoryGame.deploy(
    "NFT Memory Game",
    "MEMORY",
    baseURI,
    biconomyForwarder.address
  );
  await memoryGame.deployed();
  console.log("MemoryGame deployed to:", memoryGame.address);

  // Add the MemoryGame contract to the trusted contracts list in BiconomyForwarder
  console.log("Adding MemoryGame to trusted contracts...");
  const tx = await biconomyForwarder.addTrustedContract(memoryGame.address);
  await tx.wait();
  console.log("MemoryGame added to trusted contracts");

  console.log("Deployment complete!");
  console.log("Contract addresses:");
  console.log("BiconomyForwarder:", biconomyForwarder.address);
  console.log("MemoryGame:", memoryGame.address);
  console.log("\nUpdate these addresses in web3Service.js");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
