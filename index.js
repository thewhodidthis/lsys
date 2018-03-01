'use strict';

// L-system calculator
const lsys = (rules = new Map(), axiom = '') => {
  const keys = RegExp(Array.from(rules.keys()).join('|'), 'g');
  const rule = k => rules.get(k);

  // Gets replaced on each call
  let result;

  return () => {
    // Allow for an axiom only first step
    result = result ? result.replace(keys, rule) : axiom;

    return result
  }
};

module.exports = lsys;
