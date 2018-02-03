const lsys = (rules = new Map(), axiom = '') => {
  const keys = []

  for (const k of rules.keys()) {
    keys.push(k)
  }

  const match = RegExp(keys.join('|'), 'g')
  const plant = k => rules.get(k)

  let memo = axiom
  let next = ''

  return () => {
    // Allow for an axiom only first step
    next = memo
    memo = next.replace(match, plant)

    return next
  }
}

export default lsys
