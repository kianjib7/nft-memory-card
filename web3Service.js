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
  
  /**
   * Initialize Web3 service
   * @returns {Promise<boolean>} True if initialization was successful
   */
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
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', (chainId) => {
          console.log('Chain changed to:', chainId);
          window.location.reload();
        });
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          console.log('Account changed to:', accounts[0]);
          window.location.reload();
        });
        
        return true;
      } catch (error) {
        console.error("Error initializing Web3Service:", error);
        throw new Error(`Failed to initialize Web3: ${error.message}`);
      }
    } else {
      console.error("Ethereum provider not found");
      throw new Error("No Ethereum provider detected. Please install MetaMask or another Web3 wallet.");
    }
  },
  
  /**
   * Connect wallet and get user's address
   * @returns {Promise<string>} Connected wallet address
   */
  async connectWallet() {
    if (!window.ethereum) {
      throw new Error("No Ethereum provider detected. Please install MetaMask or another Web3 wallet.");
    }
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please unlock your wallet and try again.");
      }
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        throw new Error("Connection rejected. Please approve the connection request in your wallet.");
      }
      throw new Error(`Failed to connect wallet: ${error.message}`);
    }
  },
  
  /**
   * Get the current network information
   * @returns {Promise<Object>} Network information
   */
  async getNetwork() {
    if (!this.provider) {
      throw new Error("Web3Service not initialized. Call init() first.");
    }
    
    try {
      return await this.provider.getNetwork();
    } catch (error) {
      console.error("Error getting network:", error);
      throw new Error(`Failed to get network: ${error.message}`);
    }
  },
  
  /**
   * Get signer for transactions
   * @returns {ethers.Signer} Signer object
   */
  getSigner() {
    if (!this.provider) {
      throw new Error("Web3Service not initialized. Call init() first.");
    }
    return this.provider.getSigner();
  },
  
  /**
   * Get contract with signer
   * @returns {ethers.Contract} Contract with signer
   */
  getContractWithSigner() {
    if (!this.contract) {
      throw new Error("Contract not initialized. Call init() first.");
    }
    return this.contract.connect(this.getSigner());
  },
  
  /**
   * Get forwarder with signer
   * @returns {ethers.Contract} Forwarder with signer
   */
  getForwarderWithSigner() {
    if (!this.forwarder) {
      throw new Error("Forwarder not initialized. Call init() first.");
    }
    return this.forwarder.connect(this.getSigner());
  },
  
  /**
   * Get global leaderboard
   * @returns {Promise<Array>} Array of leaderboard entries
   */
  async getLeaderboard() {
    if (!this.contract) {
      throw new Error("Contract not initialized. Call init() first.");
    }
    
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
      throw new Error(`Failed to get leaderboard: ${error.message}`);
    }
  },
  
  /**
   * Get player's NFTs
   * @param {string} address - Player's address
   * @returns {Promise<Array>} Array of NFT objects
   */
  async getNFTs(address) {
    if (!this.contract) {
      throw new Error("Contract not initialized. Call init() first.");
    }
    
    if (!address) {
      throw new Error("Address is required to get NFTs");
    }
    
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
      throw new Error(`Failed to get NFTs: ${error.message}`);
    }
  },
  
  /**
   * Save game result with gasless transaction
   * @param {number} score - Game score
   * @param {number} time - Time taken in seconds
   * @param {number} moves - Number of moves
   * @param {number} difficulty - Game difficulty (0: Easy, 1: Medium, 2: Hard)
   * @param {string} userAddress - Player's address
   * @returns {Promise<boolean>} True if successful
   */
  async saveGameResult(score, time, moves, difficulty, userAddress) {
    if (!this.contract || !this.forwarder) {
      throw new Error("Contracts not initialized. Call init() first.");
    }
    
    if (!userAddress) {
      throw new Error("User address is required to save game result");
    }
    
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
      const receipt = await tx.wait();
      
      console.log("Game result saved successfully:", receipt.transactionHash);
      return true;
    } catch (error) {
      console.error("Error saving game result:", error);
      
      // Provide more specific error messages
      if (error.code === 'ACTION_REJECTED') {
        throw new Error("Transaction rejected. Please approve the transaction in your wallet.");
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error("Insufficient funds for transaction. Please check your wallet balance.");
      } else {
        throw new Error(`Failed to save game result: ${error.message}`);
      }
    }
  }
};

// Export the service
window.Web3Service = Web3Service; 
