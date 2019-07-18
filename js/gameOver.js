//este literal mantiene el marcador del juego con su puntuación
const gameOver = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "30px Kaushan Script"
   
  },
  
  update: function () {
    this.ctx.fillStyle = "blue";
    this.ctx.fillText(("over"), 440, 150);
    
  }
};
