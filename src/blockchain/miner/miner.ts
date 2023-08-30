import BlockChain from "../blockchain/blockchain.js";
import MemPool from "../mempool/mempool.js";
import Transaction from "../transaction/transaction.js";
import Wallet from "../wallet/wallet.js";

export const MINING_REWARD = 50;

class Miner {
    blockchain: BlockChain;
    memPool: MemPool;
    wallet: Wallet;

    constructor(blockchain: BlockChain, memPool: MemPool, wallet: Wallet) {
        this.blockchain = blockchain;
        this.memPool = memPool;
        this.wallet = wallet;
        // this.p2pServer = p2pServer;
    }

    mine() {
        const validTransactions = this.memPool.validTransactions();
        validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockChainWallet()))
        const block = this.blockchain.addBlock(validTransactions);
        // this.p2pServer.syncChains();
        this.memPool.clear();
        // this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

export default Miner;