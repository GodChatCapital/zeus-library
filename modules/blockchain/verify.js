const BlockHash = require('./hash');

class BlockVerifier {
    
    constructor(blockchain) {
        // Gives BlockVerifier an instance of the entire blockchain
        this.blockchain = blockchain;

        // and an instance of the BlockHash for hash computing and verifying
        this.blockHash = new BlockHash();
    }

    // Method to validate the entire blockchain
    verifyEntireChain() {
        for(let i = 1; i < this.blockchain.chain.length; i++){
            let currentBlock = this.blockchain.chain[i];
            let previousBlock = this.blockchain.chain[i - 1];

            // Validate the reference to the previous block's hash
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

            // Validate the hash stored in current block
            if(!this.blockHash.validateHash(currentBlock.nonce, currentBlock.previousHash, currentBlock.data, currentBlock.hash)){
                return false;
            }
        }

        return true;
    }

    // Method to validate a specific block
    verifyBlock(block) {

        let previousBlockIndex = block.index-1;
        if(previousBlockIndex<0){
            // For validating genesis block
            return this.blockHash.validateHash(block.nonce, block.previousHash, block.data, block.hash);
        } else {
            let previousBlock = this.blockchain.chain[block.index-1];
        
        
            // Validate the reference to the previous block's hash
            if(block.previousHash !== previousBlock.hash){
                return false;
            }

            // Validate the hash stored in block
            if(!this.blockHash.validateHash(block.nonce, block.previousHash, block.data, block.hash)){
                return false;
            }

            return true;
        }
    }
}

module.exports = BlockVerifier;