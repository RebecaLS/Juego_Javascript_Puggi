//este literal mantiene el marcador del juego con su puntuación
const ScoreBoardBones = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "30px Kaushan Script"
   
  },
  
  update: function (numBones) {
    this.ctx.fillStyle = "white";
    this.ctx.fillText((numBones), 130 , 140);
    this.newBone = new Bone(this.ctx, 130, 50 , 15, 15);
    this.newBone.draw()
  }
};
