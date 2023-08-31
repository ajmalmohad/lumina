import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ec as EC } from 'elliptic';

export interface TransactionOutput {
    amount: number;
    address: string;
}

export interface TransactionInput {
    timestamp: number;
    amount: number;
    address: string;
    signature: EC.Signature;
}

export interface Transaction {
    id: string;
    input: TransactionInput | null;
    outputs: TransactionOutput[];
}

interface MemPoolStore {
    transactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    setTransactions: (transactions: Transaction[]) => void;
}

export const useMemPoolStore = create<MemPoolStore>()(
    devtools(
      persist(
        (set) => ({
            transactions: [],
            addTransaction: (transaction: Transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
            setTransactions: (transactions: Transaction[]) => set(()=> ({transactions: transactions}))
        }),
        { name: 'memPoolStore' }
      )
    )
)