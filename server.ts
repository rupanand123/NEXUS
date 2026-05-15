import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Example API route for form submission if we want server-side handling
  // For this app, we'll likely use Firebase client SDK for direct submission
  // but having a backend structure ready is part of the request.
  app.post("/api/inquiry", async (req, res) => {
    try {
      const inquiry = req.body;
      console.log("Received inquiry:", inquiry);
      // In a real MERN app, we'd save to DB here. 
      // With Firebase, we can do it client-side or here using firebase-admin.
      res.status(201).json({ message: "Inquiry received" });
    } catch (error) {
      res.status(500).json({ error: "Failed to process inquiry" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server error:", err);
  process.exit(1);
});
