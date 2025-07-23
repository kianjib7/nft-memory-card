// Card data with placeholder images for NFTs
const cardThemes = {
  crypto: [
    { id: 1, image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    { id: 2, image: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
    { id: 3, image: "https://cryptologos.cc/logos/cardano-ada-logo.png" },
    { id: 4, image: "https://cryptologos.cc/logos/solana-sol-logo.png" },
    { id: 5, image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png" },
    { id: 6, image: "https://cryptologos.cc/logos/avalanche-avax-logo.png" },
    { id: 7, image: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
    { id: 8, image: "https://cryptologos.cc/logos/polygon-matic-logo.png" },
    { id: 9, image: "https://cryptologos.cc/logos/uniswap-uni-logo.png" },
    { id: 10, image: "https://cryptologos.cc/logos/aave-aave-logo.png" },
    { id: 11, image: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
    { id: 12, image: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
    { id: 13, image: "https://cryptologos.cc/logos/cosmos-atom-logo.png" },
    { id: 14, image: "https://cryptologos.cc/logos/algorand-algo-logo.png" },
    { id: 15, image: "https://cryptologos.cc/logos/stellar-xlm-logo.png" },
    { id: 16, image: "https://cryptologos.cc/logos/filecoin-fil-logo.png" },
    { id: 17, image: "https://cryptologos.cc/logos/near-protocol-near-logo.png" },
    { id: 18, image: "https://cryptologos.cc/logos/fantom-ftm-logo.png" },
  ]
};

// Sound effects
const sounds = {
  flip: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3"),
  match: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3"),
  complete: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"),
};

// Smart contract ABI (simplified for demo)
const contractABI = [
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
          { "internalType": "uint256", "name": "difficulty", "type": "uint256" }
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
      { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
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
  }
];

// Contract address (placeholder)
const contractAddress = "0x0000000000000000000000000000000000000000";

// React Components
const { useState, useEffect, useCallback, useRef } = React;

// Card Component
const Card = ({ card, isFlipped, isMatched, onClick }) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} 
      onClick={onClick}
    >
      <div className="card-face card-back"></div>
      <div className="card-face card-front">
        <img src={card.image} alt="Card" className="card-image" />
      </div>
    </div>
  );
};

// Game Complete Modal
const GameCompleteModal = ({ time, moves, score, onRestart, onSaveResult, isSaving }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Game Complete!</h2>
        <p>Time: {formatTime(time)}</p>
        <p>Moves: {moves}</p>
        <p>Score: {score}</p>
        <div className="modal-buttons">
          <button className="btn" onClick={onRestart}>Play Again</button>
          <button 
            className="btn btn-secondary" 
            onClick={onSaveResult} 
            disabled={isSaving}
          >
            {isSaving ? <span className="loading-spinner"></span> : 'Save to Blockchain'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Wallet Connection Component
const WalletConnection = ({ account, onConnect }) => {
  return (
    <div className="wallet-section">
      {account ? (
        <div className="wallet-address">
          {`${account.slice(0, 6)}...${account.slice(-4)}`}
        </div>
      ) : (
        <button className="wallet-btn" onClick={onConnect}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

// NFT Collection Component
const NFTCollection = ({ nfts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="collection-section">
        <h2 className="collection-title">Your NFT Collection</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!nfts || nfts.length === 0) {
    return (
      <div className="collection-section">
        <h2 className="collection-title">Your NFT Collection</h2>
        <p>Complete games to earn NFTs!</p>
      </div>
    );
  }

  return (
    <div className="collection-section">
      <h2 className="collection-title">Your NFT Collection</h2>
      <div className="nft-grid">
        {nfts.map(nft => (
          <div key={nft.id} className="nft-card">
            <img src={nft.image} alt={nft.name} className="nft-image" />
            <div className="nft-info">
              <div className="nft-name">{nft.name}</div>
              <div className="nft-rarity">{nft.rarity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Leaderboard Component
const Leaderboard = ({ leaderboard, isLoading }) => {
  if (isLoading) {
    return (
      <div className="leaderboard-section">
        <h2 className="leaderboard-title">Global Leaderboard</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="leaderboard-section">
      <h2 className="leaderboard-title">Global Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Time</th>
            <th>Moves</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`${entry.player.slice(0, 6)}...${entry.player.slice(-4)}`}</td>
              <td>{entry.score}</td>
              <td>{formatTime(entry.time)}</td>
              <td>{entry.moves}</td>
              <td>{getDifficultyName(entry.difficulty)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper functions
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getDifficultyName = (difficulty) => {
  switch(difficulty) {
    case 0: return "Easy (4x4)";
    case 1: return "Medium (6x6)";
    case 2: return "Hard (8x8)";
    default: return "Unknown";
  }
};

const calculateScore = (time, moves, difficulty) => {
  // Base score depends on difficulty
  const baseScore = (difficulty + 1) * 1000;
  
  // Time penalty (lower is better)
  const timeMultiplier = Math.max(0.1, 1 - (time / (180 * (difficulty + 1))));
  
  // Moves penalty (lower is better)
  const perfectMoves = (difficulty === 0) ? 16 : (difficulty === 1) ? 36 : 64;
  const moveMultiplier = Math.max(0.1, 1 - ((moves - perfectMoves) / (perfectMoves * 2)));
  
  // Calculate final score
  return Math.round(baseScore * timeMultiplier * moveMultiplier);
};

// Main Game Component
const MemoryGame = () => {
  // Game state
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [difficulty, setDifficulty] = useState(0); // 0: 4x4, 1: 6x6, 2: 8x8
  const [isSavingResult, setIsSavingResult] = useState(false);
  
  // Web3 state
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  // Timer ref
  const timerRef = useRef(null);

  // Initialize cards based on difficulty
  const initializeGame = useCallback(() => {
    let pairCount;
    switch(difficulty) {
      case 0: pairCount = 8; break;  // 4x4 grid (8 pairs)
      case 1: pairCount = 18; break; // 6x6 grid (18 pairs)
      case 2: pairCount = 32; break; // 8x8 grid (32 pairs)
      default: pairCount = 8;
    }

    // Get cards from theme
    const selectedCards = [...cardThemes.crypto].slice(0, pairCount);
    
    // Create pairs and shuffle
    const cardPairs = [...selectedCards, ...selectedCards].map((card, index) => ({
      ...card,
      id: card.id,
      uniqueId: `${card.id}-${index}`,
    }));
    
    // Fisher-Yates shuffle algorithm
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    setCards(cardPairs);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTime(0);
    setIsActive(false);
    setGameComplete(false);
    
    // Clear timer if it exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [difficulty]);

  // Initialize game on mount and when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [difficulty, initializeGame]);

  // Timer effect
  useEffect(() => {
    if (isActive && !gameComplete) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, gameComplete]);

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === cards.length / 2) {
      setIsActive(false);
      setGameComplete(true);
      sounds.complete.play();
    }
  }, [matchedPairs, cards.length]);

  // Handle card click
  const handleCardClick = (index) => {
    // Ignore click if:
    // 1. Card is already flipped or matched
    // 2. Two cards are already flipped
    if (
      flippedIndices.includes(index) || 
      matchedPairs.includes(cards[index].id) ||
      flippedIndices.length === 2
    ) {
      return;
    }
    
    // Start timer on first card flip
    if (!isActive) {
      setIsActive(true);
    }
    
    // Play flip sound
    sounds.flip.play();
    
    // Flip the card
    setFlippedIndices(prev => [...prev, index]);
    
    // If this is the second card flipped
    if (flippedIndices.length === 1) {
      // Increment moves
      setMoves(prevMoves => prevMoves + 1);
      
      const firstCardIndex = flippedIndices[0];
      const secondCardIndex = index;
      
      // Check if cards match
      if (cards[firstCardIndex].id === cards[secondCardIndex].id) {
        // Match found
        setTimeout(() => {
          sounds.match.play();
          setMatchedPairs(prev => [...prev, cards[firstCardIndex].id]);
        }, 500);
        
        // Reset flipped indices
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        // Create provider and contract
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethersProvider);
        
        const gameContract = new ethers.Contract(
          contractAddress,
          contractABI,
          ethersProvider.getSigner()
        );
        setContract(gameContract);
        
        // Load NFTs and leaderboard
        loadNFTs(accounts[0], gameContract);
        loadLeaderboard(gameContract);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature!");
    }
  };

  // Load NFTs
  const loadNFTs = async (userAddress, contract) => {
    setIsLoadingNFTs(true);
    try {
      // In a real app, we would fetch NFTs from the contract
      // For demo purposes, we'll use placeholder data
      setTimeout(() => {
        setNfts([
          { 
            id: 1, 
            name: "Memory Master", 
            rarity: "Rare", 
            image: "https://cryptologos.cc/logos/ethereum-eth-logo.png" 
          },
          { 
            id: 2, 
            name: "Quick Solver", 
            rarity: "Common", 
            image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" 
          },
        ]);
        setIsLoadingNFTs(false);
      }, 1500);
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setIsLoadingNFTs(false);
    }
  };

  // Load leaderboard
  const loadLeaderboard = async (contract) => {
    setIsLoadingLeaderboard(true);
    try {
      // In a real app, we would fetch leaderboard from the contract
      // For demo purposes, we'll use placeholder data
      setTimeout(() => {
        setLeaderboard([
          { 
            player: "0x1234567890123456789012345678901234567890", 
            score: 9500, 
            time: 45, 
            moves: 16, 
            difficulty: 0 
          },
          { 
            player: "0x2345678901234567890123456789012345678901", 
            score: 8200, 
            time: 120, 
            moves: 25, 
            difficulty: 1 
          },
          { 
            player: "0x3456789012345678901234567890123456789012", 
            score: 7800, 
            time: 180, 
            moves: 40, 
            difficulty: 2 
          },
        ]);
        setIsLoadingLeaderboard(false);
      }, 1500);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
      setIsLoadingLeaderboard(false);
    }
  };

  // Save game result to blockchain
  const saveGameResult = async () => {
    if (!contract || !account) {
      alert("Please connect your wallet first!");
      return;
    }
    
    setIsSavingResult(true);
    
    try {
      // Calculate score
      const score = calculateScore(time, moves, difficulty);
      
      // In a real app, we would save to the blockchain
      // For demo purposes, we'll simulate a delay
      setTimeout(() => {
        // Add result to leaderboard
        setLeaderboard(prev => [
          ...prev, 
          { 
            player: account, 
            score, 
            time, 
            moves, 
            difficulty 
          }
        ].sort((a, b) => b.score - a.score));
        
        setIsSavingResult(false);
        
        // Add a new NFT if score is high enough
        if (score > 8000) {
          setNfts(prev => [
            ...prev,
            { 
              id: prev.length + 1, 
              name: "High Scorer", 
              rarity: "Epic", 
              image: "https://cryptologos.cc/logos/cardano-ada-logo.png" 
            }
          ]);
        }
      }, 2000);
    } catch (error) {
      console.error("Error saving game result:", error);
      setIsSavingResult(false);
    }
  };

  // Get grid class based on difficulty
  const getGridClass = () => {
    switch(difficulty) {
      case 0: return "grid-4x4";
      case 1: return "grid-6x6";
      case 2: return "grid-8x8";
      default: return "grid-4x4";
    }
  };

  return (
    <div className="app">
      <header>
        <h1>NFT Memory Game</h1>
        <p className="subtitle">Match cards to collect NFTs and compete on the blockchain!</p>
      </header>
      
      <WalletConnection account={account} onConnect={connectWallet} />
      
      <div className="game-controls">
        <div className="difficulty-selector">
          <button 
            className={`difficulty-btn ${difficulty === 0 ? 'active' : ''}`}
            onClick={() => setDifficulty(0)}
          >
            Easy (4x4)
          </button>
          <button 
            className={`difficulty-btn ${difficulty === 1 ? 'active' : ''}`}
            onClick={() => setDifficulty(1)}
          >
            Medium (6x6)
          </button>
          <button 
            className={`difficulty-btn ${difficulty === 2 ? 'active' : ''}`}
            onClick={() => setDifficulty(2)}
          >
            Hard (8x8)
          </button>
        </div>
        
        <div className="game-stats">
          <div className="stat">
            <div className="stat-value">{formatTime(time)}</div>
            <div className="stat-label">Time</div>
          </div>
          <div className="stat">
            <div className="stat-value">{moves}</div>
            <div className="stat-label">Moves</div>
          </div>
          <div className="stat">
            <div className="stat-value">{matchedPairs.length}</div>
            <div className="stat-label">Pairs</div>
          </div>
        </div>
      </div>
      
      <div className={`game-board ${getGridClass()}`}>
        {cards.map((card, index) => (
          <Card
            key={card.uniqueId}
            card={card}
            isFlipped={flippedIndices.includes(index)}
            isMatched={matchedPairs.includes(card.id)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      
      {gameComplete && (
        <GameCompleteModal
          time={time}
          moves={moves}
          score={calculateScore(time, moves, difficulty)}
          onRestart={initializeGame}
          onSaveResult={saveGameResult}
          isSaving={isSavingResult}
        />
      )}
      
      {account && (
        <>
          <NFTCollection nfts={nfts} isLoading={isLoadingNFTs} />
          <Leaderboard leaderboard={leaderboard} isLoading={isLoadingLeaderboard} />
        </>
      )}
    </div>
  );
};

// Render the app
ReactDOM.render(<MemoryGame />, document.getElementById('root')); 