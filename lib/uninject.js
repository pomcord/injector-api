import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
export default async function uninject(desktopCorePath, exitFn, cleanFn) {
    const coreFile = await readFile(join(desktopCorePath, 'index.js'), { encoding: 'utf-8' });
    const splitCore = coreFile.split('\n');
    // we aren't injected.
    if (splitCore.length === 1)
        return void exitFn('wasnt_injected');
    cleanFn?.(desktopCorePath);
    const withoutInserted = splitCore[splitCore.length - 1];
    writeFile(coreFile, withoutInserted);
    void exitFn('uninjected');
}
