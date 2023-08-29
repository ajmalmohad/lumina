import Wallet, { INITIAL_BALANCE } from "./wallet";
import MemPool from "../mempool/mempool";
import BlockChain from "../blockchain/blockchain";
import Transaction from "../transaction/transaction";
import { describe, it, expect, beforeEach } from 'vitest';

describe('Wallet', () => { 
    let wallet: Wallet, mp: MemPool, bc: BlockChain;

    beforeEach(() => {
        wallet = new Wallet();
        mp = new MemPool();
        bc = new BlockChain();
    });

    describe('creating a transaction', () => {
        let transaction: Transaction, sendAmount: number, recipient: string;

        beforeEach(() => {
            sendAmount = 50;
            recipient = "random-recipient";
            transaction = wallet.createTransaction(recipient, sendAmount, bc, mp) as Transaction;
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, mp);
            });

            it('doubles the `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey)?.amount)
                .toEqual(wallet.balance - sendAmount * 2);
            });

            it('clones the `sendAmount` output for the recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });
    });

    describe('calculating a balance', () => {
        let addBalance: number, repeatAdd: number, senderWallet: Wallet;

        beforeEach(() => {
            senderWallet = new Wallet();
            addBalance = 100;
            repeatAdd = 3;
            for (let i = 0; i < repeatAdd; i++) {
                senderWallet.createTransaction(wallet.publicKey, addBalance, bc, mp);
            }
            bc.addBlock(mp.transactions);
        });

        it('calculates the balance for blockchain transactions matching the recipient', () => {
            expect(wallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE + (addBalance * repeatAdd));
        });

        it('calculates the balance for blockchain transactions matching the sender', () => {
            expect(senderWallet.calculateBalance(bc)).toEqual(INITIAL_BALANCE - (addBalance * repeatAdd));
        });

        describe('and the recipient conducts a transaction', () => {
            let subtractBalance: number, recipientBalance: number;

            beforeEach(() => {
                mp.clear();
                subtractBalance = 60;
                recipientBalance = wallet.calculateBalance(bc);
                wallet.createTransaction(senderWallet.publicKey, subtractBalance, bc, mp);
                bc.addBlock(mp.transactions);
            });

            describe('and the sender sends another transaction to the recipient', () => {
                beforeEach(() => {
                    mp.clear();
                    senderWallet.createTransaction(wallet.publicKey, addBalance, bc, mp);
                    bc.addBlock(mp.transactions);
                });

                it('calculates the recipient balance only using transaction since it\'s most recent one', () => {
                    expect(wallet.calculateBalance(bc)).toEqual(recipientBalance - subtractBalance + addBalance);
                });
            });
        });
    });
});
