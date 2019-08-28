const obstacles = []

/****************************/
/********** BOARD **********/
/**************************/
class GameBoard {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.frames = 0
    this.score = 0
    this.interval
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  start() {
    this.interval = setInterval(() => this.update(), 5)
  }
  update() {
    this.clear()
    this.frames++
    this.score += 0.01
  }
  stop() {
    clearInterval(this.interval)
  }
}

const board = new GameBoard()

/********************************/
/********** OBSTACLES **********/
/******************************/
class Obstacle {
  constructor() {
    this.minHeight = 20
    this.maxHeight = 100
    this.minWidth = 10
    this.maxWidth = 20
    this.minGap = 200
    this.maxGap = 500
    this.gap = this.getRandGap()
    this.height = Math.floor(this.minHeight + Math.random() * (this.maxHeight - this.minHeight + 1))
    this.width = Math.floor(this.minWidth + Math.random() * (this.maxWidth - this.minWidth + 1))
    this.x = board.canvas.width
    this.y = board.canvas.height - this.height
  }
  getRandGap() {
    return Math.floor(this.minGap + Math.random() * (this.maxGap - this.minGap + 1))
  }
  draw() {
    board.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

console.log('Sin errores')
