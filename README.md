# NFT Memory Card Game

A memory card matching game with blockchain integration, allowing players to collect NFTs by achieving high scores.

![NFT Memory Game](https://i.imgur.com/example.png)

## Features

- Beautiful card designs with smooth flip animations
- Multiple difficulty levels (different grid sizes: 4x4, 6x6, 8x8)
- Timer and move counter to track performance
- Sound effects and background music
- Responsive design for all devices
- Blockchain integration with NFT rewards
- Global leaderboard stored on-chain
- Gasless transactions for all blockchain interactions

## Technologies Used

- **Frontend**: React, HTML5, CSS3 with animations
- **Smart Contract**: Solidity with ERC-721 for NFTs
- **Storage**: IPFS for NFT metadata
- **Web3 Integration**: ethers.js
- **Gasless Transactions**: Biconomy Mexa

## Project Architecture

### Smart Contracts

- **MemoryGame.sol**: Main contract for game logic, NFT minting, and leaderboard
- **BiconomyForwarder.sol**: Meta-transaction forwarder for gasless transactions

### Frontend

- **app.js**: React components and game logic
- **styles.css**: Styling and animations
- **web3Service.js**: Web3 integration for blockchain interactions
- **sounds.js**: Sound manager for game audio

## Getting Started

### Prerequisites

- Node.js (v14+) and npm installed
- MetaMask or another Web3 wallet
- A modern web browser

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```
# Network RPC URLs
MUMBAI_URL=https://rpc-mumbai.maticvigil.com
POLYGON_URL=https://polygon-rpc.com
GOERLI_URL=https://goerli.infura.io/v3/your-project-id
SEPOLIA_URL=https://sepolia.infura.io/v3/your-project-id
MAINNET_URL=https://mainnet.infura.io/v3/your-project-id

# Deployment
PRIVATE_KEY=your_private_key_here
BASE_URI=https://ipfs.io/ipfs/

# Verification
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Gas Reporter
REPORT_GAS=false
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
```

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/nft-memory-game.git
cd nft-memory-game
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Smart Contract Deployment

1. Install Hardhat:
```
npm install --save-dev hardhat
```

2. Compile the contracts:
```
npx hardhat compile
```

3. Run tests:
```
npx hardhat test
```

4. Deploy the contracts:
```
npx hardhat run scripts/deploy.js --network <network-name>
```

5. Verify the contracts (optional):
```
npx hardhat verify --network <network-name> <contract-address> <constructor-arguments>
```

## How to Play

1. Connect your wallet using the "Connect Wallet" button
2. Select a difficulty level (Easy, Medium, or Hard)
3. Click on cards to flip them and find matching pairs
4. Complete the game by matching all pairs
5. Save your score to the blockchain to earn NFT rewards
6. View your NFT collection and the global leaderboard

## Game Mechanics

### Scoring System

The score is calculated based on three factors:
- **Time taken**: Faster completion yields higher scores
- **Number of moves**: Fewer moves yield higher scores
- **Difficulty level**: Higher difficulty yields higher base scores

The formula is:
```
baseScore = (difficulty + 1) * 1000
timeMultiplier = max(0.1, 1 - (time / (180 * (difficulty + 1))))
moveMultiplier = max(0.1, 1 - ((moves - perfectMoves) / (perfectMoves * 2)))
finalScore = baseScore * timeMultiplier * moveMultiplier
```

### NFT Rewards

Players can earn NFTs by achieving high scores:
- **Common NFT**: Score exceeds the base threshold
- **Rare NFT**: Score exceeds 110% of the threshold
- **Epic NFT**: Score exceeds 120% of the threshold
- **Legendary NFT**: Score exceeds 130% of the threshold

## Development

### Project Structure

```
/
├── app.js                 # React components and game logic
├── BiconomyForwarder.sol  # Meta-transaction forwarder contract
├── hardhat.config.js      # Hardhat configuration
├── index.html             # HTML entry point
├── MemoryGameContract.sol # Main game contract
├── package.json           # Project dependencies
├── README.md              # Project documentation
├── scripts/               # Deployment scripts
│   └── deploy.js          # Contract deployment script
├── sounds.js              # Sound manager
├── styles.css             # CSS styles
└── web3Service.js         # Web3 integration service
```

### Adding New Features

To add new features to the game:

1. **New Card Themes**:
   - Add new images to the `cardThemes` object in `app.js`
   - Create corresponding NFT metadata

2. **New Difficulty Levels**:
   - Add a new option in the difficulty selector
   - Update the grid CSS and card count logic

3. **New Game Modes**:
   - Create a new game mode component
   - Add the mode to the game state

## Troubleshooting

### Common Issues

1. **MetaMask not connecting**:
   - Ensure MetaMask is installed and unlocked
   - Check that you're on the correct network

2. **Transactions failing**:
   - Check your wallet has enough funds
   - Verify the contract addresses in `web3Service.js`

3. **Game not loading**:
   - Clear browser cache and reload
   - Check console for JavaScript errors

### Support

If you encounter any issues, please open an issue on GitHub or contact the development team.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries
- [Biconomy](https://biconomy.io/) for meta-transaction infrastructure
- [Polygon](https://polygon.technology/) for scalable blockchain infrastructure 
