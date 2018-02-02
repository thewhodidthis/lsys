const lsys = (rules = new Map(), axiom = '') => {
  let next = ''

  return () => {
    next = next.length ? next.split('').map(v => rules.get(v) || v).join('') : axiom

    return next
  }
}

export default lsys
