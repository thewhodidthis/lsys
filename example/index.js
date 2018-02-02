(function () {
'use strict';

var TAU = 2 * Math.PI;

var RAD = 360 / TAU;
var DEG = TAU / 360;

var deg = function (x) { return x * RAD; };

var rad = function (x) { return x * DEG; };

/**
 * Helps covert from polar
 * @module poltocar
 * @param {Number} t - Angle (theta)
 * @param {Number} r - Radius
 * @returns {Object} - Vector like
 * @example
 * poltocar(Math.PI);
 */
var poltocar = function (t, r) {
  if ( t === void 0 ) t = 0;
  if ( r === void 0 ) r = 1;

  return ({
  x: r * Math.cos(t),
  y: r * Math.sin(t)
});
};

var createTaxi = function (target, handler) {
  if ( target === void 0 ) target = {};

  if (!('canvas' in target)) {
    throw Error('Invalid rendering context')
  }

  var draw = typeof handler === 'function' ? handler : function (sx, sy, dx, dy) {
    target.beginPath();
    target.moveTo(sx, sy);
    target.lineTo(dx, dy);
    target.stroke();
  };

  var data = { x: 0, y: 0, angle: 0, trace: true };
  var taxi = {
    get data() {
      return Object.assign({}, data, { angle: deg(data.angle) })
    }
  };

  taxi.goto = function (x, y) {
    if ( x === void 0 ) x = data.x;
    if ( y === void 0 ) y = data.y;

    data.x = x;
    data.y = y;

    return taxi
  };

  taxi.mask = taxi.pu = function () {
    data.trace = false;

    return taxi
  };

  taxi.tail = taxi.pd = function () {
    data.trace = true;

    return taxi
  };

  taxi.turn = taxi.lt = function (a) {
    if ( a === void 0 ) a = 0;

    data.angle += rad(a);

    return taxi
  };

  taxi.move = taxi.fd = function (r) {
    var step = poltocar(data.angle, r || 0);

    var x = data.x + step.x;
    var y = data.y - step.y;

    if (data.trace) {
      draw(data.x, data.y, x, y);
    }

    return taxi.goto(x, y)
  };

  taxi.rt = function (v) { return taxi.lt(-v); };
  taxi.bk = function (v) { return taxi.fd(-v); };

  return taxi
};

var lsys = function (rules, axiom) {
  if ( rules === void 0 ) rules = new Map();
  if ( axiom === void 0 ) axiom = '';

  var next = '';

  return function () {
    next = next.length ? next.split('').map(function (v) { return rules.get(v) || v; }).join('') : axiom;

    return next
  }
};

var board = document.querySelector('canvas').getContext('2d');

var rules = new Map([
  ['F', 'FF-F-F-F-F-F+F']
]);

var shape = lsys(rules, 'F-F-F-F');
var agent = createTaxi(board).goto(380.5, 159.5);

board.strokeStyle = 'white';

for (var i = 0; i < 4; i += 1) {
  board.clearRect(0, 0, 540, 360);

  var data = shape();

  for (var j = 0, stop = data.length; j < stop; j += 1) {
    var step = data[j];

    switch (step) {
    case 'F':
      agent.move(5);
      break
    case '-':
      agent.lt(90);
      break
    case '+':
      agent.rt(90);
      break
    default:
      break
    }
  }
}

}());

