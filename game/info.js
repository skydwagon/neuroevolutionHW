function showInfo(spaceship){
  // show info
  const text_size = 14
  textSize(text_size);
  fill('gray')
  text_start_pos = createVector(25, 40)
  text(`Fuel: ${spaceship.getRemainingFuel()}`, text_start_pos.x, text_start_pos.y)
  text(`Velocity: ${spaceship.getVelocity()}`, text_start_pos.x, text_start_pos.y+text_size)
}