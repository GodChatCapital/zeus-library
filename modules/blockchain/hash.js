const crypto = require('crypto');

class BlockHash {
    constructor() {
    }

    // Method to create a hash for the data of a block
    createHash(nonce, previousHash, data) {
        let blockData = nonce.toString() + previousHash.toString() + JSON.stringify(data);
        let hashFunction = crypto.createHash('sha256');
        let hash = hashFunction.update(blockData).digest('hex');
        return hash;
    }

    // Method to validate if the existing hash of a block is valid
    validateHash(nonce, previousHash, data, existingHash) {
        let newHash = this.createHash(nonce, previousHash, data);
        return newHash === existingHash;
    }
}

module.exports = BlockHash;