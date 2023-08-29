import crypto from "crypto-js";

export const BASE_DIFFICULTY = 3;
export const MINE_RATE = 3000;

class Block {
    timestamp: number;
    lastHash: string | null;
    hash: string;
    data: any[];
    nonce: number;
    difficulty: number;

    constructor(timestamp: number, lastHash: string | null, hash: string, data: any[], nonce: number, difficulty: number) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty > BASE_DIFFICULTY ? difficulty : BASE_DIFFICULTY;
    }

   getData() {
        return{
            timestamp: this.timestamp,
            lastHash: this.lastHash,
            hash: this.hash,
            nonce: this.nonce,
            difficulty: this.difficulty,
            data: this.data,
        };
    }

    static async genesisBlock(): Promise<Block> {
        const lastHash = null;
        const data: any[] = [];
        const timestamp = new Date("01-01-01").getTime();
        const nonce = 4668;
        const hash = await Block.hash(timestamp, lastHash, data, nonce, BASE_DIFFICULTY);
        return new this(timestamp, lastHash, hash, data, nonce, BASE_DIFFICULTY);
    }

    static async mineBlock(lastBlock: Block, data: any[]): Promise<Block> {
        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = await Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static async hash(timestamp: number, lastHash: string | null, data: any[], nonce: number, difficulty: number): Promise<string> {
        const hashData = `${timestamp}${lastHash}${JSON.stringify(data)}${nonce}${difficulty}`;
        return crypto.SHA256(hashData).toString();
    }

    static async blockHash(block: Block): Promise<string> {
        const { timestamp, lastHash, data, nonce, difficulty } = block;
        return await Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock: Block, currentTime: number): number {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty < BASE_DIFFICULTY ? BASE_DIFFICULTY : difficulty;
    }
}

export default Block;
