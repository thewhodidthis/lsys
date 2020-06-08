## about

No frills [L-system](https://en.wikipedia.org/wiki/L-system) calculator.

## setup

Fetch the latest version from GitHub directly:

```sh
# Contains ES and CJS modules
npm i thewhodidthis/lsys
```

## usage

Initialize with a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of rules, seed with an axiom and call repeatedly to monitor growth. For example,

```js
import lsys from '@thewhodidthis/lsys'

// Algae
const data = new Map([
  ['A', 'AB'],
  ['B', 'A']
])

const seed = ((rules, axiom) => {
  const step = lsys(rules, axiom)

  const tick = function *() {
    while (1) {
      yield step()
    }
  }

  return tick()
})(data, 'A')

seed.next()
```
