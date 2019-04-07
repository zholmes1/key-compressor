interface Dictionary<T> {
  [index: string]: T;
}

export default class KeyCompressor {
  private readonly dictionary: Dictionary<string> = {};
  private reversedDictionary: Dictionary<string> = {};

  constructor(dictionary: Dictionary<string>) {
    this.dictionary = dictionary;
    Object.keys(dictionary).forEach(key => {
      this.reversedDictionary[dictionary[key]] = key;
    });
  }

  compress(val: any): any {
    return this.convertAny(val, this.dictionary);
  }

  decompress<T>(val: any): T {
    return this.convertAny(val, this.reversedDictionary);
  }

  private convertAny = (val: any, dictionary: Dictionary<string>): any => {
    if (Array.isArray(val)) {
      return val.map(child => this.convertAny(child, dictionary));
    } else if (typeof val === typeof {}) {
      return this.convertObject(val, dictionary);
    }

    return val;
  };

  private convertObject = (o: Dictionary<any>, dictionary: Dictionary<string>): object => {
    const result: Dictionary<any> = {};

    if (!o) {
      return result;
    }

    Object.keys(o).forEach(key => {
      const decompressedKey = dictionary[key] || key;

      result[decompressedKey] = this.convertAny(o[key], dictionary);
    });
    return result;
  };
}
