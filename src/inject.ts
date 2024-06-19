import type { ExitFunction, WriteFunction } from '.';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// eslint-disable-next-line valid-jsdoc
/**
 * @param {string} desktopCorePath - The path to Discord's desktop core (discord_desktop_core)
 * @param {string} injectString - The string to inject before we invoke the default core.asar
 * @param {WriteFunction} writeFn - Function to invoke before injecting to the index file.
 * @param {ExitFunction} exitFn - Function to handle exiting.
 * @returns {Promise<void>}
 */
export default async function inject(
    desktopCorePath: string,
    injectString: string,
    writeFn?: WriteFunction,
    exitFn?: ExitFunction
): Promise<void> {
    const coreFile = await readFile(join(desktopCorePath, 'index.js'), { encoding: 'utf-8' });

    if(coreFile.split('\n').length !== 1) {
        if(coreFile.includes('pomcord')) return void writeFn?.(desktopCorePath).then(() => void exitFn?.('reinjected'));
        else return void exitFn?.('already_injected');
    }

    try {
        void writeFn?.(desktopCorePath);
    }
    catch(err) {
        return void exitFn?.('error', err as Error);
    }

    try {
        writeFile(
            join(desktopCorePath, 'index.js'),
            injectString
        );
    }
    catch(err) {
        return void exitFn?.('error', err as Error);
    }

    void exitFn?.('injected');
}