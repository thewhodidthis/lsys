const lsys = (rules = new Map(), axiom = '') => {
  const match = RegExp(Array.from(rules.keys()).join('|'), 'g')
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
