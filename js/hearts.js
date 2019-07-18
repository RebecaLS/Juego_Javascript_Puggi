class Heart {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.width = 35;
    this.height = 35;
    this.image = new Image()
    this.image.src = "img/heart5.png"
    this.velX = 3.2;
    this.posX = canvasW;
    //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
    this.posY = playerY0 + playerH * 0.4;
  }

  draw() {
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }
}