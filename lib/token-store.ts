import fs from 'fs';
import path from 'path';

const TOKEN_FILE = path.resolve(process.cwd(), 'auth/token.json');

export interface StoredToken {
  refresh_token: string;
  stored_at: string;
}

export function readStoredToken(): StoredToken | null {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      if (typeof data.refresh_token === 'string') return data as StoredToken;
    }
  } catch {}
  return null;
}

export function writeStoredToken(refreshToken: string): void {
  const dir = path.dirname(TOKEN_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const data: StoredToken = { refresh_token: refreshToken, stored_at: new Date().toISOString() };
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(data, null, 2));
}
