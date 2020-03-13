export interface EntityProvider<T> {
    get(): T;

    set(value: T): void;
}

export const entityProvider = <T>(v: T) => {
    let value: T = v;

    return {
        get: () => value,
        set: (newValue: T) => value = newValue,
    };
};
