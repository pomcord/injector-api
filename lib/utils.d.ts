/// <reference types="node" />
import { existsSync } from 'fs';
type existsSync = typeof existsSync;
export declare const exists: (path: import("fs").PathLike) => Promise<ReturnType<existsSync>>;
export declare const DiscordBranches: {
    readonly STABLE: "stable";
    readonly CANARY: "canary";
    readonly PTB: "ptb";
    readonly DEVELOPMENT: "development";
};
export type DiscordBranches = typeof DiscordBranches;
export declare function getDiscordPath(branch: DiscordBranches[keyof DiscordBranches]): Promise<string | null>;
export declare function getAppPath(discordPath: string): Promise<string | null>;
export declare function getCorePath(appPath: string): string;
export {};
