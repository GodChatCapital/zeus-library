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

class Qubit {
    constructor(alpha = [1, 0], beta = [0, 0]) {
        if (!this.isNormalized(alpha, beta)) {
            throw new Error("The provided quantum state is not normalized.");
        }

        this.state = {
            alpha,
            beta
        };
    }
    
    // Calculates the modulus squared of a complex number given its real and imaginary parts.
    modulusSquared(real, imaginary) {
        return real**2 + imaginary**2;
    }

    // Ensures that the sum of the modulus squared of alpha and beta is effectively 1 (normalized state).
    isNormalized(alpha, beta) {
        const precision = 0.00001;
        const norm = this.modulusSquared(alpha[0], alpha[1]) + this.modulusSquared(beta[0], beta[1]);
        return (Math.abs(1 - norm) <= precision);
    }

    applyGate(matrix) {
        // Applying the gate operation onto a qubit is effectively a matrix multiplication operation
        const newAlpha = [(matrix[0][0]*this.state.alpha[0] - matrix[0][1]*this.state.alpha[1]), 
                          (matrix[0][0]*this.state.alpha[1] + matrix[0][1]*this.state.alpha[0])];   
                      
        const newBeta = [(matrix[1][0]*this.state.beta[0] - matrix[1][1]*this.state.beta[1]), 
                         (matrix[1][0]*this.state.beta[1] + matrix[1][1]*this.state.beta[0])];
        
        if (!this.isNormalized(newAlpha, newBeta)) {
            throw new Error("The gate operation results in a non-normalized state.");
        }

        this.state = {
            alpha: newAlpha,
            beta: newBeta
        };
    }
}

module.exports = Qubit;