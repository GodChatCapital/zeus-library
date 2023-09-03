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

const math = require('mathjs');
const Qubit = require('./Qubit');
const Gate = require('./Gate');

class Circuit {
    constructor() {
        this.qubits = [];
        this.gates = [];
    }

    addQubit(qubit) {
        if (!(qubit instanceof Qubit)) {
            throw new Error('Invalid qubit.');
        }
        this.qubits.push(qubit);
    }

    addGate(gate, targetIndex) {
        if (!(gate instanceof Gate)) {
            throw new Error('Invalid gate.');
        }
        if (targetIndex < 0 || targetIndex >= this.qubits.length) {
            throw new Error('Invalid target index.');
        }
        this.gates.push({ gate, targetIndex });
    }

    run() {
        this.qubits = this.gates.reduce((qubits, {gate, targetIndex}) => {
            const operation = gate.getOperation();
            const newState = math.multiply(operation, qubits[targetIndex].getState());
            qubits[targetIndex] = new Qubit(newState);
            return qubits;
        }, this.qubits);
    }

    getQuantumState() {
        return this.qubits.map(qubit => qubit.getState());
    }
}

module.exports = Circuit;