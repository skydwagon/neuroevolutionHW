function showInfo(infos){
  // show info
  const text_size = 14
  textSize(text_size);
  fill('black')
  text_start_pos = createVector(25, 40)
  
  let index = 0
  for(const info of infos){
    text(info, text_start_pos.x, text_start_pos.y + (index*text_size))
    
    index += 1
  }
}