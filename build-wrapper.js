// Patch process.stdout before importing blockit-builder
if (!process.stdout.moveCursor) {
    process.stdout.moveCursor = function() {};
}
if (!process.stdout.clearLine) {
    process.stdout.clearLine = function() {};
}
if (!process.stdout.cursorTo) {
    process.stdout.cursorTo = function() {};
}

process.env.FORCE_COLOR = "0";

// Now import and run blockit-builder
import('./node_modules/blockit-builder/blockit.js')
    .then(() => {
        console.log('Build completed successfully');
    })
    .catch(error => {
        console.error('Build failed:', error);
        process.exit(1);
    }); 