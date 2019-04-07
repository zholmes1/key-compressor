# key-compressor
A tiny, dependency-free tool that can compress/decompress property keys to save database storage/bandwidth costs. Works with nested objects and arrays too!
```
import KeyCompressor from 'key-compressor'
// const KeyCompressor = require('key-compressor').default

const compressor = new KeyCompressor({
  firstName: 'fn',
  lastName: 'ln',
  age: 'a'
})

const tiny = compressor.compress({ firstName: 'Zach', age: 28 }) 
//  { fn: 'Zach', a: 28 }

const big = compressor.decompress(tiny) 
// { firstName: 'Zach', age: 28 }
```
