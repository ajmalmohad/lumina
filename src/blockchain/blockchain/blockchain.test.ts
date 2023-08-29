import BlockChain from "./blockchain.js";
import Block, { BASE_DIFFICULTY } from "./../block/block";

import { describe, it, expect, beforeEach } from 'vitest';

describe('BlockChain', () => {
    let blockchain: BlockChain;
    let blockchain2: BlockChain;
    
    beforeEach(() => {;
        blockchain = new BlockChain();
        blockchain2 = new BlockChain();
    });

    it("starts with the genesis block", () => {
        expect(blockchain.chain[0]).toEqual(Block.genesisBlock());
    });
    
    it("adds a new block", () => {
        const data = "newblock";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    });

    it("validates a valid chain", () => {
        blockchain2.addBlock('foo');
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it("invalidates corrupt genesis", () => {
        blockchain2.chain[0] = new Block(Date.now(), '', '', [], 0, BASE_DIFFICULTY);
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("invalidates a corrupt chain", () => {
        blockchain2.addBlock('foo');
        blockchain2.chain[1] = new Block(Date.now(), '', '', [], 0, BASE_DIFFICULTY);
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("replaces the blockchain", () => {
        blockchain2.addBlock('foo');
        blockchain.replaceChain(blockchain2.chain);
        expect(blockchain.chain).toEqual(blockchain2.chain);
    });
});
