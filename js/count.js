//este literal mantiene el marcador del juego con su puntuación
const Count = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "30px sans-serif"
  },
  
  update: function (count) {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(Math.floor(count), 250, 50);
  }
};
