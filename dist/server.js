// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
console.log("Server starting at:", (/* @__PURE__ */ new Date()).toISOString());
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
async function startServer() {
  const app = express();
  const PORT = 3e3;
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.use(express.json());
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const isDistFolder = __dirname.endsWith("dist") || __dirname.endsWith("dist/");
  const isProduction = isDistFolder || process.env.NODE_ENV === "production";
  console.log(`Running in ${isProduction ? "production" : "development"} mode. __dirname: ${__dirname}`);
  if (!isProduction) {
    try {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa"
      });
      app.use(vite.middlewares);
      console.log("Vite middleware loaded successfully.");
    } catch (err) {
      console.error("Failed to load Vite middleware:", err);
    }
  } else {
    const distPath = isDistFolder ? __dirname : path.join(__dirname, "dist");
    console.log(`Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
