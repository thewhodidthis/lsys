> No frills L-system calculator

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/lsys
```

### Usage
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
