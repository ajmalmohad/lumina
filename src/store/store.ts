import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import BlockChain from '../blockchain/blockchain/blockchain'
import Wallet from '../blockchain/wallet/wallet'
import MemPool from '../blockchain/mempool/mempool'
import Miner from '../blockchain/miner/miner'

type BlockchainState = {
  blockchain: BlockChain,
  wallet: Wallet,
  memPool: MemPool,
  miner: Miner
}

const blockchain = new BlockChain()
const wallet = new Wallet()
const memPool = new MemPool()
const miner = new Miner(blockchain, memPool, wallet)

const initialState: BlockchainState = {
    blockchain,
    wallet,
    memPool,
    miner
}

export const useBlockchainStore = create<BlockchainState>()(
    persist(
      (set) => ({
        ...initialState,
        reset: () => {
            set(initialState)
        },
      }),
      { name: 'blockchainStore' }
    )
)