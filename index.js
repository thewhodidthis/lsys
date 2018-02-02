'use strict';

var lsys = function (rules, axiom) {
  if ( rules === void 0 ) rules = new Map();
  if ( axiom === void 0 ) axiom = '';

  var next = '';

  return function () {
    next = next.length ? next.split('').map(function (v) { return rules.get(v) || v; }).join('') : axiom;

    return next
  }
};

module.exports = lsys;

