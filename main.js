// Helps parse L-system rules.
export default function lsys(rules = new Map(), axiom = "") {
  const keys = RegExp(Array.from(rules.keys()).join("|"), "g")
  const rule = k => rules.get(k)

  // Gets replaced on each call.
  let result

  return () => {
    // Allow for an axiom only first step.
    result = result ? result.replace(keys, rule) : axiom

    return result
  }
}
