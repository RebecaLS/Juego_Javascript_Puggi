//este literal mantiene el marcador del juego con su puntuación
const ScoreBoard = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "30px sans-serif"
  },
  
  update: function (count) {
    // this.ctx.fillStyle = "blue";
    // this.ctx.fillText(Math.floor(count), 450, 50);
    

    // this.newBoard = new Board(this.ctx, 50, 20 , 150, 100);
    // this.newBoard.draw()
  }
};
