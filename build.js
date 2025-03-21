// Custom build script for Vercel deployment
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Override process.stdout.moveCursor to prevent errors
if (!process.stdout.moveCursor) {
    process.stdout.moveCursor = () => {};
}

// Path to the blockit builder script
const blockitPath = join(__dirname, 'node_modules', 'blockit-builder', 'blockit.js');

// Run the build
try {
    const blockitModule = await import(blockitPath);
} catch (error) {
    console.error('Build error:', error);
    process.exit(1);
} 