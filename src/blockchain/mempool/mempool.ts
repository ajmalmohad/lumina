import Transaction from "../transaction/transaction";

class MemPool {
    transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction(transaction: Transaction): void {
        const transactionWithId = this.transactions.find(t => t.id === transaction.id);
        if (transactionWithId) {
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address: string): Transaction | undefined {
        return this.transactions.find(t => {
            return t.input && t.input.address === address
        });
    }

    validTransactions(): Transaction[] {
        return this.transactions.filter(transaction => {
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return total + output.amount;
            }, 0);

            if (transaction.input && transaction.input.amount !== outputTotal) {
                console.log(`Invalid transaction from ${transaction.input.address}.`);
                return false;
            }

            if (transaction.input && !Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid Signature from ${transaction.input.address}.`);
                return false;
            }

            return true;
        });
    }

    clear(): void {
        this.transactions = [];
    }
}

export default MemPool;
