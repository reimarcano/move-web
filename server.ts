import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

console.log('Server starting at:', new Date().toISOString());

// Global error handlers to prevent silent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Health check route for Cloud Run
  app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use(express.json());

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Determine if we are running the built server from the dist folder
  const isDistFolder = __dirname.endsWith('dist') || __dirname.endsWith('dist/');
  const isProduction = isDistFolder || process.env.NODE_ENV === 'production';

  console.log(`Running in ${isProduction ? 'production' : 'development'} mode. __dirname: ${__dirname}`);

  // Vite middleware for development
  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite middleware loaded successfully.');
    } catch (err) {
      console.error('Failed to load Vite middleware:', err);
    }
  } else {
    // In production, server.js is in the dist folder, so __dirname is already dist/
    const distPath = isDistFolder ? __dirname : path.join(__dirname, 'dist');
    console.log(`Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
