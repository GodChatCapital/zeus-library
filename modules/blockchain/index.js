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

// SHA-256 is widely used in blockchain for hashing purposes
const crypto = require('crypto');

class Blockchain {
    constructor() {
        this.chain = [];
        // Creating genesis block
        this.createBlock(0, '0');
    }

    // Method to create a new block
    createBlock(nonce, previousHash, data) {
        let block = {
            index: this.chain.length,
            timestamp: Date.now(),
            data: data,
            nonce: nonce,
            previousHash: previousHash,
            hash: this.hashBlockData(nonce, previousHash, data)
        }

        this.chain.push(block);
        return block;
    }

    // Method to hash data of a block
    hashBlockData(nonce, previousHash, data) {
        let blockData = nonce.toString() + previousHash.toString() + JSON.stringify(data);
        let hashFunction = crypto.createHash('sha256');
        let hash = hashFunction.update(blockData).digest('hex');
        return hash;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Method to validate the blockchain
    validateChain() {
        for(let i = 1; i < this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== this.hashBlockData(currentBlock.nonce, currentBlock.previousHash, currentBlock.data)){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }

    // Method to find a block in the blockchain
    findBlock(predicate) {
        return this.chain.find(predicate);
    }
}

module.exports = Blockchain;