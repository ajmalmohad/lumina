import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface WalletStore {
  balance: number,
  keyPair: any,
  publicKey: string,
  changeBalance: (balance: number) => void,
  sign: (data: string) => EC.Signature
}

const keyPair = ec.genKeyPair();

export const useWalletStore = create<WalletStore>()(
    devtools(
      // persist(
        (set) => ({
            balance: 500,
            keyPair: keyPair,
            publicKey: keyPair.getPublic().encode('hex', false).toString(),
            changeBalance: (balance: number) => set(() => ({ balance: balance })),
            sign: (data: string) => { return keyPair.sign(data) }
        }),
        { name: 'walletStore' }
      // )
    )
)