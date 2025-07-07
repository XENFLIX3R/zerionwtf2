export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  if (
    userAgent === '' ||
    userAgent.includes("Roblox") ||
    userAgent.includes("LuaSocket")
  ) {
    return res.status(200).json({ asset: 123456789 });
  }
  return res.status(403).json({ success: false });
}
