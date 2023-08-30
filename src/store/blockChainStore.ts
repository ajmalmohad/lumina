import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import CryptoJS from "crypto-js";

const BASE_DIFFICULTY = 3;

type Block = {
    timestamp: number;
    lastHash: string | null;
    hash: string;
    data: any[];
    nonce: number;
    difficulty: number;
}

interface BlockChainStore {
  genesis: Block;
  chain: Block[];
}

const timestamp = new Date("01-01-01").getTime();
const lastHash = null;
const data:any = [];
const nonce = 4668;
const difficulty = BASE_DIFFICULTY;
const hashData = `${timestamp}${lastHash}${JSON.stringify(data)}${nonce}${difficulty}`;

const genesis = {
    timestamp: timestamp,
    lastHash: lastHash,
    hash: CryptoJS.SHA256(hashData).toString(),
    data: data,
    nonce: nonce,
    difficulty: BASE_DIFFICULTY,
}

export const useBlockChainStore = create<BlockChainStore>()(
    devtools(
      persist(
        (set) => ({
            genesis: genesis,
            chain: [genesis],
            addBlock: (block: Block) => set((state) => ({ chain: [...state.chain, block] })),
        }),
        { name: 'blockChainStore' }
      )
    )
)