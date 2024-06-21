import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
export default async function uninject(desktopCorePath, exitFn, cleanFn) {
    const coreFilePath = join(desktopCorePath, 'index.js');
    const coreFile = await readFile(coreFilePath, { encoding: 'utf-8' });
    const splitCore = coreFile.split('\n');
    // we aren't injected.
    if (splitCore.length === 1)
        return void exitFn('wasnt_injected');
    cleanFn?.(desktopCorePath);
    const withoutInserted = splitCore.splice(splitCore.length - 1, 1);
    await writeFile(coreFilePath, withoutInserted);
    void exitFn('uninjected');
}
