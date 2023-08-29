import BlockChain from "./blockchain.js";
import Block, { BASE_DIFFICULTY } from "./../block/block";

import { describe, it, expect, beforeEach } from 'vitest';

describe('BlockChain', () => {
    let blockchain: BlockChain;
    let blockchain2: BlockChain;
    let genesis: Block;
    
    beforeEach(async () => {
        genesis = await Block.genesisBlock();
        blockchain = new BlockChain(genesis);
        blockchain2 = new BlockChain(genesis);
    });

    it("starts with the genesis block",async () => {
        expect(blockchain.chain[0]).toEqual(await Block.genesisBlock());
    });
    
    it("adds a new block",async () => {
        const data = "newblock";
        await blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    });

    it("validates a valid chain", async () => {
        blockchain2.addBlock('foo');
        expect(await blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it("invalidates corrupt genesis", async () => {
        blockchain2.chain[0] = new Block(Date.now(), '', '', [], 0, BASE_DIFFICULTY);
        expect(await blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("invalidates a corrupt chain", async () => {
        blockchain2.addBlock('foo');
        blockchain2.chain[1] = new Block(Date.now(), '', '', [], 0, BASE_DIFFICULTY);
        expect(await blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it("replaces the blockchain", () => {
        blockchain2.addBlock('foo');
        blockchain.replaceChain(blockchain2.chain);
        expect(blockchain.chain).toEqual(blockchain2.chain);
    });
});
