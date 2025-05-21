import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getFilePath(language, isUser = true) {
  const filename = isUser ? `${language}-user.json` : `${language}.json`;
  return path.join(__dirname, '../data', filename);
}

export async function loadProverbs(language, isUser = true) {
  const filePath = getFilePath(language, isUser);
  try {
    await fs.access(filePath);
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function saveProverbs(language, data) {
  const filePath = getFilePath(language, true);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
