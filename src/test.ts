import KeyCompressor from './index';
import { expect } from 'chai'

const keyCompressor = new KeyCompressor({
  firstName: 'fn',
  lastName: 'ln',
  age: 'a',
  cat: 'c',
});

describe('KeyCompressor', () => {
  describe('when compressing', () => {
    describe('an object', () => {
      it('compresses correctly', () => {
        const compressed = keyCompressor.compress({
          firstName: 'John',
          lastName: 'Doe',
          age: 28,
          cat: {
            firstName: 'Tux',
          },
        });

        expect(compressed).to.deep.equal({
          fn: 'John',
          ln: 'Doe',
          a: 28,
          c: {
            fn: 'Tux',
          },
        });
      });

      it('preserves keys not in dictionary', () => {
        const compressed = keyCompressor.compress({
          age: 28,
          otherKey: 'val',
        });

        expect(compressed).to.deep.equal({
          a: 28,
          otherKey: 'val',
        });
      });
    });

    describe('an array', () => {
      it('compresses correctly', () => {
        const raw = [
          {
            firstName: 'John',
            lastName: 'Doe',
            age: 28,
          },
          {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 28,
          },
        ];

        const compressed = keyCompressor.compress(raw);

        expect(compressed).to.deep.equal([
          {
            fn: 'John',
            ln: 'Doe',
            a: 28,
          },
          {
            fn: 'Jane',
            ln: 'Doe',
            a: 28,
          },
        ]);
      });
    });

    describe('a string', () => {
      it('does nothing', () => {
        const compressed = keyCompressor.compress('Hello, world!');

        expect(compressed).to.deep.equal('Hello, world!');
      });
    });
  });

  describe('when decompressing', () => {
    describe('an object', () => {
      it('decompresses correctly', () => {
        const decompressed = keyCompressor.decompress({
          fn: 'John',
          ln: 'Doe',
          a: 28,
          c: {
            fn: 'Tux',
          },
        });

        expect(decompressed).to.deep.equal({
          firstName: 'John',
          lastName: 'Doe',
          age: 28,
          cat: {
            firstName: 'Tux',
          },
        });
      });

      it('preserves keys not in dictionary', () => {
        const decompressed = keyCompressor.decompress({
          a: 28,
          otherKey: 'val',
        });

        expect(decompressed).to.deep.equal({
          age: 28,
          otherKey: 'val',
        });
      });
    });

    describe('an array', () => {
      it('compresses correctly', () => {
        const decompressed = keyCompressor.decompress([
          {
            fn: 'John',
            ln: 'Doe',
            a: 28,
          },
          {
            fn: 'Jane',
            ln: 'Doe',
            a: 28,
          },
        ]);

        expect(decompressed).to.deep.equal([
          {
            firstName: 'John',
            lastName: 'Doe',
            age: 28,
          },
          {
            firstName: 'Jane',
            lastName: 'Doe',
            age: 28,
          },
        ]);
      });
    });

    describe('a string', () => {
      it('does nothing', () => {
        const decompressed = keyCompressor.decompress('Hello, world!');

        expect(decompressed).to.deep.equal('Hello, world!');
      });
    });
  });
});
