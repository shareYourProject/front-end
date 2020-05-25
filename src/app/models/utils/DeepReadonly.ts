// inspired by https://gist.github.com/navix/6c25c15e0a2d3cd0e5bce999e0086fc9

export type DeepReadonly<T> =
    T extends Map<infer K, infer V> ? ReadonlyMap<K, V> :
    T extends Array<infer U> ? ReadonlyArray<U> :
    T extends Function ? T :
    (T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]>; } : T);