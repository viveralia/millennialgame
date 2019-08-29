/**************************************/
/************* VARIABLES *************/
/************************************/
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval

/***************************************/
/*************** CLASSES **************/
/*************************************/
class Runner {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.x = 20
    this.y = canvas.height - this.height
    this.img = new Image()
    this.img.src = 'https://i1.wp.com/espacioenblan.co/wp-content/uploads/2019/08/girl.png'
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  jump() {
    if (this.y >= 300 && this.y <= canvas.height - this.height) {
      this.y -= (canvas.height - this.height) / 2
    }
  }
  crashesWith(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

const runner = new Runner(121, 172)

/**************************************/
/************* FUNCTIONS *************/
/************************************/
function update() {
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  runner.draw()
}

function clearWelcomeScreen() {
  const welcomeScreen = document.querySelector('.welcome')
  welcomeScreen.classList.add('fadeOut')
  setTimeout(() => {
    welcomeScreen.classList.add('hide')
  }, 750)
}

function startGame() {
  clearWelcomeScreen()
  interval = setInterval(update, 1000 / 60)
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
