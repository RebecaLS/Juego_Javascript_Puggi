//este literal mantiene el marcador del juego con su puntuación
const ScoreBoardHearts = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "30px Kaushan Script"
   
  },
  
  update: function (numBones) {
    this.ctx.fillStyle = "red";
    this.ctx.fillText((numBones), 220 , 140);
    this.newHeart = new Heart(this.ctx, 220, 60 , 15, 15);
    this.newHeart.draw()
  }
};
