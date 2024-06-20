import type { ExitFunction, WriteFunction } from '.';
export default function uninject(desktopCorePath: string, exitFn: ExitFunction, cleanFn?: WriteFunction): Promise<void>;
