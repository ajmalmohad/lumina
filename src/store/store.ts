import BlockChain from '../blockchain/blockchain/blockchain'
import Wallet from '../blockchain/wallet/wallet'
import MemPool from '../blockchain/mempool/mempool'
import Miner from '../blockchain/miner/miner'

export const blockchain = new BlockChain()
export const wallet = new Wallet()
export const memPool = new MemPool()
export const miner = new Miner(blockchain, memPool, wallet)

import { createContext } from 'react';

export const WalletContext = createContext(wallet);