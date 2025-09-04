import taxi from "https://thewhodidthis.github.io/taxi/main.js"
import lsys from "./main.js"

const board = document.querySelector("canvas").getContext("2d")

const rules = new Map([
  ["F", "FF-F-F-F-F-F+F"],
])

const shape = lsys(rules, "F-F-F-F")
const agent = taxi(board).goto(380.5, 159.5)

board.strokeStyle = "white"

for (let i = 0; i < 4; i += 1) {
  board.clearRect(0, 0, 540, 360)

  const data = shape()

  for (let j = 0, stop = data.length; j < stop; j += 1) {
    const step = data[j]

    switch (step) {
      case "F":
        agent.move(5)
        break
      case "-":
        agent.lt(90)
        break
      case "+":
        agent.rt(90)
        break
      default:
        break
    }
  }
}
