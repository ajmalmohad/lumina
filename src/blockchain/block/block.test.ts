// @vitest-environment jsdom
import Block from './block';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Block', () => {
    let data: any;
    let lastBlock: Block;
    let block: Block;

    beforeEach(async () => {
        data = 'bar';
        lastBlock = await Block.genesisBlock();
        block = await Block.mineBlock(lastBlock, data);
        console.log(lastBlock);
        console.log(block);
        
    });

    it("sets the `data` to match given input", () => {
        expect(block.data).toEqual(data);
    });

    it("sets the `lastHash` to match hash of last block", () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it("generates a hash that matches the difficulty", () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lowers the difficulty for slowly mined blocks', async () => {
        const adjustedDifficulty = await Block.adjustDifficulty(block, block.timestamp + 360000);
        expect(adjustedDifficulty).toEqual(block.difficulty - 1);
    });

    it('raises the difficulty for quickly mined blocks', async () => {
        const adjustedDifficulty = await Block.adjustDifficulty(block, block.timestamp + 1);
        expect(adjustedDifficulty).toEqual(block.difficulty + 1);
    });
});