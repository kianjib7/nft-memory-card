/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

// Load environment variables
let dotenvLoaded = false;
try {
  require('dotenv').config();
  dotenvLoaded = true;
  console.log("Environment variables loaded from .env file");
} catch (error) {
  console.warn("Warning: dotenv package not found or .env file missing. Using default or environment variables.");
}

// Check for required environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY && process.env.NODE_ENV === 'production') {
  console.warn("Warning: PRIVATE_KEY environment variable not set. Deployment will fail.");
}

// Get RPC URLs from environment or use defaults
const MUMBAI_URL = process.env.MUMBAI_URL || "https://rpc-mumbai.maticvigil.com";
const POLYGON_URL = process.env.POLYGON_URL || "https://polygon-rpc.com";
const GOERLI_URL = process.env.GOERLI_URL || "https://goerli.infura.io/v3/your-project-id";
const SEPOLIA_URL = process.env.SEPOLIA_URL || "https://sepolia.infura.io/v3/your-project-id";
const MAINNET_URL = process.env.MAINNET_URL || "https://mainnet.infura.io/v3/your-project-id";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// Task to check balance of an account
task('balance', 'Prints the balance of an account')
  .addParam('account', 'The account address')
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);
    console.log(`Balance of ${taskArgs.account}: ${hre.ethers.utils.formatEther(balance)} ETH`);
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        interval: 5000
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      timeout: 30000,
      gas: "auto"
    },
    mumbai: {
      url: MUMBAI_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80001,
      gasPrice: 'auto',
      verify: {
        etherscan: {
          apiUrl: "https://api-testnet.polygonscan.com/"
        }
      }
    },
    polygon: {
      url: POLYGON_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 137,
      gasPrice: 'auto',
      verify: {
        etherscan: {
          apiUrl: "https://api.polygonscan.com/"
        }
      }
    },
    goerli: {
      url: GOERLI_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 5,
      gasPrice: 'auto'
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111,
      gasPrice: 'auto'
    },
    mainnet: {
      url: MAINNET_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1,
      gasPrice: 'auto'
    }
  },
  paths: {
    sources: "./",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  mocha: {
    timeout: 60000
  }
}; 
