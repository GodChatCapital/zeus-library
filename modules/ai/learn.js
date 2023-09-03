const dataValidator = require('../util/dataValidator');
const performanceMetrics = require('../util/performanceMetrics');

class AIModel {
  constructor() {
    this.data = [];
  }

  // Train the model on an array of { input: ... , output: ... } pairs
  train(trainingData) {
    
    // Validate the training data
    if (!dataValidator.checkTrainingData(trainingData)) {
      throw new Error('Invalid training data');
    }

    // Clear previously trained data
    this.data = [];

    // Assume a basic learning algorithm, where we just store all data and use it as reference for prediction.
    this.data = trainingData;
  }

  // Predict the output for a new input
  predict(input) {
    
    // Validate the input
    if (!dataValidator.checkInputData(input)) {
      throw new Error('Invalid input data');
    }

    // Assuming a naive prediction approach where we find and return the output of the most similar past input.
    // In a real AI model, this should be replaced with sophisticated prediction mechanisms.
    let closestDataPoint = this.data.reduce((closest, current) => {
      let currentDistance = performanceMetrics.calculateDifference(input, current.input);
      let closestDistance = performanceMetrics.calculateDifference(input, closest.input);
      return currentDistance < closestDistance ? current : closest;
    });

    return closestDataPoint.output;
  }
}

module.exports = AIModel;