import { handleSafeTalkRequest } from "../src/server/safetalkService";

export default async function handler(req: any, res: any) {
  // CORS Headers for cross-origin or same-origin requests
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    if (typeof res.status === "function") {
      res.status(200).end();
    } else {
      res.statusCode = 200;
      res.end();
    }
    return;
  }

  // Only allow POST
  if (req.method !== "POST") {
    const errorPayload = { error: "Method Not Allowed. Only POST is supported." };
    if (typeof res.status === "function" && typeof res.json === "function") {
      res.status(405).json(errorPayload);
    } else {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(errorPayload));
    }
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // keep body as-is if parsing fails
      }
    }

    const result = await handleSafeTalkRequest(body || {});

    if (result.error) {
      const status = result.status || 400;
      if (typeof res.status === "function" && typeof res.json === "function") {
        res.status(status).json({ error: result.error });
      } else {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: result.error }));
      }
      return;
    }

    if (typeof res.status === "function" && typeof res.json === "function") {
      res.status(200).json(result.data);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result.data));
    }
  } catch (err: any) {
    console.error("Vercel Serverless Function Error:", err);
    const errorPayload = { error: "Đã có lỗi xảy ra từ máy chủ, vui lòng thử lại sau." };
    if (typeof res.status === "function" && typeof res.json === "function") {
      res.status(500).json(errorPayload);
    } else {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(errorPayload));
    }
  }
}
