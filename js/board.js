class Board{
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.width = 230;
    this.height = 185;
    this.image = new Image()
    this.image.src = "img/boardPanel.png"          
    this.posX = 80;
    this.posY = 0;
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

}