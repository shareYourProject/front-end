export namespace ApiUtils {
    type RawedData<T> = T extends Map<infer K, infer V> ? { key: K, value: V }[] : T
  
    export function toRawData<T>(formatedData: T): {[K in keyof T] : RawedData<T[K]> } {
        const rawData: any = {};
        for (const k in formatedData) {
            const source = formatedData[k];
            if (source instanceof Map) {
                rawData[k] = Array.from(source).map(([key, value]) => {return {key, value}});
            } else if (Array.isArray(source)) {
                rawData[k] = [...source];
            } else {
                rawData[k] = source;
            }
        }
        return rawData;
    }
}