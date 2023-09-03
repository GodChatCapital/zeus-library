/*

╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╮╱╭╮
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃╱┃┃
╭━━━┳━━┳╮╭┳━━╮╱╱┃┃╭┫╰━┳━┳━━┳━┳╮╱╭╮
┣━━┃┃┃━┫┃┃┃━━╋━━┫┃┣┫╭╮┃╭┫╭╮┃╭┫┃╱┃┃
┃┃━━┫┃━┫╰╯┣━━┣━━┫╰┫┃╰╯┃┃┃╭╮┃┃┃╰━╯┃
╰━━━┻━━┻━━┻━━╯╱╱╰━┻┻━━┻╯╰╯╰┻╯╰━╮╭╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰━━╯

Zeus-library

Zeus is an advanced data management solution combining blockchain, nanotech, Large Language Models (LLMs), AI, and quantum computing to offer unparalleled performance and security.

https://www.npmjs.com/package/zeus-library

https://github.com/godchatcapital/zeus-library

*/

const AIModel = require('./learn');
const Optimizer = require('./optimize');

class AIManager {
  constructor() {
    this.models = {};
    this.optimizer = new Optimizer();
  }

  // Create a new learning model
  createModel(modelId) {
    if (this.models[modelId]) {
      throw new Error(`Model already exists with id: ${modelId}`);
    }
    this.models[modelId] = new AIModel();
  }

  // Train a model with training data, using optimized parameters
  trainModel(modelId, trainingData, learningRate=0.1, maxIteration=1000) {
    const targetModel = this.models[modelId];
    if (!targetModel) {
      throw new Error(`Cannot find model with id: ${modelId}`);
    }
    
    // Define a cost (error) function for the optimizer.
    const costFunction = (parameters) => {
      targetModel.setParameters(parameters);
      let predictionErrors = trainingData.map(pair => {
        const prediction = targetModel.predict(pair.input);
        return pair.output - prediction;
      });
      // Cost is the average squared error.
      let cost = predictionErrors.reduce((sum, error) => sum + error * error, 0) / predictionErrors.length;
      return cost;
    };
    
    // Run gradient descent to find the best parameters.
    let initialValues = targetModel.getParameters();
    let optimalParameters = this.optimizer.gradientDescent(costFunction, initialValues, learningRate, maxIteration);
    targetModel.setParameters(optimalParameters);

    // Return the cost, as an indication of how well the training went.
    return costFunction(optimalParameters);
  }

  // Predict an output with a specific model
  predictWithModel(modelId, input) {
    const targetModel = this.models[modelId];
    if (!targetModel) {
      throw new Error(`Cannot find model with id: ${modelId}`);
    }
    return targetModel.predict(input);
  }
}

module.exports = AIManager;