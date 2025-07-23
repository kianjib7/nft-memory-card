// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Import correct OpenZeppelin v4 contracts
import "@openzeppelin/contracts@4.9.3/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.3/utils/Counters.sol";
import "@openzeppelin/contracts@4.9.3/metatx/ERC2771Context.sol";

/**
 * @title MemoryGame
 * @dev A contract for NFT Memory Card Game with leaderboard functionality
 */
contract MemoryGame is ERC721URIStorage, Ownable, ERC2771Context {
    using Counters for Counters.Counter;
    
    // Token ID counter
    Counters.Counter private _tokenIdCounter;
    
    // Trusted forwarder for gasless transactions
    address private immutable _trustedForwarder;
    
    // Base URI for NFT metadata
    string private _baseTokenURI;
    
    // Game result structure
    struct GameResult {
        address player;
        uint256 score;
        uint256 time;
        uint256 moves;
        uint256 difficulty;
        uint256 timestamp;
    }
    
    // Mapping from player to their game results
    mapping(address => GameResult[]) private _playerResults;
    
    // Array to store all game results for leaderboard
    GameResult[] private _leaderboard;
    
    // Mapping from token ID to rarity (0: Common, 1: Rare, 2: Epic, 3: Legendary)
    mapping(uint256 => uint8) private _tokenRarity;
    
    // Mapping from token ID to card theme
    mapping(uint256 => string) private _tokenTheme;
    
    // Mapping from player to their NFT collection
    mapping(address => uint256[]) private _playerNFTs;
    
    // Events
    event GameResultSaved(address indexed player, uint256 score, uint256 time, uint256 moves, uint256 difficulty);
    event NFTMinted(address indexed player, uint256 indexed tokenId, uint8 rarity, string theme);
    
    // Constants
    uint256 private constant LEADERBOARD_LIMIT = 100;
    
    /**
     * @dev Constructor
     * @param name The name of the NFT collection
     * @param symbol The symbol of the NFT collection
     * @param baseURI The base URI for NFT metadata
     * @param trustedForwarder Address of the trusted forwarder for gasless transactions
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        address trustedForwarder
    ) ERC721(name, symbol) ERC2771Context(trustedForwarder) {
        _baseTokenURI = baseURI;
        _trustedForwarder = trustedForwarder;
        // No need to call Ownable constructor in v4.x
    }
    
    /**
     * @dev Save a game result to the blockchain
     * @param score The player's score
     * @param time The time taken to complete the game (in seconds)
     * @param moves The number of moves taken
     * @param difficulty The difficulty level (0: Easy, 1: Medium, 2: Hard)
     */
    function saveGameResult(
        uint256 score,
        uint256 time,
        uint256 moves,
        uint256 difficulty
    ) external {
        address player = _msgSender();
        
        // Create game result
        GameResult memory result = GameResult({
            player: player,
            score: score,
            time: time,
            moves: moves,
            difficulty: difficulty,
            timestamp: block.timestamp
        });
        
        // Add to player's results
        _playerResults[player].push(result);
        
        // Add to leaderboard
        _addToLeaderboard(result);
        
        // Check if player should receive an NFT reward
        _checkAndRewardNFT(player, score, difficulty);
        
        // Emit event
        emit GameResultSaved(player, score, time, moves, difficulty);
    }
    
    /**
     * @dev Add a game result to the leaderboard, maintaining order by score
     * @param result The game result to add
     */
    function _addToLeaderboard(GameResult memory result) private {
        // If leaderboard is empty, just add the result
        if (_leaderboard.length == 0) {
            _leaderboard.push(result);
            return;
        }
        
        // Find the position to insert the result (sorted by score, descending)
        uint256 i;
        for (i = 0; i < _leaderboard.length; i++) {
            if (result.score > _leaderboard[i].score) {
                break;
            }
        }
        
        // If leaderboard is not full, expand it
        if (_leaderboard.length < LEADERBOARD_LIMIT) {
            _leaderboard.push(GameResult({
                player: address(0),
                score: 0,
                time: 0,
                moves: 0,
                difficulty: 0,
                timestamp: 0
            }));
        }
        
        // Shift elements to make space for the new result
        if (i < LEADERBOARD_LIMIT) {
            for (uint256 j = _leaderboard.length > LEADERBOARD_LIMIT ? LEADERBOARD_LIMIT - 1 : _leaderboard.length - 1; j > i; j--) {
                _leaderboard[j] = _leaderboard[j - 1];
            }
            
            // Insert the new result
            _leaderboard[i] = result;
        }
    }
    
    /**
     * @dev Check if player should receive an NFT reward and mint it if eligible
     * @param player The player's address
     * @param score The player's score
     * @param difficulty The difficulty level
     */
    function _checkAndRewardNFT(address player, uint256 score, uint256 difficulty) private {
        // Define score thresholds for different difficulties
        uint256[3] memory thresholds = [uint256(7000), uint256(8000), uint256(9000)]; // Easy, Medium, Hard
        
        // Check if score exceeds threshold for the difficulty
        if (score >= (thresholds[difficulty] * 13) / 10) {
            // Determine rarity based on score and difficulty
            uint8 rarity;
            string memory theme = "crypto"; // Default theme
            
            // Use integer arithmetic instead of floating point
            if (score >= (thresholds[difficulty] * 13) / 10) {
                rarity = 3; // Legendary
            } else if (score >= (thresholds[difficulty] * 12) / 10) {
                rarity = 2; // Epic
            } else if (score >= (thresholds[difficulty] * 11) / 10) {
                rarity = 1; // Rare
            } else {
                rarity = 0; // Common
            }
            
            // Mint NFT
            _mintNFT(player, rarity, theme);
        }
    }
    
    /**
     * @dev Mint an NFT for a player
     * @param player The player's address
     * @param rarity The rarity of the NFT
     * @param theme The theme of the NFT
     */
    function _mintNFT(address player, uint8 rarity, string memory theme) private {
        // Get the next token ID
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        // Mint the NFT
        _safeMint(player, tokenId);
        
        // Set token metadata
        _tokenRarity[tokenId] = rarity;
        _tokenTheme[tokenId] = theme;
        
        // Set token URI based on rarity and theme
        string memory rarityStr;
        if (rarity == 0) rarityStr = "common";
        else if (rarity == 1) rarityStr = "rare";
        else if (rarity == 2) rarityStr = "epic";
        else rarityStr = "legendary";
        
        string memory tokenURI = string(abi.encodePacked(
            _baseTokenURI,
            "/",
            theme,
            "/",
            rarityStr,
            "/",
            _toString(tokenId)
        ));
        _setTokenURI(tokenId, tokenURI);
        
        // Add to player's NFT collection
        _playerNFTs[player].push(tokenId);
        
        // Emit event
        emit NFTMinted(player, tokenId, rarity, theme);
    }
    
    /**
     * @dev Allow owner to mint an NFT for a player (for testing or special rewards)
     * @param to The recipient's address
     * @param rarity The rarity of the NFT (0: Common, 1: Rare, 2: Epic, 3: Legendary)
     * @param theme The theme of the NFT
     */
    function mintNFT(address to, uint8 rarity, string memory theme) external onlyOwner {
        _mintNFT(to, rarity, theme);
    }
    
    /**
     * @dev Get the leaderboard
     * @return Array of game results, sorted by score (descending)
     */
    function getLeaderboard() external view returns (GameResult[] memory) {
        // Determine the actual size of the leaderboard (excluding empty entries)
        uint256 size = 0;
        for (uint256 i = 0; i < _leaderboard.length; i++) {
            if (_leaderboard[i].player != address(0)) {
                size++;
            } else {
                break;
            }
        }
        
        // Create a copy of the leaderboard with the actual size
        GameResult[] memory result = new GameResult[](size);
        for (uint256 i = 0; i < size; i++) {
            result[i] = _leaderboard[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get a player's game results
     * @param player The player's address
     * @return Array of the player's game results
     */
    function getPlayerResults(address player) external view returns (GameResult[] memory) {
        return _playerResults[player];
    }
    
    /**
     * @dev Get a player's NFT collection
     * @param player The player's address
     * @return Array of token IDs owned by the player
     */
    function getNFTsOfOwner(address player) external view returns (uint256[] memory) {
        return _playerNFTs[player];
    }
    
    /**
     * @dev Get NFT details
     * @param tokenId The token ID
     * @return rarity The rarity of the NFT
     * @return theme The theme of the NFT
     */
    function getNFTDetails(uint256 tokenId) external view returns (uint8 rarity, string memory theme) {
        require(_exists(tokenId), "NFT does not exist");
        return (_tokenRarity[tokenId], _tokenTheme[tokenId]);
    }
    
    /**
     * @dev Set the base URI for NFT metadata
     * @param baseURI The new base URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev Override base URI for token metadata
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Convert a uint256 to a string
     * @param value The uint256 to convert
     * @return The string representation of the uint256
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        
        uint256 temp = value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }
    
    /**
     * @dev Override for ERC2771Context
     */
    function _msgSender() internal view override(Context, ERC2771Context) returns (address) {
        return ERC2771Context._msgSender();
    }
    
    /**
     * @dev Override for ERC2771Context
     */
    function _msgData() internal view override(Context, ERC2771Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
    
    /**
     * @dev Override for compatibility with OpenZeppelin v4.x
     */
    function _exists(uint256 tokenId) internal view virtual override returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
} 
