interface Dictionary<T> {
    [index: string]: T;
}
export default class KeyCompressor {
    private readonly dictionary;
    private reversedDictionary;
    constructor(dictionary: Dictionary<string>);
    compress(val: any): any;
    decompress<T>(val: any): T;
    private convertAny;
    private convertObject;
}
export {};
