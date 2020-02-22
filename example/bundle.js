(function () {
  'use strict';

  const TAU = 2 * Math.PI;

  const RAD = 360 / TAU;
  const DEG = TAU / 360;

  // Convert radians to degrees
  const deg = x => x * RAD;

  // Convert degrees to radians
  const rad = x => x * DEG;

  /**
   * Helps covert from polar
   * @module poltocar
   * @param {Number} t - Angle (theta)
   * @param {Number} r - Radius
   * @returns {Object} - Vector like
   * @example
   * poltocar(Math.PI);
   */
  const poltocar = (t = 0, r = 1) => ({
    x: r * Math.cos(t),
    y: r * Math.sin(t)
  });

  // # Taxi
  // Teeny tiny turtle graphics agent

  const createTaxi = (target = {}, handler) => {
    if (!('canvas' in target)) {
      throw Error('Invalid rendering context')
    }

    const draw = typeof handler === 'function' ? handler : (sx, sy, dx, dy) => {
      target.beginPath();
      target.moveTo(sx, sy);
      target.lineTo(dx, dy);
      target.stroke();
    };

    const data = { x: 0, y: 0, angle: 0, trace: true };
    const taxi = {
      get data() {
        return Object.assign({}, data, { angle: deg(data.angle) })
      }
    };

    taxi.goto = (x = data.x, y = data.y) => {
      data.x = x;
      data.y = y;

      return taxi
    };

    taxi.mask = taxi.pu = () => {
      data.trace = false;

      return taxi
    };

    taxi.tail = taxi.pd = () => {
      data.trace = true;

      return taxi
    };

    taxi.turn = taxi.lt = (a = 0) => {
      data.angle += rad(a);

      return taxi
    };

    taxi.move = taxi.fd = (r) => {
      const step = poltocar(data.angle, r || 0);

      const x = data.x + step.x;
      const y = data.y - step.y;

      if (data.trace) {
        draw(data.x, data.y, x, y);
      }

      return taxi.goto(x, y)
    };

    taxi.rt = v => taxi.lt(-v);
    taxi.bk = v => taxi.fd(-v);

    return taxi
  };

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

  const board = document.querySelector('canvas').getContext('2d');

  const rules = new Map([
    ['F', 'FF-F-F-F-F-F+F']
  ]);

  const shape = lsys(rules, 'F-F-F-F');
  const agent = createTaxi(board).goto(380.5, 159.5);

  board.strokeStyle = 'white';

  for (let i = 0; i < 4; i += 1) {
    board.clearRect(0, 0, 540, 360);

    const data = shape();

    for (let j = 0, stop = data.length; j < stop; j += 1) {
      const step = data[j];

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
      }
    }
  }

}());
