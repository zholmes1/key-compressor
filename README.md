# key-compressor
A tiny, dependency-free tool that can compress/decompress property keys to save database storage/bandwidth costs. Works with nested objects and arrays too!
```
import KeyCompressor from 'key-compressor'

const keyCompressor = new KeyCompressor({
  firstName: 'fn',
  lastName: 'ln',
  age: 'a'
})

const tiny = keyCompressor.compress({ firstName: 'Zach', age: 28 }) 
//  { fn: 'Zach', a: 28 }

const big = keyCompressor.decompress(tiny) 
// { firstName: 'Zach', age: 28 }
```
