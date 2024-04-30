const THRUST = 0.001
const FUEL_USAGE = 0.2
const ANGLE_DIFF = 0.05

const SPACESHIP_WIDTH = 20
const SPACESHIP_HEIGHT = 40

class SpaceShip{ 
  constructor(position){
    // initialize values
    this.initial_position = position.copy()
    this.fuel = 100
    this.thrust_applied = false
    
    // create body
    this.body = Bodies.rectangle(
      position.x, position.y,
      SPACESHIP_WIDTH, SPACESHIP_HEIGHT
    )
    // add it to the physics world
    Composite.add(window.world, this.body)
  }

  // applies appropriate thrust based on key press  
  handleInput(){
    if(this.fuel <= 0) return;
    
    let action = 0
    if(keyIsDown(UP_ARROW)){    
      action = 1
    }
    if(keyIsDown(LEFT_ARROW)){
      action = 2
    }
    if(keyIsDown(RIGHT_ARROW)){
      action = 3
    }
    
    this.handleAction(action)
  }
  
  handleAction(action){
    if(action != 0){
      this.thrust_applied = true
    }else{
      this.thrust_applied = false
    }
    
    if(action == 1){
      const angle = this.body.angle
      const force = createVector(
        sin(angle) * THRUST,
        -cos(angle) * THRUST
      )
      Matter.Body.applyForce(this.body, this.body.position, {
        x: force.x,
        y: force.y
      })
      this.fuel -= FUEL_USAGE
    }
    
    if(action == 2){
      Matter.Body.setAngle(this.body, this.body.angle - ANGLE_DIFF)
      this.fuel -= FUEL_USAGE
    }
    
    if(action == 3){
      Matter.Body.setAngle(this.body, this.body.angle + ANGLE_DIFF)
      this.fuel -= FUEL_USAGE
    }
  }
  
  // draws the spaceship on canvas
  draw(){
    // start shape
    push()
    
    const position = this.body.position
    const angle = this.body.angle 
    translate(position.x, position.y)
    
    rotate(angle)
    fill('white')
    rectMode(CENTER)
    rect(0,0,SPACESHIP_WIDTH,SPACESHIP_HEIGHT)
        
    // end shape
    pop()
  }
  
  // getters
  getRemainingFuel(){
    return round(this.fuel, 2)
  }
  getVelocity(){
    const velocity = Matter.Body.getVelocity(this.body)
    return [round(velocity.x, 2), round(velocity.y, 2)]
  }
  
  // setters
  setBrain(brain){
    this.brain = brain
  }
  setTarget(target){
    this.target = target
  }
}