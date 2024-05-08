const THRUST = 0.001
const FUEL_USAGE = 0.3
const ANGLE_DIFF = 0.05

const SPACESHIP_WIDTH = 20
const SPACESHIP_HEIGHT = 40

const STATUS_ON = 0
const STATUS_LANDED = 1
const STATUS_CRASHED = 2

class SpaceShip{ 
  constructor(position, target, brain){
    // initialize values
    this.fuel = 100
    this.thrust_applied = false
    this.status = STATUS_ON
    this.fitness = 0
    this.is_best = false
    
    // set brain and target
    this.brain = brain
    this.target = target

    // create body
    this.body = Bodies.rectangle(
      position.x, position.y,
      SPACESHIP_WIDTH, SPACESHIP_HEIGHT,
      {
        collisionFilter: {
          group: Matter.Body.nextGroup(false),
          category: 2,
          mask: 1
        }
      }
    )
    // add it to the physics world
    Composite.add(window.world, this.body)
  }

  // applies appropriate thrust based on key press
  move(){
    if(this.fuel <= 0) return;
    const action = this.think()
    this.handleAction(action)
    
    this.fitness -= this._calcNormDist(this.body.position, this.target.position)/989 * 1.4

    }
  
  think(){
    // preparing input
    const pos = this.body.position
    const vel = Matter.Body.getVelocity(this.body)
    const angle = this.body.angle
    const target_pos = this.target.position
    
    const input = [
      pos.x, pos.y,
      vel.x, vel.y,
      angle,
      target_pos.x, target_pos.y
    ]
  
    return this.brain.predict(input)
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
    if(this.is_best)
      fill('#ffffff')
    else
      fill('#afafaf')
    rectMode(CENTER)
    rect(0,0,SPACESHIP_WIDTH,SPACESHIP_HEIGHT)
    textSize(10)
    text(`${round(this.fitness,1)}`, 0, SPACESHIP_HEIGHT+5)
    // end shape
    pop()
  }
    
  landed(){
    this.fitness += 1000
    this.status = STATUS_LANDED
    Composite.remove(world, this.body)
  }
  crashed(){
    this.fitness -= 50
    this.status = STATUS_CRASHED
    Composite.remove(world, this.body)
  }
  delete(){
    this.brain.dispose()
  }
  
  // getters
  getRemainingFuel(){
    return round(this.fuel, 2)
  }
  getVelocity(){
    const velocity = Matter.Body.getVelocity(this.body)
    return [round(velocity.x, 2), round(velocity.y, 2)]
  }
  
  _calcNormDist(point1, point2){
    const my_dist = p5.Vector.dist(
      createVector(this.body.position.x, this.body.position.y), 
      createVector(this.target.position.x, this.target.position.y)
    )

    return (my_dist/989)
  }
}