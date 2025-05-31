import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';

/**
 * Get the path to the nearest app root directory, determined by the presence of
 * a `package.json` file.
 * @param dirPath - The directory to start searching from. Defaults to the
 * current working directory. Defaults to the current working directory.
 */
export function getProjectRoot(dirPath = process.cwd()) {
  const dirItems = readdirSync(dirPath);
  if (!dirItems.includes('package.json')) {
    const parentDir = dirname(dirPath);
    return getProjectRoot(parentDir);
  }
  return dirPath;
}
