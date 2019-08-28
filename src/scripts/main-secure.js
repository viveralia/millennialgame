/********************************************/
/***************** IMPORTS *****************/
/******************************************/
import Millennial from './millennial'

/********************************************/
/**************** VARIABLES ****************/
/******************************************/
// Getting the canvas and the context from the DOM
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
// Welcome screen
const welcomeScreen = document.querySelector('.welcome')

/********************************************/
/**************** FUNCTIONS ****************/
/******************************************/
function clearWelcomeScreen() {
  welcomeScreen.classList.add('fadeOut')
  setTimeout(() => {
    welcomeScreen.classList.add('hide')
  }, 750)
}

/********************************************/
/**************** INSTANCES ****************/
/******************************************/
const girl = new Millennial('http://www.goodcookn.com/wp-content/uploads/2015/07/Running.gif', 0, 0, 100, 100)

/********************************************/
/**************** LISTENERS ****************/
/******************************************/
document.onkeydown = e => {
  switch (e.keyCode) {
    case 32: // Space bar keycode
      clearWelcomeScreen()
      setTimeout(() => {
        girl.draw(ctx)
      }, 1000)
      break
  }
}
