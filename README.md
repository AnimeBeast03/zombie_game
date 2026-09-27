# zombie_game
A DayZ inspired 2d game in development for mobile.



# Panned File Structure

zombie_game/
├── index.html              # Main HTML entry point
├── README.md               # Project documentation
├── style.css               # Global styles and canvas scaling
├── assets/                 # Game assets folder
│   ├── images/             # Sprites, tiles, and UI icons
│   │   ├── player.png
│   │   ├── zombie.png
│   │   └── items/
│   └── audio/              # Sound effects and ambient noise
│       ├── gunshot.mp3
│       └── zombie_groan.mp3
└── js/                     # JavaScript source files
    ├── main.js             # Application entry point (imports and boots the game)
    ├── core/               # Core engine systems
    │   ├── game.js         # Main game loop, state management, and updates
    │   ├── input.js        # Touch and keyboard controls handler
    │   └── camera.js       # Viewport tracking system for following the player
    ├── entities/           # Living objects and items
    │   ├── player.js       # Player stats, movement, and inventory
    │   ├── zombie.js       # Zombie AI, pathfinding, and attack states
    │   └── item.js         # Lootable items, weapons, and gear definitions
    ├── world/              # Environment and map generation
    │   └── map.js          # Tilemap rendering, buildings, and obstacles
    ├── ui/                 # User interface elements
    │   └── hud.js          # Health bars, inventory screen, and mobile joystick overlay
    └── utils/              # Helper functions
        └── collision.js    # Bounding box or circle collision detection algorithms
