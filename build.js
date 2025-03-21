import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to copy directory recursively
const copyDir = (src, dest) => {
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
            try {
                copyFileSync(srcPath, destPath);
                console.log(`Copied: ${srcPath} -> ${destPath}`);
            } catch (error) {
                console.error(`Error copying file ${srcPath}:`, error);
            }
        }
    }
};

// Run the build process
async function build() {
    try {
        console.log('Starting build process...');

        // Run blockit builder using direct module path
        const blockitPath = join(__dirname, 'node_modules', 'blockit-builder', 'blockit.js');
        console.log('Running blockit builder from:', blockitPath);
        
        const result = spawnSync('node', [blockitPath, '--build'], {
            stdio: 'inherit',
            shell: true,
            env: {
                ...process.env,
                NODE_NO_WARNINGS: '1'
            }
        });

        if (result.error) {
            console.error('Blockit builder error:', result.error);
            throw result.error;
        }

        // Define static directories to copy
        const staticDirs = ['assets', 'css', 'js', 'images', 'fonts'];
        const distDir = join(__dirname, 'dist');

        // Ensure dist directory exists
        mkdirSync(distDir, { recursive: true });

        // Copy static directories
        console.log('Copying static assets...');
        staticDirs.forEach(dir => {
            const srcDir = join(__dirname, dir);
            const destDir = join(distDir, dir);
            console.log(`Copying ${dir}...`);
            copyDir(srcDir, destDir);
        });

        // Copy index.html if it exists in the root
        const indexPath = join(__dirname, 'index.html');
        if (existsSync(indexPath)) {
            copyFileSync(indexPath, join(distDir, 'index.html'));
            console.log('Copied index.html to dist directory');
        }

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build error:', error);
        process.exit(1);
    }
}

build(); 