WALL_THICKNESS = 20

class Container{
  constructor(){
    // create walls surrounding window
    this.walls = []
    // top
    this.walls.push(
      Bodies.rectangle(width/2,WALL_THICKNESS/2,width,WALL_THICKNESS,{isStatic: true}) 
    )
    // left
    this.walls.push(
     Bodies.rectangle(WALL_THICKNESS/2,height/2,WALL_THICKNESS,height,{isStatic: true}) 
    )
    // right
    this.walls.push(
      Bodies.rectangle(width-WALL_THICKNESS/2,height/2,WALL_THICKNESS,height,{isStatic: true}) 
    )
    // bottom
    this.walls.push(
      Bodies.rectangle(width/2,height-WALL_THICKNESS/2,width,WALL_THICKNESS,{isStatic: true}) 
    )
      
    // add them to physics world
    Composite.add(window.world, this.walls)
  }
  
  
  draw(){
    for(const wall of this.walls){
      var position = wall.position
      const {min, max} = wall.bounds
      
      push()
      translate(position.x, position.y)
      rectMode(CENTER)
      fill('#A1662F')
      rect(0,0, max.x - min.x, max.y - min.y)
      pop()
    }
  }
}