/********************************************/
/**************** VARIABLES ****************/
/******************************************/
const canvasWrapper = document.querySelector('.canvas-wrapper')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// Screens
const welcomeScreen = document.querySelector('.welcome')
const gameOverScreen = document.querySelector('.game-over')
// Obstacles
const obstacles = []
// Interval
let interval
// Counters
let frames = 0
// Score Board
let score = 0
const scoreBoard = document.querySelector('.score')
// Others
let gravity = 0.98
let keys = {}
// Audios
const bgSong = document.querySelector('#bg-song')
const gameOverSong = document.querySelector('#game-over-song')
const jumpSound = document.querySelector('#jump-sound')
// Sharer buttons & final points
const finalScore = document.querySelector('#score-span')
const whatsSharer = document.querySelector('#whats-share')
const fbSharer = document.querySelector('#fb-share')
const mailSharer = document.querySelector('#mail-share')
const restartButton = document.querySelector('#restart')
// Easter
const ad = document.querySelector('.easter')
const close = document.querySelector('#close')

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
    // Creates a new img instance with the Image() class and adds the src attribute
    this.img = new Image()
    this.img.src = 'https://i1.wp.com/espacioenblan.co/wp-content/uploads/2019/08/girl.png'
    // Jumping
    this.velY = 0
    this.grounded = false
    this.jumping = false
    this.jumpStrength = 11
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
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
    // Obstacle 1: Taxes
    this.imgWedding = new Image()
    this.imgWedding.src = 'https://i1.wp.com/espacioenblan.co/wp-content/uploads/2019/08/conv.png'
    // Obstacle 2: Taxes
    this.imgHangover = new Image()
    this.imgHangover.src = 'https://i1.wp.com/espacioenblan.co/wp-content/uploads/2019/08/cruda.png'
  }
  draw() {
    // Keeps moving the obstacle to the left
    score <= 40 ? (this.x -= 10) : (this.x -= 13)
    switch (this.type) {
      case 0:
        ctx.drawImage(this.imgTaxes, this.x, this.y, this.width, this.height)
        break
      case 1:
        ctx.drawImage(this.imgWedding, this.x, this.y, this.width, this.height)
        break
      case 2:
        ctx.drawImage(this.imgHangover, this.x, this.y, this.width, this.height)
        break
    }
  }
}

/*****************************************************/
/****************** THE INSTANCES *******************/
/***************************************************/
const player = new Runner(121, 172)
// Generating random obstacles

function getRandomObstacles() {
  const minLevel = 350
  const maxLevel = 250
  let randomLevel = 200
  if (score > 50) {
    randomLevel = Math.floor(Math.random() * maxLevel + minLevel)
  }

  const randomImage = Math.floor(Math.random() * 3)

  if (frames % randomLevel === 0) {
    // All obstacles will have the same width and height
    const width = 75
    const height = 75
    // Creating the obstacles as new instances
    const obstacle = new Obstacle(canvas.height - height, width, height, randomImage)
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
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  player.draw()
  move()
  getRandomObstacles()
  drawObstacles()
  checkCollition()
  drawScore()
}

function startGame() {
  bgSong.volume = 0.125
  goFullScreen(document.querySelector('body'))
  clearWelcomeScreen()
  interval = setInterval(update, 1000 / 120)
}

function move() {
  if (!player.grounded) {
    player.y += player.velY
    player.velY += gravity
  }
  if (player.y > canvas.height - player.height) {
    player.grounded = true
    player.jumping = false
    player.y = canvas.height - player.height
  }
  if (keys[32]) {
    if (!player.jumping) {
      jumpSound.play()
      player.velY = 0
      player.grounded = false
      player.jumping = true
      player.velY += -player.jumpStrength * 2
    }
  }
}

function checkCollition() {
  obstacles.forEach(obstacle => {
    if (player.crashedWith(obstacle)) return gameOver()
  })
}

function drawScore() {
  if (frames % 50 === 0) {
    score++
  }
  scoreBoard.innerHTML = `<p>${score}</p>`
}

function gameOver() {
  clearInterval(interval)
  bgSong.pause()
  updateShareLinks()
  showGameOverScreen()
  canvasWrapper.classList.add('loser')
  gameOverSong.play()
  ad.style.display = 'block'
}

function updateShareLinks() {
  finalScore.innerText = score
  whatsSharer.innerHTML = `<a href="https://wa.me/?text=Te%20reto%20a%20superar%20mi%20puntaje%3A%20%F0%9F%91%89%20${score}pts%0A%0Ahttps%3A%2F%2Fpostmodernidad.netlify.com%2F" rel="noopener, noreferrer" target="_blank" title="Share on Whatsapp"><i class="fa fa-whatsapp"></i></a>`
  fbSharer.innerHTML = `<a href="https://www.facebook.com/sharer/sharer.php?u=https://postmodernidad.netlify.com/&t=Te%20reto%20a%20superar%20mi%20puntaje%3A%20%F0%9F%91%89%20${score}pts" rel="noopener, noreferrer" target="_blank" title="Share on Facebook"><i class="fa fa-facebook-f"></i></a>`
  mailSharer.innerHTML = `<a href="mailto:?subject=Te%20reto%20a%20superar%20mi%20puntaje%3A%20%F0%9F%91%89%20${score}pts&body=Juega%20dando%20click%20aqu%C3%AD%3A%0A%0Ahttps%3A%2F%2Fpostmodernidad.netlify.com" rel="noopener, noreferrer" target="_blank" title="Mail your friend"><i class="fa fa-envelope"></i></a>`
}

function showGameOverScreen() {
  gameOverScreen.style.display = 'block'
}

/**************************************/
/************* LISTENERS *************/
/************************************/
window.onload = () => {
  bgSong.volume = 0.0975
  bgSong.play()
}

addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 32: // Space Bar Keycode
      frames === 0 ? startGame() : (keys[e.keyCode] = true)
      break
  }
})

addEventListener('keyup', e => {
  keys[e.keyCode] = false
})

restartButton.addEventListener('click', () => {
  location.reload()
})

close.addEventListener('click', () => {
  ad.style.display = 'none'
})
