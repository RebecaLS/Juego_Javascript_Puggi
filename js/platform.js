class Platform {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.width = 150;
    this.height = 40;
    this.velX = 4;
    this.posX = canvasW;
    this.image = new Image()
    this.image.src = "img/pl_2.png"
    //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
    this.posY = playerY0 + playerH * 0.2;
  }

  draw() {
    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(this.posX, this.posY * 0.9 - this.height, this.width, this.height);
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }
}