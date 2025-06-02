import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const filePath = path.join(process.cwd(), 'whitelisted.json');

  let data = [];
  try {
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    data = JSON.parse(fileData);
  } catch (err) {
    console.error('Failed to read whitelist:', err);
  }

  if (data.includes(username)) {
    return res.status(409).json({ error: 'Username already whitelisted' });
  }

  data.push(username);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true, message: `${username} has been whitelisted.` });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save username' });
  }
}
