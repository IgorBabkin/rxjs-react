import { Observable } from 'rxjs';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type PropertyNames<T, TExtend> = { [K in keyof T]: T[K] extends TExtend ? K : never }[keyof T];
export type NonPropertyNames<T, TExtend> = { [K in keyof T]: T[K] extends TExtend ? never : K }[keyof T];

export type UnpackedObservable<T> =
    T extends (...args: any[]) => Observable<infer U> ? U :
    T extends Observable<infer U> ? U :
    T;

export type UnPackedProperties<T, TExtend> = {
    readonly [P in PropertyNames<T, TExtend>]: UnpackedObservable<T[P]>
};

export type UnBox<T, TExtend> = Omit<T, PropertyNames<T, TExtend>> & UnPackedProperties<T, TExtend>;

export type UnObservable<T> = UnBox<T, Observable<any>>;
export type IDictionary<T> = {
    [key: string]: T;
};
