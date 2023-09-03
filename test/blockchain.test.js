const assert = require('chai').assert;
const Blockchain = require('../modules/blockchain');
const Hash = require('../modules/blockchain/hash');
const Verify = require('../modules/blockchain/verify');

describe('Blockchain', () => {
    describe('Blockchain core functionality', () => {
        it('should have a genesis block', () => {
            let blockchain = new Blockchain();
            assert.isNotEmpty(blockchain.chain);
            assert.equal(blockchain.chain[0].previousHash, "0");
        });

        // Generate more tests based on your blockchain functionality
    });

    describe('Hash', () => {
        it('should generate consistent hash', () => {
            const data = "Test String";
            const hash = Hash(data);
            
            assert.equal(hash, Hash(data));
        });

        // Generate more tests based on your hash functionality
    });

    describe('Verify', () => {
        it('should verify block integrity', () => {
            let blockchain = new Blockchain();
            blockchain.addBlock({amount: 5});
            
            const isValid = Verify(blockchain.chain);
            
            assert.isTrue(isValid);
        });

        // generate more tests based on your verify functionality
    });
});