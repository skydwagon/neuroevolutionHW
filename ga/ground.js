class Ground{
  constructor(position, size){
    this.size = size
    
    // create body
    this.body = Bodies.rectangle(
      position.x, position.y, size.x, size.y, 
      {isStatic: true}
    )
    // add it to the world
    Composite.add(window.world, this.body)
  }
  
  draw(){
    var pos = this.body.position
    var angle = this.body.angle
    
    push()
    translate(pos.x, pos.y)
    rotate(angle)
    rectMode(CENTER)
    rect(0,0,this.size.x, this.size.y)
    pop()
  }
  
  static getRandom(){
    const w = random(50, 100)
    const h = 10
    const position_x = random(WALL_THICKNESS, width-WALL_THICKNESS-w)
    const position_y = random(WALL_THICKNESS + 100, height-WALL_THICKNESS)
    
    return new Ground(
      createVector(position_x, position_y),
      createVector(w, h)
    )
  }
}