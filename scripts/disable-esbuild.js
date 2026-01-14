// Disable esbuild native binding for compatibility with Vercel and other platforms
process.env.ESBUILD_BINARY_PATH = '';
process.env.ESBUILD_PLUGINS = '';

// Use esbuild-wasm instead of native binary
try {
  require.cache[require.resolve('esbuild')] = require.cache[require.resolve('esbuild-wasm')];
} catch (e) {
  // Fallback if esbuild-wasm is not available
}

process.exit(0);
