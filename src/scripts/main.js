/********************************************/
/**************** VARIABLES ****************/
/******************************************/
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// Welcome Screen
const welcomeScreen = document.querySelector('.welcome')
// Obstacles
const obstacles = []
// Counters
let frames = 0
let score = 0
// Interval
let interval
// Audios
const gameOverSong = document.querySelector('#game-over-song')

/***********************************************/
/******************* CLASSES ******************/
/*********************************************/
class Runner {
  constructor(width, height) {
    // Starting positions and measurements
    this.width = width
    this.height = height
    this.x = 40
    this.y = canvas.height - this.height
    // Jumping values
    this.maxJumpHeight = (canvas.height - this.height) / 2 - 200
    this.floor = canvas.height - this.height
    // Creates a new img instance with the Image() class and adds the src attribute
    this.img = new Image()
    this.img.src = 'https://i1.wp.com/espacioenblan.co/wp-content/uploads/2019/08/girl.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    if (this.y >= this.maxJumpHeight && this.y < this.floor) this.y += 20
  }
  jump() {
    this.y >= this.floor && (this.y = this.maxJumpHeight)
  }
  crashedWith(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x - 40 + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height - 15 > obstacle.y
    )
  }
}

class Obstacle {
  constructor(y, width, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    // A number from 0 to 2 to print the correct obstacle image
    this.type = type
    // Obstacle 0: Taxes
    this.imgTaxes = new Image()
    this.imgTaxes.src = 'https://i1.wp.com/espacioenblan.co/wp-content/uploads/2019/08/taxes.png'
  }
  draw() {
    // Keeps moving the obstacle to the left
    this.x -= 15
    switch (this.type) {
      case 0:
        ctx.drawImage(this.imgTaxes, this.x, this.y, this.width, this.height)
        break
    }
  }
}

/*****************************************************/
/****************** THE INSTANCES *******************/
/***************************************************/
const runner = new Runner(121, 172)
// Generating random obstacles
function getRandomObstacles() {
  if (frames % 200 === 0) {
    // All obstacles will have the same width and height
    const width = 75
    const height = 75
    // Creating the obstacles as new instances
    const obstacle = new Obstacle(canvas.height - height, width, height, 0)
    obstacles.push(obstacle)
  }
}
function drawObstacles() {
  obstacles.forEach(obstacle => {
    obstacle.draw()
  })
}

/********************************************/
/**************** FUNCTIONS ****************/
/******************************************/
function goFullScreen(element) {
  if (element.requestFullscreen) element.requestFullscreen()
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen()
  else if (element.msRequestFullscreen) element.msRequestFullscreen()
}

function clearWelcomeScreen() {
  welcomeScreen.classList.add('fadeOut')
  setTimeout(() => {
    welcomeScreen.classList.add('hide')
  }, 750)
}

function update() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  runner.draw()
  getRandomObstacles()
  drawObstacles()
  checkCollition()
}

function startGame() {
  goFullScreen(document.querySelector('body'))
  clearWelcomeScreen()
  interval = setInterval(update, 1000 / 60)
}

function checkCollition() {
  obstacles.forEach(obstacle => {
    if (runner.crashedWith(obstacle)) return gameOver()
  })
}

function gameOver() {
  clearInterval(interval)
  canvas.classList.add('loser')
  gameOverSong.play()
}

/**************************************/
/************* LISTENERS *************/
/************************************/
document.addEventListener('keydown', e => {
  if (frames > 0) {
    switch (e.keyCode) {
      case 32:
        runner.jump()
        break
    }
  } else {
    startGame()
  }
})
