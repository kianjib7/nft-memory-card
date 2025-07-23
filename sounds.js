// Sound effects manager for the NFT Memory Card Game
const SoundManager = {
  // Sound instances
  sounds: {
    flip: null,
    match: null,
    complete: null,
    button: null,
    background: null
  },
  
  // Sound URLs
  soundUrls: {
    flip: "https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3",
    match: "https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3",
    complete: "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3",
    button: "https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3",
    background: "https://assets.mixkit.co/sfx/preview/mixkit-game-level-music-689.mp3"
  },
  
  // Volume settings
  volume: {
    master: 0.7,
    effects: 0.8,
    music: 0.5
  },
  
  // Mute state
  muted: {
    all: false,
    effects: false,
    music: false
  },
  
  // Ready state
  isReady: false,
  
  // Initialize sound manager
  init() {
    try {
      // Create audio instances
      for (const [key, url] of Object.entries(this.soundUrls)) {
        this.sounds[key] = new Audio(url);
        
        // Set loop for background music
        if (key === 'background') {
          this.sounds[key].loop = true;
        }
        
        // Set initial volume
        this.updateVolume(key);
        
        // Add error event listener
        this.sounds[key].addEventListener('error', (e) => {
          console.error(`Error loading sound "${key}":`, e);
        });
      }
      
      this.isReady = true;
      return this;
    } catch (error) {
      console.error("Failed to initialize sound manager:", error);
      this.isReady = false;
      return this;
    }
  },
  
  /**
   * Check if the browser supports audio
   * @returns {boolean} True if audio is supported
   */
  isAudioSupported() {
    return typeof Audio !== 'undefined';
  },
  
  /**
   * Play a sound
   * @param {string} sound - The sound to play
   * @returns {Promise} A promise that resolves when the sound starts playing or rejects on error
   */
  play(sound) {
    if (!this.isReady) {
      console.warn("Sound manager not ready. Call init() first.");
      return Promise.reject(new Error("Sound manager not ready"));
    }
    
    if (!this.sounds[sound]) {
      console.error(`Sound "${sound}" not found`);
      return Promise.reject(new Error(`Sound "${sound}" not found`));
    }
    
    // Check if muted
    if (this.muted.all || (sound === 'background' && this.muted.music) || (sound !== 'background' && this.muted.effects)) {
      return Promise.resolve();
    }
    
    // Reset and play
    try {
      this.sounds[sound].currentTime = 0;
      return this.sounds[sound].play().catch(error => {
        // Handle autoplay restrictions
        console.warn(`Could not play sound "${sound}":`, error);
        return Promise.reject(error);
      });
    } catch (error) {
      console.error(`Error playing sound "${sound}":`, error);
      return Promise.reject(error);
    }
  },
  
  /**
   * Stop a sound
   * @param {string} sound - The sound to stop
   */
  stop(sound) {
    if (!this.isReady) {
      console.warn("Sound manager not ready. Call init() first.");
      return;
    }
    
    if (!this.sounds[sound]) {
      console.error(`Sound "${sound}" not found`);
      return;
    }
    
    try {
      this.sounds[sound].pause();
      this.sounds[sound].currentTime = 0;
    } catch (error) {
      console.error(`Error stopping sound "${sound}":`, error);
    }
  },
  
  /**
   * Pause a sound
   * @param {string} sound - The sound to pause
   */
  pause(sound) {
    if (!this.isReady) {
      console.warn("Sound manager not ready. Call init() first.");
      return;
    }
    
    if (!this.sounds[sound]) {
      console.error(`Sound "${sound}" not found`);
      return;
    }
    
    try {
      this.sounds[sound].pause();
    } catch (error) {
      console.error(`Error pausing sound "${sound}":`, error);
    }
  },
  
  /**
   * Update volume for a specific sound
   * @param {string} sound - The sound to update volume for
   */
  updateVolume(sound) {
    if (!this.isReady) {
      console.warn("Sound manager not ready. Call init() first.");
      return;
    }
    
    if (!this.sounds[sound]) {
      console.error(`Sound "${sound}" not found`);
      return;
    }
    
    // Calculate volume based on master and type
    let volume = this.volume.master;
    if (sound === 'background') {
      volume *= this.volume.music;
    } else {
      volume *= this.volume.effects;
    }
    
    // Apply volume
    this.sounds[sound].volume = volume;
  },
  
  /**
   * Update all volumes
   */
  updateAllVolumes() {
    if (!this.isReady) {
      console.warn("Sound manager not ready. Call init() first.");
      return;
    }
    
    for (const sound of Object.keys(this.sounds)) {
      if (this.sounds[sound]) {
        this.updateVolume(sound);
      }
    }
  },
  
  /**
   * Set master volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setMasterVolume(volume) {
    this.volume.master = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    
    // Save to local storage for persistence
    try {
      localStorage.setItem('soundSettings', JSON.stringify(this.volume));
    } catch (e) {
      console.warn("Could not save sound settings to local storage:", e);
    }
  },
  
  /**
   * Set effects volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setEffectsVolume(volume) {
    this.volume.effects = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    
    // Save to local storage for persistence
    try {
      localStorage.setItem('soundSettings', JSON.stringify(this.volume));
    } catch (e) {
      console.warn("Could not save sound settings to local storage:", e);
    }
  },
  
  /**
   * Set music volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setMusicVolume(volume) {
    this.volume.music = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
    
    // Save to local storage for persistence
    try {
      localStorage.setItem('soundSettings', JSON.stringify(this.volume));
    } catch (e) {
      console.warn("Could not save sound settings to local storage:", e);
    }
  },
  
  /**
   * Toggle mute all sounds
   * @returns {boolean} New mute state
   */
  toggleMuteAll() {
    this.muted.all = !this.muted.all;
    
    if (this.muted.all) {
      // Stop background music if playing
      this.pause('background');
    } else if (!this.muted.music) {
      // Resume background music if not music-muted
      this.play('background');
    }
    
    // Save to local storage for persistence
    try {
      localStorage.setItem('soundMuted', JSON.stringify(this.muted));
    } catch (e) {
      console.warn("Could not save sound mute settings to local storage:", e);
    }
    
    return this.muted.all;
  },
  
  /**
   * Toggle mute effects
   * @returns {boolean} New mute state
   */
  toggleMuteEffects() {
    this.muted.effects = !this.muted.effects;
    
    // Save to local storage for persistence
    try {
      localStorage.setItem('soundMuted', JSON.stringify(this.muted));
    } catch (e) {
      console.warn("Could not save sound mute settings to local storage:", e);
    }
    
    return this.muted.effects;
  },
  
  /**
   * Toggle mute music
   * @returns {boolean} New mute state
   */
  toggleMuteMusic() {
    this.muted.music = !this.muted.music;
    
    if (this.muted.music) {
      // Stop background music if playing
      this.pause('background');
    } else if (!this.muted.all) {
      // Resume background music if not all-muted
      this.play('background');
    }
    
    // Save to local storage for persistence
    try {
      localStorage.setItem('soundMuted', JSON.stringify(this.muted));
    } catch (e) {
      console.warn("Could not save sound mute settings to local storage:", e);
    }
    
    return this.muted.music;
  },
  
  /**
   * Load settings from local storage
   */
  loadSettings() {
    try {
      // Load volume settings
      const savedVolume = localStorage.getItem('soundSettings');
      if (savedVolume) {
        const parsedVolume = JSON.parse(savedVolume);
        this.volume = { ...this.volume, ...parsedVolume };
      }
      
      // Load mute settings
      const savedMuted = localStorage.getItem('soundMuted');
      if (savedMuted) {
        const parsedMuted = JSON.parse(savedMuted);
        this.muted = { ...this.muted, ...parsedMuted };
      }
      
      // Apply settings
      this.updateAllVolumes();
    } catch (e) {
      console.warn("Could not load sound settings from local storage:", e);
    }
  },
  
  /**
   * Preload all sounds
   * @returns {Promise} A promise that resolves when all sounds are loaded
   */
  preload() {
    if (!this.isAudioSupported()) {
      return Promise.reject(new Error("Audio not supported in this browser"));
    }
    
    const promises = [];
    
    for (const [key, url] of Object.entries(this.soundUrls)) {
      promises.push(new Promise((resolve, reject) => {
        const audio = new Audio();
        
        // Set up event listeners
        audio.addEventListener('canplaythrough', () => {
          // Replace the existing sound with the preloaded one
          if (this.sounds[key]) {
            // Copy properties from old sound
            audio.volume = this.sounds[key].volume;
            audio.loop = this.sounds[key].loop;
          }
          this.sounds[key] = audio;
          resolve(key);
        }, { once: true });
        
        audio.addEventListener('error', (error) => {
          console.error(`Error preloading sound "${key}":`, error);
          reject(error);
        });
        
        // Start loading
        audio.preload = 'auto';
        audio.src = url;
        audio.load();
      }));
    }
    
    return Promise.all(promises)
      .then(() => {
        console.log("All sounds preloaded successfully");
        this.isReady = true;
        return true;
      })
      .catch((error) => {
        console.error("Failed to preload all sounds:", error);
        return false;
      });
  }
};

// Initialize with settings from local storage
document.addEventListener('DOMContentLoaded', () => {
  if (SoundManager.isAudioSupported()) {
    SoundManager.init();
    SoundManager.loadSettings();
    
    // Preload sounds in background
    SoundManager.preload().then(() => {
      console.log("Sound manager ready");
    }).catch(error => {
      console.warn("Sound preloading failed:", error);
    });
  } else {
    console.warn("Audio not supported in this browser");
  }
});

// Export the sound manager
window.SoundManager = SoundManager; 
