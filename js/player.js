class Player {
  constructor(ctx, w, h, keys, framesCounter) {
    this.ctx = ctx
    this.gameWidth = w
    this.gameHeight = h

    
    this.framesCounter = framesCounter
    // imagen correr
    this.width =190
    this.height = 100
    this.image = new Image()
    this.image.src = "img/gordi2.png"
    // imagen saltar
    // this.widthJump = 240
    // this.heightJump = 167
    // this.image = new Image()
    // this.image.src = "img/puggi_jump.png"

    //  POSICION INICIAL
    this.posX = 40
    // this.posY0 = this.gameHeight * 0.9 - this.height     //Guardamos la posicion original para usarla como suelo
    this.posY0 = this.gameHeight*0.99- this.height


    this.posY = this.posY0
    this.velY = 0.9
    this.velX = .2

    this.direction = {
      KEY_TOP: false,
      KEY_DOWN: false,
      KEY_RIGHT: false,
      KEY_LEFT: false,
    }

    this.image.frames = 6           //Indicamos el numero de frames que tiene la imagen
    this.image.framesIndex = 0      //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.keys = keys

    this.bullets = []           //Array de balas

    this.setListeners()       //Llamamos al listener para que desde el primer momento el jugador responda.
  }

  draw() {
    this.ctx.drawImage(
      this.image, 
      this.image.framesIndex * Math.floor(this.image.width/this.image.frames),  //Punto x donde empieza a recortar
      0,                                                                        //Punto y donde empieza a recortar
      Math.floor(this.image.width/this.image.frames),                           //Punto x donde termina de recortar
      this.image.height,                                                        //Punto y donde termina de recortar
      this.posX, 
      this.posY, 
      this.width, 
      this.height )

    // this.bullets.forEach(bullet => bullet.draw())      //El player dibuja las balas.
  }


  animate(){ 
    // console.log(framesCounter)
    if(this.framesCounter%6==0) {
      this.image.framesIndex++              //Cambiamos el frame de la imagen cada 5 fps.
      if(this.image.framesIndex>5) {
        this.image.framesIndex = 0
      }
    }
    
  }

  animateJump(){ 
    if(this.framesCounter%6==0) {
      this.image.framesIndex++              //Cambiamos el frame de la imagen cada 5 fps.
      if(this.image.framesIndex>5) {
        this.image.framesIndex = 0
      }
    }
    
  }
//  //ANIMACION CUANDO PARA 
//   animateStop(){ 
//     if(this.framesCounter%5==0) {
//       this.image.framesIndex++              //Cambiamos el frame de la imagen cada 5 fps.
//       if(this.image.framesIndex>4) {
//         this.image.framesIndex = 0
//       }
//     } 
//   }

//EVENTOS DE TECLA
  setListeners() {
    // AL PULSAR
    document.onkeydown = (e) => {
      switch(e.keyCode){
        // ARROW UP
          case this.keys.KEY_TOP:  
            this.direction.KEY_TOP = true 
            this.animateJump()
            // if(this.posY >= this.posY0){    //COmprobamos que el player este en el suelo antes de saltar
            // this.posY -= 30       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
            // this.velY -= 10
            this.changeImgOriginal()
            // this.animateJump()
            
          break;
        // ARROW RIGHT 
          case this.keys.KEY_RIGHT:
            this.direction.KEY_RIGHT =true   
            this.animate()
            this.changeImgOriginal()

            // this.image.frames = 4             
          break;
        // ARROW DOWN  
          case this.keys.KEY_DOWN:
            this.direction.KEY_DOWN =true       
            // this.changeImg()          
            // this.animateJump()
          break; 
        // ARROW DOWN  
          case this.keys.KEY_LEFT:
            this.direction.KEY_LEFT =true
            this.animate()
            this.changeImg()
            // this.image.frames = 4             

            
              // this.ctx.save(); // Save the current state
              // this.ctx.scale(-1, 1); // Set scale to flip the image
              // this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height); // draw the image
              // this.ctx.restore(); // Restore the last saved state
          
            //COmprobamos que el player este en el suelo antes de saltar            
            // this.animateRun()
          break; 
      }
    }
    // LEVANTAR CLIC
    document.onkeyup = (e) => {
      switch(e.keyCode){
        case this.keys.KEY_TOP:    
          this.direction.KEY_TOP = false   
        break;
        case this.keys.KEY_RIGHT:
          this.direction.KEY_RIGHT =false 
          this.image.framesIndex = 0       
        break; 
        case this.keys.KEY_DOWN:
          this.direction.KEY_DOWN =false       
        break;
        case this.keys.KEY_LEFT:
          this.direction.KEY_LEFT =false   
          this.image.framesIndex = 0    
        break;  
      }
    }
  }

//MOVIMIENTO DEL SPRITE SEGUN LA TECLA
  move(){

    this.gravity()

    if(this.direction.KEY_TOP && this.posY0 < this.posY){          //COmprobamos que el player nunca sobrepase el suelo.
      this.posY -= 2
      this.velY -= 15
    }
    if(this.direction.KEY_RIGHT && this.posX + this.width <= this.gameWidth){
      this.posX += 5       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
      this.velX -= 10
    }
  
    if(this.direction.KEY_LEFT){
      this.posX -= 5       //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
      this.velX += 10
    }
    // if(this.direction.KEY_DOWN){
    //   this.posX = posX
    // }
  }

  gravity (){
    let velGravity = 0.4
    if(this.posY <= this.posY0){
      this.velY += velGravity
      this.posY += this.velY
    }else{
      this.velY = 0
      this.posY = this.posY0
    }
  }
//CAMBIA DE SPRITE SEGUN LA TECLA
  changeImg (){
    this.image.src = "img/gordi2_flip.png"
  }
  changeImgOriginal (){
    this.image.src = "img/gordi2.png"
  }
  // shoot() {

  //   //Instanciamos nuevas balas
  //   this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height))
    
  // }
}