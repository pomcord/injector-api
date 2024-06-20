export declare const enum CallbackType {
    WRITE = 0,
    EXIT = 1
}
export type Callback<D> = D extends null ? (type: CallbackType) => unknown : (type: CallbackType, data: D) => unknown;
export type ExitFunction = ((state: 'reinjected' | 'already_injected' | 'injected') => Promise<unknown>) & ((state: 'error', error: Error) => Promise<unknown>) & ((state: 'uninjected') => Promise<unknown>);
export type WriteFunction = ((desktopCorePath: string) => Promise<unknown>);
export { default as inject } from './inject';
export { default as uninject } from './uninject';
export * from './utils';
