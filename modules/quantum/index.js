const Qubit = require('./Qubit');
const Gate = require('./Gate');
const Circuit = require('./Circuit');

// Simulator class
class QuantumSimulator {
    constructor() {
        this.circuit = new Circuit();
    }
    
    // Adding a qubit to the circuit
    addQubit(state) {
        const qubit = new Qubit(state);
        this.circuit.addQubit(qubit);
        return this;
    }
    
    // Applying a gate to a qubit
    applyGate(gateName, targetIndex) {
        const gate = new Gate(gateName);
        this.circuit.addGate(gate, targetIndex);
        return this;
    }
    
    // Running the circuit and getting the final quantum state
    run() {
        this.circuit.run();
        return this.circuit.getQuantumState();
    }
}

module.exports = QuantumSimulator;