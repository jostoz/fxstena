// Custom build script for Vercel deployment
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Override process.stdout.moveCursor to prevent errors
if (!process.stdout.moveCursor) {
    process.stdout.moveCursor = () => {};
}

// Function to copy directory recursively
const copyDir = (src, dest) => {
    try {
        if (!existsSync(src)) {
            console.log(`Directory ${src} does not exist, skipping...`);
            return;
        }

        mkdirSync(dest, { recursive: true });
        const entries = readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = join(src, entry.name);
            const destPath = join(dest, entry.name);

            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                copyFileSync(srcPath, destPath);
            }
        }
        console.log(`Successfully copied ${src} to ${dest}`);
    } catch (error) {
        console.error(`Error copying directory ${src}:`, error);
    }
};

// Path to the blockit builder script
const blockitPath = join(__dirname, 'node_modules', 'blockit-builder', 'blockit.js');

// Run the build
try {
    console.log('Starting build process...');
    
    // First run the blockit builder
    const blockitModule = await import(blockitPath);
    
    console.log('Blockit build completed, copying static assets...');

    // Then ensure all static assets are copied
    const staticDirs = ['assets', 'css', 'js', 'images', 'fonts'];
    const distDir = join(__dirname, 'dist');

    // Create dist directory if it doesn't exist
    if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
    }

    // Copy each static directory
    staticDirs.forEach(dir => {
        const srcDir = join(__dirname, dir);
        const destDir = join(distDir, dir);
        copyDir(srcDir, destDir);
    });

    console.log('Build completed successfully!');
} catch (error) {
    console.error('Build error:', error);
    process.exit(1);
} 