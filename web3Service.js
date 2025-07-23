// Web3 integration for NFT Memory Card Game
const Web3Service = {
  // Contract addresses (replace with actual deployed contract addresses)
  contractAddress: '0x0000000000000000000000000000000000000000',
  forwarderAddress: '0x0000000000000000000000000000000000000000',
  
  // Contract ABIs
  contractABI: [
    {
      "inputs": [
        { "internalType": "uint256", "name": "score", "type": "uint256" },
        { "internalType": "uint256", "name": "time", "type": "uint256" },
        { "internalType": "uint256", "name": "moves", "type": "uint256" },
        { "internalType": "uint256", "name": "difficulty", "type": "uint256" }
      ],
      "name": "saveGameResult",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLeaderboard",
      "outputs": [
        {
          "components": [
            { "internalType": "address", "name": "player", "type": "address" },
            { "internalType": "uint256", "name": "score", "type": "uint256" },
            { "internalType": "uint256", "name": "time", "type": "uint256" },
            { "internalType": "uint256", "name": "moves", "type": "uint256" },
            { "internalType": "uint256", "name": "difficulty", "type": "uint256" },
            { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
          ],
          "internalType": "struct MemoryGame.GameResult[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "owner", "type": "address" }
      ],
      "name": "getNFTsOfOwner",
      "outputs": [
        { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
      ],
      "name": "getNFTDetails",
      "outputs": [
        { "internalType": "uint8", "name": "rarity", "type": "uint8" },
        { "internalType": "string", "name": "theme", "type": "string" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  
  forwarderABI: [
    {
      "inputs": [
        { "internalType": "address", "name": "from", "type": "address" }
      ],
      "name": "getNonce",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "value", "type": "uint256" },
            { "internalType": "uint256", "name": "gas", "type": "uint256" },
            { "internalType": "uint256", "name": "nonce", "type": "uint256" },
            { "internalType": "bytes", "name": "data", "type": "bytes" }
          ],
          "internalType": "struct BiconomyForwarder.ForwardRequest",
          "name": "req",
          "type": "tuple"
        },
        { "internalType": "bytes", "name": "signature", "type": "bytes" }
      ],
      "name": "execute",
      "outputs": [
        { "internalType": "bool", "name": "success", "type": "bool" },
        { "internalType": "bytes", "name": "returndata", "type": "bytes" }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  
  // Provider and contract instances
  provider: null,
  contract: null,
  forwarder: null,
  
  // Initialize Web3 service
  async init() {
    if (window.ethereum) {
      try {
        // Create provider
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Create contract instances
        this.contract = new ethers.Contract(
          this.contractAddress,
          this.contractABI,
          this.provider
        );
        
        this.forwarder = new ethers.Contract(
          this.forwarderAddress,
          this.forwarderABI,
          this.provider
        );
        
        return true;
      } catch (error) {
        console.error("Error initializing Web3Service:", error);
        return false;
      }
    } else {
      console.error("Ethereum provider not found");
      return false;
    }
  },
  
  // Connect wallet
  async connectWallet() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  },
  
  // Get signer
  getSigner() {
    return this.provider.getSigner();
  },
  
  // Get contract with signer
  getContractWithSigner() {
    return this.contract.connect(this.getSigner());
  },
  
  // Get forwarder with signer
  getForwarderWithSigner() {
    return this.forwarder.connect(this.getSigner());
  },
  
  // Get leaderboard
  async getLeaderboard() {
    try {
      const leaderboard = await this.contract.getLeaderboard();
      return leaderboard.map(entry => ({
        player: entry.player,
        score: entry.score.toNumber(),
        time: entry.time.toNumber(),
        moves: entry.moves.toNumber(),
        difficulty: entry.difficulty.toNumber(),
        timestamp: entry.timestamp.toNumber()
      }));
    } catch (error) {
      console.error("Error getting leaderboard:", error);
      throw error;
    }
  },
  
  // Get player's NFTs
  async getNFTs(address) {
    try {
      const tokenIds = await this.contract.getNFTsOfOwner(address);
      
      // Get details for each NFT
      const nfts = await Promise.all(tokenIds.map(async (tokenId) => {
        const details = await this.contract.getNFTDetails(tokenId);
        
        // Convert rarity number to string
        let rarityStr;
        switch (details.rarity) {
          case 0: rarityStr = "Common"; break;
          case 1: rarityStr = "Rare"; break;
          case 2: rarityStr = "Epic"; break;
          case 3: rarityStr = "Legendary"; break;
          default: rarityStr = "Unknown";
        }
        
        // Create NFT object
        return {
          id: tokenId.toNumber(),
          rarity: rarityStr,
          theme: details.theme,
          // In a real app, we would fetch the image from IPFS using the tokenURI
          // For demo purposes, we'll use placeholder images
          image: `https://cryptologos.cc/logos/${details.theme === 'crypto' ? 'ethereum-eth-logo.png' : 'bitcoin-btc-logo.png'}`
        };
      }));
      
      return nfts;
    } catch (error) {
      console.error("Error getting NFTs:", error);
      throw error;
    }
  },
  
  // Save game result with gasless transaction
  async saveGameResult(score, time, moves, difficulty, userAddress) {
    try {
      // Encode function call
      const functionData = this.contract.interface.encodeFunctionData(
        'saveGameResult',
        [score, time, moves, difficulty]
      );
      
      // Get nonce
      const nonce = await this.forwarder.getNonce(userAddress);
      
      // Create request
      const request = {
        from: userAddress,
        to: this.contractAddress,
        value: 0,
        gas: 500000,
        nonce: nonce.toNumber(),
        data: functionData
      };
      
      // Get domain data for EIP-712 signature
      const domainData = {
        name: "BiconomyForwarder",
        version: "1",
        chainId: (await this.provider.getNetwork()).chainId,
        verifyingContract: this.forwarderAddress
      };
      
      // Get types for EIP-712 signature
      const types = {
        ForwardRequest: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "gas", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "data", type: "bytes" }
        ]
      };
      
      // Sign the request
      const signer = this.getSigner();
      const signature = await signer._signTypedData(domainData, types, request);
      
      // Execute the request
      const tx = await this.getForwarderWithSigner().execute(request, signature);
      await tx.wait();
      
      return true;
    } catch (error) {
      console.error("Error saving game result:", error);
      throw error;
    }
  }
};

// Export the service
window.Web3Service = Web3Service; 