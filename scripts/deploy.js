// Script to deploy the Memory Game smart contracts
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("\n-------------------------------------");
  console.log("Deploying NFT Memory Game contracts...");
  console.log("-------------------------------------\n");

  // Get network information
  const network = await hre.ethers.provider.getNetwork();
  console.log(`Network: ${network.name} (chainId: ${network.chainId})`);

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);
  
  const balance = await deployer.getBalance();
  console.log(`Account balance: ${hre.ethers.utils.formatEther(balance)} ETH\n`);

  // Check if we have enough balance to deploy
  if (balance.lt(hre.ethers.utils.parseEther("0.01"))) {
    console.error("Error: Insufficient balance to deploy contracts");
    process.exit(1);
  }

  try {
    // Get the contract factories
    console.log("Compiling contracts...");
    const BiconomyForwarder = await hre.ethers.getContractFactory("BiconomyForwarder");
    const MemoryGame = await hre.ethers.getContractFactory("MemoryGame");

    // Deploy the BiconomyForwarder contract
    console.log("Deploying BiconomyForwarder...");
    const biconomyForwarder = await BiconomyForwarder.deploy();
    await biconomyForwarder.deployed();
    console.log(`BiconomyForwarder deployed to: ${biconomyForwarder.address}`);
    console.log(`Transaction hash: ${biconomyForwarder.deployTransaction.hash}`);

    // Wait for confirmations
    console.log("Waiting for confirmations...");
    await biconomyForwarder.deployTransaction.wait(1);
    console.log("BiconomyForwarder deployment confirmed\n");

    // Deploy the MemoryGame contract
    console.log("Deploying MemoryGame...");
    const baseURI = process.env.BASE_URI || "https://ipfs.io/ipfs/"; // Replace with your IPFS gateway
    console.log(`Using base URI: ${baseURI}`);
    
    const memoryGame = await MemoryGame.deploy(
      "NFT Memory Game",
      "MEMORY",
      baseURI,
      biconomyForwarder.address
    );
    await memoryGame.deployed();
    console.log(`MemoryGame deployed to: ${memoryGame.address}`);
    console.log(`Transaction hash: ${memoryGame.deployTransaction.hash}`);

    // Wait for confirmations
    console.log("Waiting for confirmations...");
    await memoryGame.deployTransaction.wait(1);
    console.log("MemoryGame deployment confirmed\n");

    // Add the MemoryGame contract to the trusted contracts list in BiconomyForwarder
    console.log("Adding MemoryGame to trusted contracts...");
    const tx = await biconomyForwarder.addTrustedContract(memoryGame.address);
    console.log(`Transaction hash: ${tx.hash}`);
    
    // Wait for confirmation
    console.log("Waiting for confirmation...");
    await tx.wait(1);
    console.log("MemoryGame added to trusted contracts\n");

    // Verify that the contract was added correctly
    const isTrusted = await biconomyForwarder.isTrustedContract(memoryGame.address);
    if (!isTrusted) {
      console.warn("Warning: MemoryGame contract was not added to trusted contracts list correctly");
    } else {
      console.log("Verified: MemoryGame is in the trusted contracts list\n");
    }

    // Deployment summary
    console.log("-------------------------------------");
    console.log("Deployment complete!");
    console.log("-------------------------------------");
    console.log("Contract addresses:");
    console.log(`BiconomyForwarder: ${biconomyForwarder.address}`);
    console.log(`MemoryGame: ${memoryGame.address}`);
    
    // Update web3Service.js with the new addresses
    try {
      updateContractAddresses(biconomyForwarder.address, memoryGame.address);
      console.log("\nContract addresses updated in web3Service.js");
    } catch (error) {
      console.error("Error updating contract addresses in web3Service.js:", error.message);
      console.log("\nPlease manually update these addresses in web3Service.js");
    }

    // Verification instructions
    if (network.name !== "hardhat" && network.name !== "localhost") {
      console.log("\n-------------------------------------");
      console.log("Verification Instructions");
      console.log("-------------------------------------");
      console.log("To verify the BiconomyForwarder contract:");
      console.log(`npx hardhat verify --network ${network.name} ${biconomyForwarder.address}`);
      console.log("\nTo verify the MemoryGame contract:");
      console.log(`npx hardhat verify --network ${network.name} ${memoryGame.address} "NFT Memory Game" "MEMORY" "${baseURI}" ${biconomyForwarder.address}`);
    }
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exit(1);
  }
}

// Function to update contract addresses in web3Service.js
function updateContractAddresses(forwarderAddress, contractAddress) {
  const filePath = path.join(__dirname, "..", "web3Service.js");
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  let content = fs.readFileSync(filePath, "utf8");
  
  // Update contract address
  content = content.replace(
    /contractAddress: '0x[0-9a-fA-F]{40}'/,
    `contractAddress: '${contractAddress}'`
  );
  
  // Update forwarder address
  content = content.replace(
    /forwarderAddress: '0x[0-9a-fA-F]{40}'/,
    `forwarderAddress: '${forwarderAddress}'`
  );
  
  fs.writeFileSync(filePath, content, "utf8");
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
