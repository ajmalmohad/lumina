import ChainUtil from "../chainutil/chainutil";
import Transaction from "../transaction/transaction";

export const INITIAL_BALANCE: number = 500;

class Wallet {
    balance: number;
    keyPair: any;
    publicKey: string;

    constructor () {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(): string {
        return `Wallet
        Balance:    ${this.balance}
        Public Key: ${this.publicKey.toString()}
        `;
    }

    sign(dataHash: string): any { 
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient: string, amount: number, blockchain: any, memPool: any): Transaction | void {
        this.balance = this.calculateBalance(blockchain);

        if (amount > this.balance){
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`);
            return;
        }

        let transaction = memPool.existingTransaction(this.publicKey);
        if(transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            memPool.updateOrAddTransaction(transaction);
        }

        return transaction;
    }

    calculateBalance(blockchain: any): number {
        let balance = this.balance;
        let transactions: any[] = [];

        let found = false;
        for (let i = blockchain.chain.length-1; i >= 0; i--) {
            if (found) break;
            blockchain.chain[i].data.forEach((transaction: any) => {
                transactions.push(transaction);
                if(transaction.input.address === this.publicKey) found = true;
            });
        }

        const walletInputs = transactions.filter((transaction: any) => {
            return transaction.input.address === this.publicKey;
        });

        let startTime = 0;
        if(walletInputs.length > 0){
            const recentInput = walletInputs.reduce((prev: any, current: any) => {
                return prev.input.timestamp > current.input.timestamp ? prev : current;
            });

            balance = recentInput.outputs.find((output: any) => output.address === this.publicKey).amount;
            startTime = recentInput.input.timestamp;
        }
         
        transactions.forEach((transaction: any) => {
            if(transaction.input.timestamp > startTime){
                transaction.outputs.find((output: any) => {
                    if(output.address === this.publicKey) {
                        balance += output.amount;
                    }
                });
            }
        });

        return balance;
    }

    static blockChainWallet(): Wallet {
        const blockchainWallet = new this();
        blockchainWallet.publicKey = 'blockchain-wallet';
        return blockchainWallet;
    }
}

export default Wallet;
