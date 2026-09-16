import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { handleSafeTalkRequest } from "./src/server/safetalkService";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// POST endpoint: /api/safetalk
app.post("/api/safetalk", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await handleSafeTalkRequest(req.body);

    if (result.error) {
      res.status(result.status || 400).json({ error: result.error });
      return;
    }

    res.json(result.data);
  } catch (err: any) {
    console.error("SafeTalk AI endpoint error:", err);
    res.status(500).json({ error: "Đã có lỗi xảy ra từ máy chủ, vui lòng thử lại sau." });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SafeTalk AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
