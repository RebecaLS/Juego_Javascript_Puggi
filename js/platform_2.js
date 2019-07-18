class Platform2 {
  constructor(ctx, canvasW, playerY0random, canvasH) {
    this.ctx = ctx;
    this.width = 200;
    this.height = 45;
    this.velX = 2;
    this.posX = canvasW;
    this.posY0 = playerY0random;

    this.gameHeight = canvasH;
    this.image = new Image()
    this.image.src = "img/pl_3.png"
    //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
    this.posY = playerY0random 
    // this.posY = this.gameHeight*0.9 - this.height
    
  }

  draw() {
    
    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(this.posX, this.posY * 0.9 - this.height, this.width, this.height);
    this.ctx.drawImage(this.image, this.posX, this.posY0, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }


}