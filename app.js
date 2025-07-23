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
  ],
  // New theme: NFT Art
  nftArt: [
    { id: 1, image: "https://lh3.googleusercontent.com/H-LDthYRKPWJUGcEHDCaOK5y_pM0qyPOlLSiGbsLvhAqtHKOltTWfgLfAm-5jFPNKVGXGmrLteBRXn4NMcJIWxFHrAZ7m55CRC0=w600" },
    { id: 2, image: "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=w600" },
    { id: 3, image: "https://lh3.googleusercontent.com/l1wZXP2hHFUQ3turU5VQ9PpgVVasyQ79-ChvCgjoU5xKkBA50OGoJqKZeMOR-qLrzqwIfd1HpYmiv23JWm0EZ14owiPYaufqzmj1=w600" },
    { id: 4, image: "https://lh3.googleusercontent.com/Tc7kJNU8fC5ZQYYiV-8H-H9Q6RgACxPkLKY89GpZ6tORjvIqS9m_hRRXQCTYzzEb1XZ9bw3ZtOx2m2a_mgYmCZpHJJ8A2NjDzqA1=w600" },
    { id: 5, image: "https://lh3.googleusercontent.com/xcFxAMYPG6jrkCNgTolcYJwg8ydQfvHNNGvCbQ7jqcmSJBXMXWuOcsYQEjlHLtqwSWF0IQBcXz-CJIb_koFtkezV-o2-5HB5BpUB=w600" },
    { id: 6, image: "https://lh3.googleusercontent.com/n4xWHJD-M8S-bDO1-65OmSBGu_TfnH0CnGD8xPRh-xHKILV5UBuaXpKnWYQKIQXKjgQQCnfT2t4yrWQeTgKcm53bKnSLRGZLOFzA=w600" },
    { id: 7, image: "https://lh3.googleusercontent.com/6CS0frnjPEpvJ8hE3OG6-W5BMTRc3-rD-hnSG1JTN0Qy-qs9tgND-cUUBBpEQUwJqOqi6GzwQQj_by6K06tfVTVYG-nYwEUjbwe8=w600" },
    { id: 8, image: "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=w600" },
    { id: 9, image: "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=w600" },
  ]
};

// Sound effects
const sounds = {
  flip: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3"),
  match: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3"),
  complete: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"),
  // New sounds
  button: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3"),
  background: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-level-music-689.mp3"),
  error: new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3")
};

// Updated Memory Game Contract ABI
const contractABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "score", "type": "uint256" },
      { "internalType": "uint256", "name": "time", "type": "uint256" },
      { "internalType": "uint256", "name": "moves", "type": "uint256" },
      { "internalType": "uint256", "name": "difficulty", "type": "uint256" },
      { "internalType": "string", "name": "playerName", "type": "string" }
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
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "string", "name": "playerName", "type": "string" }
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
      { "internalType": "address", "name": "player", "type": "address" }
    ],
    "name": "getPlayerResults",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "player", "type": "address" },
          { "internalType": "uint256", "name": "score", "type": "uint256" },
          { "internalType": "uint256", "name": "time", "type": "uint256" },
          { "internalType": "uint256", "name": "moves", "type": "uint256" },
          { "internalType": "uint256", "name": "difficulty", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "string", "name": "playerName", "type": "string" }
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
      { "internalType": "address", "name": "player", "type": "address" }
    ],
    "name": "getPlayerBestResult",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "player", "type": "address" },
          { "internalType": "uint256", "name": "score", "type": "uint256" },
          { "internalType": "uint256", "name": "time", "type": "uint256" },
          { "internalType": "uint256", "name": "moves", "type": "uint256" },
          { "internalType": "uint256", "name": "difficulty", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "string", "name": "playerName", "type": "string" }
        ],
        "internalType": "struct MemoryGame.GameResult",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "count", "type": "uint256" }
    ],
    "name": "getTopPlayers",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "player", "type": "address" },
          { "internalType": "uint256", "name": "score", "type": "uint256" },
          { "internalType": "uint256", "name": "time", "type": "uint256" },
          { "internalType": "uint256", "name": "moves", "type": "uint256" },
          { "internalType": "uint256", "name": "difficulty", "type": "uint256" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "string", "name": "playerName", "type": "string" }
        ],
        "internalType": "struct MemoryGame.GameResult[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Actual deployed contract address
const contractAddress = "0x771b62261d5b728d6ca8976c696a06d70a03363f";

// React Components
const { useState, useEffect, useCallback, useRef } = React;

// Special Effects Component
const SpecialEffects = ({ type, position }) => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  
  const getEffectClass = () => {
    switch(type) {
      case 'match': return 'effect-match';
      case 'complete': return 'effect-complete';
      default: return '';
    }
  };
  
  return (
    <div 
      className={`special-effect ${getEffectClass()}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
    >
      {type === 'match' && '✓'}
      {type === 'complete' && '🎉'}
    </div>
  );
};

// Settings Component
const Settings = ({ volume, onVolumeChange, onThemeChange, currentTheme }) => {
  return (
    <div className="settings-panel">
      <h3>Settings</h3>
      <div className="setting-item">
        <label>Volume:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={volume} 
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        />
      </div>
      <div className="setting-item">
        <label>Card Theme:</label>
        <select value={currentTheme} onChange={(e) => onThemeChange(e.target.value)}>
          <option value="crypto">Crypto</option>
          <option value="nftArt">NFT Art</option>
        </select>
      </div>
    </div>
  );
};

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
  const [playerName, setPlayerName] = useState("");
  
  const handleSaveResult = () => {
    onSaveResult(playerName);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Game Complete!</h2>
        <p>Time: {formatTime(time)}</p>
        <p>Moves: {moves}</p>
        <p>Score: {score}</p>
        
        <div className="modal-input">
          <label htmlFor="playerName">Your Name:</label>
          <input 
            type="text" 
            id="playerName" 
            value={playerName} 
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
          />
        </div>
        
        <div className="modal-buttons">
          <button className="btn" onClick={onRestart}>Play Again</button>
          <button 
            className="btn btn-secondary" 
            onClick={handleSaveResult} 
            disabled={isSaving || !playerName.trim()}
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
            <th>Name</th>
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
              <td>{entry.playerName || "Anonymous"}</td>
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
  
  // New state variables
  const [volume, setVolume] = useState(0.7);
  const [cardTheme, setCardTheme] = useState('crypto');
  const [showSettings, setShowSettings] = useState(false);
  const [effects, setEffects] = useState([]);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  
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
  const boardRef = useRef(null);

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
    const selectedCards = [...cardThemes[cardTheme]].slice(0, pairCount);
    
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
    setStreak(0);
    setHintUsed(false);
    
    // Clear timer if it exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Update sound volumes
    updateSoundVolumes();
  }, [difficulty, cardTheme]);

  // Initialize game on mount and when difficulty or theme changes
  useEffect(() => {
    initializeGame();
  }, [difficulty, cardTheme, initializeGame]);

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

  // Update sound volumes when volume changes
  const updateSoundVolumes = () => {
    Object.values(sounds).forEach(sound => {
      sound.volume = volume;
    });
  };

  useEffect(() => {
    updateSoundVolumes();
  }, [volume]);

  // Play background music
  useEffect(() => {
    if (isActive && !gameComplete) {
      sounds.background.loop = true;
      sounds.background.play().catch(e => console.log("Audio play prevented:", e));
    } else {
      sounds.background.pause();
    }
    
    return () => {
      sounds.background.pause();
    };
  }, [isActive, gameComplete]);

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
    sounds.flip.play().catch(e => console.log("Audio play prevented:", e));
    
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
          sounds.match.play().catch(e => console.log("Audio play prevented:", e));
          setMatchedPairs(prev => [...prev, cards[firstCardIndex].id]);
          
          // Add match effect
          if (boardRef.current) {
            const rect = boardRef.current.getBoundingClientRect();
            const cardRect = boardRef.current.children[firstCardIndex].getBoundingClientRect();
            
            setEffects(prev => [
              ...prev,
              {
                id: Date.now(),
                type: 'match',
                position: {
                  x: cardRect.left - rect.left + cardRect.width / 2,
                  y: cardRect.top - rect.top + cardRect.height / 2
                }
              }
            ]);
          }
          
          // Increment streak
          setStreak(prev => {
            const newStreak = prev + 1;
            // Update highest streak if current streak is higher
            if (newStreak > highestStreak) {
              setHighestStreak(newStreak);
            }
            return newStreak;
          });
        }, 500);
        
        // Reset flipped indices
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          sounds.error.play().catch(e => console.log("Audio play prevented:", e));
          setFlippedIndices([]);
          // Reset streak on mismatch
          setStreak(0);
        }, 1000);
      }
    }
  };

  // Show hint
  const showCardHint = () => {
    if (hintUsed || matchedPairs.length === cards.length / 2) {
      return;
    }
    
    setHintUsed(true);
    setShowHint(true);
    
    // Find unmatched cards
    const unmatchedCardIds = [...new Set(cards
      .filter(card => !matchedPairs.includes(card.id))
      .map(card => card.id))];
    
    // Select a random unmatched card
    const randomCardId = unmatchedCardIds[Math.floor(Math.random() * unmatchedCardIds.length)];
    
    // Find indices of the pair
    const pairIndices = cards
      .map((card, index) => card.id === randomCardId ? index : -1)
      .filter(index => index !== -1);
    
    // Temporarily flip the cards
    setFlippedIndices(pairIndices);
    
    // Hide the hint after 2 seconds
    setTimeout(() => {
      setFlippedIndices([]);
      setShowHint(false);
    }, 2000);
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
      const leaderboardData = await contract.getLeaderboard();
      
      // Convert BigNumber values to regular numbers
      const formattedLeaderboard = leaderboardData.map(entry => ({
        player: entry.player,
        score: entry.score.toNumber(),
        time: entry.time.toNumber(),
        moves: entry.moves.toNumber(),
        difficulty: entry.difficulty.toNumber(),
        timestamp: entry.timestamp.toNumber(),
        playerName: entry.playerName
      }));
      
      setLeaderboard(formattedLeaderboard);
      setIsLoadingLeaderboard(false);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
      setIsLoadingLeaderboard(false);
    }
  };

  // Save game result to blockchain
  const saveGameResult = async (playerName) => {
    if (!contract || !account) {
      alert("Please connect your wallet first!");
      return;
    }
    
    setIsSavingResult(true);
    
    try {
      // Calculate score
      const score = calculateScore(time, moves, difficulty);
      
      // Call the contract to save the result
      const tx = await contract.saveGameResult(
        score,
        time,
        moves,
        difficulty,
        playerName
      );
      
      // Wait for transaction to be mined
      await tx.wait();
      
      // Update the local leaderboard
      const updatedLeaderboard = await contract.getLeaderboard();
      setLeaderboard(updatedLeaderboard.map(entry => ({
        player: entry.player,
        score: entry.score.toNumber(),
        time: entry.time.toNumber(),
        moves: entry.moves.toNumber(),
        difficulty: entry.difficulty.toNumber(),
        timestamp: entry.timestamp.toNumber(),
        playerName: entry.playerName
      })));
      
      setIsSavingResult(false);
      alert("Your score has been saved to the blockchain!");
    } catch (error) {
      console.error("Error saving game result:", error);
      setIsSavingResult(false);
      alert("Error saving your score. Please try again.");
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
      
      <div className="game-controls-top">
        <WalletConnection account={account} onConnect={connectWallet} />
        <button 
          className="settings-btn"
          onClick={() => {
            sounds.button.play().catch(e => console.log("Audio play prevented:", e));
            setShowSettings(!showSettings);
          }}
        >
          ⚙️ Settings
        </button>
      </div>
      
      {showSettings && (
        <Settings 
          volume={volume} 
          onVolumeChange={setVolume}
          onThemeChange={setCardTheme}
          currentTheme={cardTheme}
        />
      )}
      
      <div className="game-controls">
        <div className="difficulty-selector">
          <button 
            className={`difficulty-btn ${difficulty === 0 ? 'active' : ''}`}
            onClick={() => {
              sounds.button.play().catch(e => console.log("Audio play prevented:", e));
              setDifficulty(0);
            }}
          >
            Easy (4x4)
          </button>
          <button 
            className={`difficulty-btn ${difficulty === 1 ? 'active' : ''}`}
            onClick={() => {
              sounds.button.play().catch(e => console.log("Audio play prevented:", e));
              setDifficulty(1);
            }}
          >
            Medium (6x6)
          </button>
          <button 
            className={`difficulty-btn ${difficulty === 2 ? 'active' : ''}`}
            onClick={() => {
              sounds.button.play().catch(e => console.log("Audio play prevented:", e));
              setDifficulty(2);
            }}
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
          <div className="stat">
            <div className="stat-value">{streak}</div>
            <div className="stat-label">Streak</div>
          </div>
        </div>
      </div>
      
      <div className="game-actions">
        <button 
          className="action-btn hint-btn"
          onClick={() => {
            sounds.button.play().catch(e => console.log("Audio play prevented:", e));
            showCardHint();
          }}
          disabled={hintUsed || !isActive || gameComplete}
        >
          💡 Hint
        </button>
        <button 
          className="action-btn restart-btn"
          onClick={() => {
            sounds.button.play().catch(e => console.log("Audio play prevented:", e));
            initializeGame();
          }}
        >
          🔄 Restart
        </button>
      </div>
      
      <div className={`game-board ${getGridClass()}`} ref={boardRef}>
        {cards.map((card, index) => (
          <Card
            key={card.uniqueId}
            card={card}
            isFlipped={flippedIndices.includes(index)}
            isMatched={matchedPairs.includes(card.id)}
            onClick={() => handleCardClick(index)}
          />
        ))}
        
        {effects.map(effect => (
          <SpecialEffects
            key={effect.id}
            type={effect.type}
            position={effect.position}
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
