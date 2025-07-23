# NFT Memory Card Game

A memory card matching game with blockchain integration, allowing players to collect NFTs by achieving high scores.

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

## Getting Started

### Prerequisites

- Node.js and npm installed
- MetaMask or another Web3 wallet
- A modern web browser

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

## How to Play

1. Connect your wallet using the "Connect Wallet" button
2. Select a difficulty level (Easy, Medium, or Hard)
3. Click on cards to flip them and find matching pairs
4. Complete the game by matching all pairs
5. Save your score to the blockchain to earn NFT rewards
6. View your NFT collection and the global leaderboard

## Smart Contract Deployment

1. Install Hardhat:
```
npm install --save-dev hardhat
```

2. Compile the contracts:
```
npx hardhat compile
```

3. Deploy the contracts:
```
npx hardhat run scripts/deploy.js --network <network-name>
```

4. Update the contract addresses in `web3Service.js`

## Game Mechanics

- **Scoring**: Score is calculated based on time taken, number of moves, and difficulty level
- **NFT Rewards**: Players can earn NFTs by achieving high scores
- **Leaderboard**: Top scores are stored on the blockchain for global competition
- **Card Collection**: Players can collect and showcase their NFT cards

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 