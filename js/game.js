const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  bones: [],
  colisionBones: [],
  colisionHearts: [],
  collisionCats:[],
  hearts: [],
  cats: [],
  platforms2: [],
  actualObstacle: undefined,
  actualBone: undefined,
  framesCounter: 0,
  score: undefined,
  // count: undefined,  
  numHearts: 0,
  numBones: 0,
  numCats: 0,
  found: false,
  keys: {

    KEY_TOP: 38,
    KEY_DOWN: 40,
    KEY_RIGHT: 39,
    KEY_LEFT: 37,
   
    // SPACE: 32
  },

  init: function() {
    this.canvas = document.getElementById("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.width = window.innerWidth * .95
    this.height = window.innerHeight * 0.95
    this.canvas.width = this.width 
    this.canvas.height = this.height 
    this.start()
    document.getElementById("game_sound").play()
    
  },

  start: function() {
      this.reset()        // Reiniciamos configuración del juego
      this.interval = setInterval(()=>{     //Intervalo de juego.
      this.framesCounter++                //Contador de frames

      // controlamos que frameCounter no sea superior a 1000
      if(this.framesCounter > 1000) this.framesCounter = 0 

      // controlamos la velocidad de generación de obstáculos
      if(this.framesCounter%100==0) 
      this.score++ 
      
      // this.count--
      //colision con huesos 
      this.findCollisionBones()
      //colision con corazones
      this.findCollisionHearts()
      //colision con gatos
      this.findCollisionCats()
      //colision con plataformas
      this.findCollision()  
  
      this.clear()                    
      this.clearBones() 
      this.clearCats()
      this.drawAll()
      this.moveAll()
      this.generateBones() 
      this.generateCats()
      this.generateHearts()  
      // this.moveAll(keys)                      //Generamos huesos
      this.generatePlatform2() //generamos plataformas
      this.clearHearts()
      this.clearPlatforms2()
      
      // this.isCollisionCats()                   // Comprobamos colisiones
    }, 1000/this.fps)
  },

  reset: function() {         //reset del game
    this.background = new Background(this.ctx, this.width, this.height)
    this.background2 = new Background2(this.ctx, this.width, this.height)
    this.background3 = new Background3(this.ctx, this.width, this.height)
    this.background4 = new Background4(this.ctx, this.width, this.height)
    this.background5 = new Background5(this.ctx, this.width, this.height)
    this.board = new Board(this.ctx, this.width, this.height)
    // this.background6 = new Background6(this.ctx, this.width, this.height)
    this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys,this.framesCounter)
    this.scoreboard = ScoreBoard
    this.scoreboard.init(this.ctx)

    this.ScoreBoardHearts = ScoreBoardHearts
    this.ScoreBoardHearts.init(this.ctx)

    this.ScoreBoardBones = ScoreBoardBones
    this.ScoreBoardBones.init(this.ctx)

    this.Count = Count
    this.Count.init(this.ctx)
    // this.Board = Board
    // this.Board.init(this.ctx)

    this.score = 0
    // this.count = 0
    this.bones = []
    this.hearts = []
    this.cats = []
    this.platforms = []
    this.platforms2 = []

  },

  drawAll: function() {
    this.background.draw()
    this.background2.draw()
    this.background3.draw()
    this.background4.draw()
    this.background5.draw()
    this.board.draw()
    // this.background6.draw()
    
    this.bones.forEach( obs => obs.draw()) 
    this.hearts.forEach( obs1 => obs1.draw()) 
    this.cats.forEach( obs2 => obs2.draw()) 
    this.platforms.forEach( obs3 => obs3.draw())   
    this.platforms2.forEach( elm => elm.draw()) 
    this.player.draw(this.framesCounter)  
    this.drawScore()
    // this.drawCount()
    this.drawCountHearts()
    this.drawCountBones()
    // this.drawBoard()
  },

  moveAll: function() {
    this.background.move()
    this.background2.move()
    this.background3.move()
    this.background4.move()
    this.background5.move()
    // this.background6.move()
     this.player.move()
     this.bones.forEach(obs => obs.move())
     this.hearts.forEach(obs1 => obs1.move())
     this.cats.forEach(obs2 => obs2.move())
     this.platforms.forEach(obs3 => obs3.move())
     this.platforms2.forEach(obs4 => obs4.move())
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },

  generateBones: function() {
    if(this.framesCounter % 90 == 0) {        //Generamos huesos cada 70 frames.
      this.bones.push(new Bone(this.ctx, this.canvas.width, this.player.posY0 + (Math.random() * (100 - 300) + 0.2), this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  clearBones: function() {        //funcion para limpiar huesos
    this.bones.forEach( (obs, idx) => {
      if(obs.posX<= 0) {
        this.bones.splice(idx, 1)
      } 
    })
  },

  generateHearts: function() {
    if(this.framesCounter % 160 == 0) {        //Generamos huesos cada 70 frames.
      this.hearts.push(new Heart(this.ctx, this.canvas.width, this.player.posY0 + (Math.random() * (100 - 300) + 0.2), this.player.height)) //pusheamos nuevos obstaculos
    }
  },

  clearHearts: function() {        //funcion para limpiar corazones
    this.hearts.forEach( (obs, idx) => {
      if(obs.posX<= 0) {
        this.hearts.splice(idx, 1)
      } 
    })
  },

  generatePlatform2: function() {
    if(this.framesCounter % 270 == 0) {        //Generamos plataformas cada 120 frames.
      let YRandom = Math.floor(Math.random()*(this.height/2 + 220 - this.player.posY0+1)+ this.player.posY0);
      this.platforms2.push(new Platform2(this.ctx, this.canvas.width, YRandom, this.height))
    }
  },

  clearPlatforms2: function() {        //funcion para limpiar plataformas
    this.platforms2.forEach( (obs3, idx) => {
      if(obs3.posX<= 0) {
        this.platforms2.splice(idx, 1)
      } 
    })
  },

  generateCats: function() {
    if(this.framesCounter % 165 ==0) {        //Generamos obstaculos cada 30 frames.
    this.cats.push(new Cat(this.ctx, this.canvas.width, this.height*0.99-70)) //pusheamos nuevos obstaculos
    }
  },

  clearCats: function() {        //funcion para limpiar cats
    this.cats.forEach( (obs2, idx) => {
      if(obs2.posX<= 0) {
        this.cats.splice(idx, 1)
      } 
    })
  },

// COLISIÓN CON PLATAFORMAS
  findCollision(){
    this.actualObstacle = this.platforms2.find(elm =>{
      return((this.player.posX+this.player.width >= elm.posX
          &&this.player.posY+this.player.height >= elm.posY
          &&this.player.posX<= elm.posX+elm.width
          &&this.player.posY< elm.posY+elm.height-100
          &&this.player.velY > 0
          ))

    })

    if(this.actualObstacle){
      // this.collisionPlatform = this.actualObstacle
      this.player.obj = this.actualObstacle
      this.player.posY0 = this.actualObstacle.posY0 - this.player.height
      this.player.posY = this.player.posY0
    
    } 
    else {
      this.player.posY0 = this.height - this.player.height
    }

  },

// COLISIÓN CON HUESOS SE SUMAN
  findCollisionBones(){
  
    this.bones.forEach((elm, idx, arr) =>{
      // si hay colisión con el hueso
    if((this.player.posX+this.player.width >= elm.posX
        &&this.player.posY+this.player.height >= elm.posY
        &&this.player.posX <= elm.posX+elm.width
        &&this.player.posY< elm.posY+elm.height
      
        )) {
        let bone = arr[idx]
        arr.splice(idx, 1)
        console.log(bone)
        this.colisionBones.push(bone)//elemento con el que choca
        console.log('longitud array' + this.colisionBones.length)
        console.log('he cogido ' + this.colisionBones.length +'huesos')
        //lo guardo en un array y su longitud serán los huesos que ha cogido
        this.numBones = this.colisionBones.length
        // console.log('he cogido ' + this.colisionBones.length +'huesos')
        document.getElementById("bone_sound").play()
        }
     
    })
  },

// COLISIÓN CON CORAZONES SUMA VIDA
  findCollisionHearts(){
  
    this.hearts.forEach((elm, idx, arr) =>{
    // si hay colisión con el hueso
    if((this.player.posX+this.player.width >= elm.posX
      &&this.player.posY+this.player.height >= elm.posY
      &&this.player.posX<= elm.posX+elm.width
      &&this.player.posY< elm.posY+elm.height
   
     )) {
      let heart = arr[idx]
      arr.splice(idx, 1)
  
      this.colisionHearts.push(heart)//elemento con el que choca
      //lo guardo en un array y su longitud serán los huesos que ha cogido
      this.numHearts = this.colisionHearts.length
      // console.log('he cogido ' + this.colisionHearts.length +'corazones')
      document.getElementById("heart_sound").play()
        if(this.numHearts<=0){
        // console.log('finnnnnn')
        this.gameOver()
       }
     }
  
 })


},

// COLISIÓN CON GATOS RESTA VIDA
findCollisionCats(){
  
  this.cats.forEach((elm, idx, arr) =>{
   // si hay colisión con el hueso
    if((this.player.posX+this.player.width >= elm.posX
     &&this.player.posY+this.player.height >= elm.posY
     &&this.player.posX<= elm.posX+elm.width
     &&this.player.posY< elm.posY+elm.height
   
     )) {
      
      arr.splice(idx, 1)
      console.log(idx)
      //  this.collisionCats.push(cat)//elemento con el que choca
       // console.log(this.colisionBones)
       //lo guardo en un array y su longitud serán los huesos que ha cogido
      //  this.numCats = this.collisionCats.length
       this.numHearts -= 1
      //  console.log('he cogido ' + this.collisionCats.length +'gatos')
       document.getElementById("cat_sound").play()
      //  console.log(this.numHearts)
       if(this.numHearts === 0){
        // console.log('FINNNNN DEL JUEGOOOOO')
        this.gameOver()
       }
     }
 })

},
drawCount:function(){
  this.Count.update(this.count)
},

  drawCountBones:function(){
    this.ScoreBoardBones.update(this.numBones)
  },

  drawCountHearts: function(){
    this.ScoreBoardHearts.update(this.numHearts)
  },

  drawScore: function() {             //con esta funcion pintamos el marcador
    this.scoreboard.update(this.score)
  },

  gameOver: function() {            //Gameover detiene el juego.
    clearInterval(this.interval)
    document.getElementById("id_gamover").style.display = "block";
  }
}