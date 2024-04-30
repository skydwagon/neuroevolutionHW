HEIGHT = 700
WIDTH = 700

function setup() {
  createCanvas(HEIGHT, WIDTH)
  
  this.game = new LunarLanderAI()
  this.game.setup()
}

function draw() {
  this.game.run()
}