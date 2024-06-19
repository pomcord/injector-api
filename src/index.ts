export const enum CallbackType {
    WRITE,
    EXIT
}

export type Callback<D> = D extends null ?
    (type: CallbackType) => unknown :
    (type: CallbackType, data: D) => unknown;