class Cat {
  constructor(ctx, canvasW, playerY0) {
    this.ctx = ctx;
    this.width = 70;
    this.height = 70;
    this.velX = 2;
    this.image = new Image()
    this.image.src = "img/cat.png"
    this.posX = canvasW ;

    this.posY = playerY0
    this.posY0 = this.gameHeight - this.height
    

 
    // this.posY = this.gameHeight*0.9 - this.height
  }

  draw() {
    // this.ctx.fillStyle = "green";
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }
}