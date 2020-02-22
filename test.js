'use strict'

const { equal } = require('tapeless')
const lsys = require('./')

equal
  .describe('got lambda on init', 'will default')
  .test(typeof lsys(), 'function')
  .describe('got string on call')
  .test(typeof lsys()(), 'string')
  .test(lsys()().length, 0)

// Data from https://en.wikipedia.org/wiki/L-system
const systems = [
  {
    title: 'Algae',
    axiom: 'A',
    rules: new Map([
      ['A', 'AB'],
      ['B', 'A']
    ]),
    fruit: [
      'A',
      'AB',
      'ABA',
      'ABAAB'
    ]
  },
  {
    title: 'Py tree',
    axiom: '0',
    rules: new Map([
      ['1', '11'],
      ['0', '1[0]0']
    ]),
    fruit: [
      '0',
      '1[0]0',
      '11[1[0]0]1[0]0',
      '1111[11[1[0]0]1[0]0]11[1[0]0]1[0]0'
    ]
  },
  {
    title: 'Koch curve',
    axiom: 'F',
    rules: new Map([
      ['F', 'F+F−F−F+F']
    ]),
    fruit: [
      'F',
      'F+F−F−F+F',
      'F+F−F−F+F+F+F−F−F+F−F+F−F−F+F−F+F−F−F+F+F+F−F−F+F'
    ]
  }
]

systems.forEach(({ rules, axiom, fruit, title }) => {
  const sys = lsys(rules, axiom)

  fruit.forEach((str, j) => {
    equal
      .describe(null, j ? undefined : `will compute (${title})`)
      .test(sys(), str)
  })
})
