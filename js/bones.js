class Bone {
  constructor(ctx, canvasW, playerY0,  playerH) {
    this.ctx = ctx;
    this.width = 50;
    this.height = 50;
    this.image = new Image()
    this.image.src = "img/bone.png"
    this.velX = 2.8;
    this.posX = canvasW;
    //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
    this.posY = playerY0 + playerH * 0.6;
  }

  draw() {
    // this.ctx.fillStyle = "black";
    // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  move() {
    this.posX -= this.velX
  }

  changeImgBone (){
    this.image.src = "img/bone2.png"
  }
}