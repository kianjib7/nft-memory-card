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
  
  // Initialize sound manager
  init() {
    // Create audio instances
    for (const [key, url] of Object.entries(this.soundUrls)) {
      this.sounds[key] = new Audio(url);
      
      // Set loop for background music
      if (key === 'background') {
        this.sounds[key].loop = true;
      }
      
      // Set initial volume
      this.updateVolume(key);
    }
    
    return this;
  },
  
  // Play a sound
  play(sound) {
    if (!this.sounds[sound]) {
      console.error(`Sound "${sound}" not found`);
      return;
    }
    
    // Check if muted
    if (this.muted.all || (sound === 'background' && this.muted.music) || (sound !== 'background' && this.muted.effects)) {
      return;
    }
    
    // Reset and play
    try {
      this.sounds[sound].currentTime = 0;
      this.sounds[sound].play().catch(error => {
        // Handle autoplay restrictions
        console.warn(`Could not play sound "${sound}":`, error);
      });
    } catch (error) {
      console.error(`Error playing sound "${sound}":`, error);
    }
  },
  
  // Stop a sound
  stop(sound) {
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
  
  // Pause a sound
  pause(sound) {
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
  
  // Update volume for a specific sound
  updateVolume(sound) {
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
  
  // Update all volumes
  updateAllVolumes() {
    for (const sound of Object.keys(this.sounds)) {
      if (this.sounds[sound]) {
        this.updateVolume(sound);
      }
    }
  },
  
  // Set master volume
  setMasterVolume(volume) {
    this.volume.master = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  },
  
  // Set effects volume
  setEffectsVolume(volume) {
    this.volume.effects = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  },
  
  // Set music volume
  setMusicVolume(volume) {
    this.volume.music = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  },
  
  // Toggle mute all
  toggleMuteAll() {
    this.muted.all = !this.muted.all;
    
    if (this.muted.all) {
      // Stop background music if playing
      this.pause('background');
    } else if (!this.muted.music) {
      // Resume background music if not music-muted
      this.play('background');
    }
    
    return this.muted.all;
  },
  
  // Toggle mute effects
  toggleMuteEffects() {
    this.muted.effects = !this.muted.effects;
    return this.muted.effects;
  },
  
  // Toggle mute music
  toggleMuteMusic() {
    this.muted.music = !this.muted.music;
    
    if (this.muted.music) {
      // Stop background music if playing
      this.pause('background');
    } else if (!this.muted.all) {
      // Resume background music if not all-muted
      this.play('background');
    }
    
    return this.muted.music;
  },
  
  // Preload all sounds
  preload() {
    const promises = [];
    
    for (const [key, url] of Object.entries(this.soundUrls)) {
      promises.push(new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => {
          resolve(key);
        }, { once: true });
        audio.addEventListener('error', (error) => {
          console.error(`Error preloading sound "${key}":`, error);
          reject(error);
        });
        audio.src = url;
        audio.load();
      }));
    }
    
    return Promise.all(promises);
  }
};

// Export the sound manager
window.SoundManager = SoundManager; 