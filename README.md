## about

No frills [L-system](https://en.wikipedia.org/wiki/L-system) calculator for growing things.

## setup

Load via HTML script tag:

```html
<!-- Just an IIFE namespaced `lsys` -->
<script src="https://thewhodidthis.github.io/lsys/lsys.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/lsys": "https://thewhodidthis.github.io/lsys/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/lsys
```

## usage

Initialize with a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of rules, seed with an axiom and call repeatedly to monitor successive generations:

```html
<script src="https://thewhodidthis.github.io/lsys/lsys.js"></script>
<script>
  // The rules map for modelling Algae.
  // https://en.wikipedia.org/wiki/L-system#Example_1:_Algae
  const data = new Map([
    ["A", "AB"],
    ["B", "A"],
  ])

  const seed = ((rules, axiom) => {
    const step = lsys(rules, axiom)
    const tick = function*() {
      while (1) {
        yield step()
      }
    }

    return tick()
  })(data, "A")

  const results = []

  // Collect the first five generations.
  for (const v of seed) {
    if (results.length > 4) {
      break
    }

    results.push(v)
  }

  console.assert(results.length === 5)
  console.assert(results.pop() === "ABAABABA")
</script>
```
