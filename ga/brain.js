/*
  input: [
    current_pos.x, current_pos.y, 
    current_velo.x, current_velo.y, 
    current_angle, 
    target_pos.x, target_pos.y,
  ]
  
  output: [
    0: nothing
    1: thrust
    2: rotate left
    3: rotate right
  ]
*/
class Brain {
  constructor(_cap) {
    this.input_nodes = 7;
    this.hidden_nodes = _cap;
    this.output_nodes = 4;
    
    // create the model
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({
      units: this.hidden_nodes,
      inputShape: [this.input_nodes],
      activation: 'sigmoid'
    }));
    this.model.add(tf.layers.dense({
      units: this.output_nodes,
      activation: 'sigmoid'
    }));
  }

  predict(inputs) {
    return tf.tidy(() => {
      const xs = tf.tensor2d([inputs]);
      const ys = this.model.predict(xs);
      const output = ys.argMax(-1).dataSync()[0]
      return output;
    });
  }
  
  copy() {
    return tf.tidy(() => {
      const copiedBrain = new Brain(this.hidden_nodes);
      const weights = this.model.getWeights()
      const weightCopies = []
      for (let i = 0; i < weights.length; i++) {
        weightCopies[i] = weights[i].clone()
      }
      copiedBrain.model.setWeights(weightCopies)
      return copiedBrain
    });
  }

  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = []
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i]
        let shape = weights[i].shape
        let values = tensor.dataSync().slice()
        for (let j = 0; j < values.length; j++) {
          if (random(1) < rate) {
            let w = values[j]
            values[j] = w + randomGaussian()
          }
        }
        let newTensor = tf.tensor(values, shape)
        mutatedWeights[i] = newTensor
      }
      this.model.setWeights(mutatedWeights)
    });
  }
  
  dispose(){
    this.model.dispose()
  }
}