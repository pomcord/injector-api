import { homedir } from 'os';
import { join } from 'path';
import { existsSync, readdirSync } from 'fs';
import { readdir } from 'fs/promises';

const { platform } = process;

type existsSync = typeof existsSync;
export const exists = async (...args: Parameters<existsSync>): Promise<
    ReturnType<existsSync>
> => new Promise((r) => r(existsSync(...args)));


export enum DiscordBranches {
    STABLE = 'stable',
    CANARY = 'canary',
    PTB = 'ptb',
    DEVELOPMENT = 'development'
}

export async function getDiscordPath(branch: DiscordBranches): Promise<string | null> {
    const actualBranch = branch === DiscordBranches.STABLE ? '' : branch;
    let outDir: string;

    /* eslint-disable */
    switch(platform) {
        case 'win32': {
            // Discord names on Windows are case sensitive
            // i.e. Discord, DiscordCanary, etc.

            const capitlizedBranch = `${ actualBranch[0].toUpperCase() }${ actualBranch.substring(1, actualBranch.length) }`;
            outDir = join(process.env.LOCALAPPDATA!, `Discord${ capitlizedBranch }`);
            break;
        }
        case 'darwin': {
            // TODO: i forgot paths
            outDir = join(homedir(), 'Library', 'Application Support', `discord${ actualBranch }`);
            break;
        }
        case 'linux': {
            outDir = join(homedir(), '.config', `discord${ actualBranch }`);
            // flatpack, ew.
            if(!await exists(outDir)) outDir = join(homedir(), '.var', 'app', 'com.discordapp.Discord', 'config', 'discord');
            break;
        }
        default: {
            throw new Error('Invalid operating system being used, failed to locate Discord.');
        }
    }
    /* eslint-enable */

    if(!(await exists(outDir))) return null;
    return outDir;
}

// more optimised to not recreate on each call to getAppPath,
// blah blah doesn't recreate it on each call
const appNumberReplace = (str: string): number => parseFloat(str.replace(/app-/g, '').replace(/\D+/g, ''));
export async function getAppPath(discordPath: string): Promise<string | null> {
    // idk what to name
    let appDirs = await readdir(discordPath);
    appDirs = appDirs.filter((path) => path.startsWith('app') && !path.endsWith('.ico'));

    if(appDirs.length > 1) {
        const appDirName = appDirs.reduce((max, current) => {
            const currentNumber = appNumberReplace(current);
            const maxNumber = appNumberReplace(max);

            return currentNumber > maxNumber ? current : max;
        }, appDirs[0]);

        if(!appDirName) return null;
        return appDirName;
    }

    return appDirs[0];
}

export function getCorePath(appPath: string): string {
    let desktopCoreDir = join(appPath, 'modules');

    // on windows they do some stupid shit where 
    // it's discord_desktop_core_1 or other arbitrary shit
    // so dynamically find it instead.
    if(platform === 'win32') desktopCoreDir = join(
        // bad practice, TOO BAD!
        desktopCoreDir,
        readdirSync(desktopCoreDir).find(f => f.includes('discord_desktop_core'))!
    );

    return join(desktopCoreDir, 'discord_desktop_core');
}