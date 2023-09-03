const LinearResource = require('./LinearResource');

class LinearLogicModule {
    constructor() {
        this.resources = {};
    }

    // Method to add a resource to the module with a given quantity
    addResource(resourceName, quantity) {
        if (this.resources[resourceName]) {
            this.resources[resourceName].quantity += quantity;
        } else {
            this.resources[resourceName] = new LinearResource(resourceName, quantity);
        }
        return this.resources[resourceName];
    }

    // Method to conduct an operation consuming resources using linear logic
    // For simplicity, we assume that operation is a function of resource quantity
    applyOperation(operation, resourceName, quantity) {
        // Check if the resource exists and has a quantity enough to apply the operation
        if (this.resources[resourceName] && this.resources[resourceName].quantity >= quantity) {
            let result = this.resources[resourceName].applyOperation(operation, quantity);
            if (this.resources[resourceName].quantity === 0)
                delete this.resources[resourceName];
            return result;
        } else {
            throw new Error('Inadequate quantity for the requested operation.');
        }
    }

    // Method to check the availability of a resource with a given quantity
    checkAvailability(resourceName, quantity) {
        return this.resources[resourceName] && this.resources[resourceName].quantity >= quantity;
    }

    // Method to process a batch of operations, returns true if all operations were successful
    processBatch(operations) {
        try {
            operations.forEach(operation => {
                this.applyOperation(operation.operation, operation.resourceName, operation.quantity);

                // Potentially add some linear logic related operations here...
            });
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = LinearLogicModule;