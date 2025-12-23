const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;
// 1. Detect where Vite built the files (dist or build)
let buildDir = '';
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  buildDir = 'dist';
} else if (fs.existsSync(path.join(__dirname, 'build'))) {
  buildDir = 'build';
} else {
   console.error("CRITICAL ERROR: No build folder found. Did 'npm run build' run?");
   process.exit(1);
}
const buildPath = path.join(__dirname, buildDir);
console.log(`Success: Serving files from detected folder: ${buildPath}`);
// 2. MIDDLEWARE: This fixes the "Refresh 404" error
// It must come BEFORE express.static
app.use(history());
// 3. Serve the static files (JS, CSS, Images)
app.use(express.static(buildPath));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});