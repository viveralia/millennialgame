export default class Millennial {
  constructor(image, x, y, width, height) {
    // Creates a new img instance with the Image() class and adds the src attribute
    this.img = new Image()
    this.img.src = image
    // Starting positions and measurements
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  jump(ctx) {
    this.y -= 20
  }
}
