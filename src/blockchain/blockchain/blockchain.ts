import Block from './../block/block';

class BlockChain {
    chain: Block[];

    constructor() {
        const genesis = Block.genesisBlock();
        this.chain = [genesis];
    }

    addBlock(data: any): Block {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain: Block[]): boolean {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())) return false;
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            if (block.lastHash !== lastBlock.hash) return false;
            if (block.hash !== Block.blockHash(block)) return false;
        }
        return true;
    }

    replaceChain(chain: Block[]): void {
        if (chain.length <= this.chain.length) {
            console.log("Received Chain is not longer than the current chain");
        } else if (!this.isValidChain(chain)) {
            console.log("Received Chain is not valid");
        } else {
            console.log("Replacing blockchain with a new chain");
            this.chain = chain;
        }
    }
}

export default BlockChain;
