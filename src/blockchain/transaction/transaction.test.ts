import { MINING_REWARD } from "./transaction";
import Transaction from "./transaction";
import Wallet from "../wallet/wallet";

import { describe, it, expect, beforeEach } from 'vitest';

describe('Transaction', () => { 
    let transaction: Transaction, wallet: Wallet, recipient: string, amount: number;
    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'recipient-address';
        transaction = Transaction.newTransaction(wallet, recipient, amount) as Transaction;
    });

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey)?.amount).toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to recipient address', () => {
        expect(transaction.outputs.find(output => output.address === recipient)?.amount).toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
        expect(transaction.input?.amount).toEqual(wallet.balance);
    });

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toEqual(true);
    });

    it('invalidates a corrupt transaction', () => {
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toEqual(false);
    });

    describe('transacting with an amount that exceeds the balance', () => { 
        beforeEach(() => {
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount) as Transaction;
        });

        it('does not create transaction', () => {
            expect(transaction).toEqual(undefined);
        });
    });

    describe('and updating a transaction', () => { 
        let nextAmount: number, nextRecipient: string;
        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'next-recipient';
            transaction = transaction.update(wallet, nextRecipient, nextAmount) as Transaction;
        });

        it('subtracts next amount from the sender\'s output', () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey)?.amount).toEqual(wallet.balance - amount - nextAmount);
        });

        it('outputs an amount for the next recipient', () => {
            expect(transaction.outputs.find(output => output.address === nextRecipient)?.amount).toEqual(nextAmount);
        });
    });

    describe('creating a reward transaction', () => { 
        let blockchainWallet: Wallet;
        beforeEach(() => {
            blockchainWallet = Wallet.blockChainWallet();
            transaction = Transaction.rewardTransaction(wallet, blockchainWallet);
        });

        it(`reward the miner's wallet`, () => {
            expect(transaction.outputs.find(output => output.address === wallet.publicKey)?.amount)
            .toEqual(MINING_REWARD);
        });
    });
});
