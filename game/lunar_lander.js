// load matter.js
const Engine = Matter.Engine
const Composite = Matter.Composite
const Bodies = Matter.Bodies

class LunarLander{
  setup(){
    this.gameOver = false
    this.background_image = loadImage('assets/background.jpg');
    
    // setup matter.js
    window.engine = Engine.create()
    window.world = window.engine.world
    window.engine.world.gravity.y = 0.5;
    Matter.Runner.run(window.engine)

    // add objects to world
    this.container = new Container()
    this.ground = Ground.getRandom()
    this.spaceship = new SpaceShip(createVector(width/2, 50))
  }
  
  run(){
    if(this.gameOver){
      textSize(22)
      textAlign(CENTER, CENTER)
      fill('green')
      text('Landed Successfully', width/2, height/2)
      return
    }
    
    // reset canvas
    background(this.background_image);

    // handle input
    this.spaceship.handleInput()

    // draw objects
    this.container.draw()
    this.ground.draw()
    this.spaceship.draw()

    // check if landed
    this.checkIfOver()

    // show info
    showInfo(this.spaceship)
  }
  
  checkIfOver(){
    if(
      Matter.Collision.collides(this.spaceship.body, this.ground.body) != null &&
      Matter.Body.getSpeed(this.spaceship.body) <= 0.001 &&
      abs(this.spaceship.body.angle) <= 5 &&
      !this.spaceship.thrust_applied  
    ){
      this.gameOver = true
    }
  }
}