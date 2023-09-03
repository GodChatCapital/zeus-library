class Gate {
    constructor(name) {
        this.name = name;

        switch (this.name.toLowerCase()) {
            case 'x':
                // Pauli-X gate
                this.matrix = [
                    [0, 1],
                    [1, 0]
                ];
                break;
            case 'y':
                // Pauli-Y gate
                this.matrix = [
                    [0, -1],
                    [1, 0]
                ];
                break;
            case 'z':
                // Pauli-Z gate
                this.matrix = [
                    [1, 0],
                    [0, -1]
                ];
                break;
            case 'h':
                // Hadamard gate
                this.matrix = [
                    [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
                    [1 / Math.sqrt(2), -1 / Math.sqrt(2)]
                ];
                break;
            default:
                throw new Error('Unrecognized gate');
        }
    }

    applyGateToState(state) {
        if (state.length !== 2) {
            throw new Error('Invalid state');
        }

        const newState = [];
        for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
            let result = 0;
            for (let columnIndex = 0; columnIndex < 2; columnIndex++) {
                result += state[columnIndex] * this.matrix[rowIndex][columnIndex];
            }
            newState.push(result);
        }

        // Normalize the new state
        const magnitudeSquared = newState[0]**2 + newState[1]**2;
        const magnitude = magnitudeSquared ** 0.5;
        newState[0] /= magnitude;
        newState[1] /= magnitude;

        return newState;
    }
}

// Export the Gate class for other modules to use
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Gate;
else
    window.Gate = Gate;