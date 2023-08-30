import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TransactionOutput {
    amount: number;
    address: string;
}

interface TransactionInput {
    timestamp: number;
    amount: number;
    address: string;
    signature: string;
}

interface Transaction {
    id: string;
    input: TransactionInput | null;
    outputs: TransactionOutput[];
}

interface MemPoolStore {
    transactions: Transaction[];
}

export const useMemPoolStore = create<MemPoolStore>()(
    devtools(
      persist(
        (set) => ({
            transactions: [],
            addTransaction: (transaction: Transaction) => set((state) => ({ transactions: [...state.transactions, transaction] })),
        }),
        { name: 'memPoolStore' }
      )
    )
)