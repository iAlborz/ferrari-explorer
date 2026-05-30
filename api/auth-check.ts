import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAuth } from "./_picker-helpers.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const password = process.env.PICKER_PASSWORD;
  if (!password) {
    return res.status(200).json({ authRequired: false });
  }
  const ok = checkAuth(req);
  return res.status(ok ? 200 : 401).json({ authRequired: true, ok });
}
