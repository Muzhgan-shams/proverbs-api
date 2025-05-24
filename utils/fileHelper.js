import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getFilePath(language, isUser = true) {
  const filename = isUser ? `${language}-user.json` : `${language}.json`;
  return path.join(__dirname, '../data', filename);
}

export function loadProverbs(language, isUser = true) {
  const filePath = getFilePath(language, isUser);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function saveProverbs(language, data) {
  const filePath = getFilePath(language, true);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
