// Custom build script for Vercel deployment
const { spawn } = require('child_process');
const path = require('path');

// Override process.stdout.moveCursor to prevent errors
if (!process.stdout.moveCursor) {
    process.stdout.moveCursor = () => {};
}

// Path to the blockit builder script
const blockitPath = path.join(__dirname, 'node_modules', 'blockit-builder', 'blockit.js');

// Run the build
try {
    require(blockitPath);
} catch (error) {
    console.error('Build error:', error);
    process.exit(1);
} 