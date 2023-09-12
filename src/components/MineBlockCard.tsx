import {Card, CardBody, CardHeader, Button} from "@nextui-org/react";
import { Transaction, useMemPoolStore } from "../store/memPoolStore";
import { Block, useBlockChainStore } from "../store/blockChainStore";
import CryptoJS from 'crypto-js';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

const MINE_RATE = 3000;
const BASE_DIFFICULTY = 2;

function MineBlockCard() {

  const { transactions, setTransactions } = useMemPoolStore();
  const { chain, addBlock } = useBlockChainStore();

  const verifySignature = (publicKey: string, signature: EC.Signature, dataHash: string): boolean => {
      return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
  }

  const hashdata = (data: any): string => {
    return CryptoJS.SHA256(JSON.stringify(data)).toString();
  }


  const verifyTransaction = (transaction: Transaction): Boolean => {
    if (transaction.input == null) return false; // Beware
        
      return verifySignature(
          transaction.input.address,
          transaction.input.signature,
          hashdata(transaction.outputs)
      );
  }

  const validTransaction = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter(transaction => {
        const outputTotal = transaction.outputs.reduce((total, output) => {
            return total + output.amount;
        }, 0);

        if (transaction.input && transaction.input.amount !== outputTotal) {
            console.log(`Invalid transaction from ${transaction.input.address}.`);
            return false;
        }

        if (transaction.input && !verifyTransaction(transaction)) {
            console.log(`Invalid Signature from ${transaction.input.address}.`);
            return false;
        }

        return true;
    });
  }

  const mine = () => {
    console.log("Mining");
    const lastBlock = chain[chain.length - 1];
    const validTransactions = validTransaction(transactions);
    const block: Block = mineBlock(lastBlock, validTransactions);
    addBlock(block);
    console.log(block);  
    setTransactions([]);
  }

  
  const hashInfo = (timestamp: number, lastHash: string | null, data: any[], nonce: number, difficulty: number): string => {
    const hashData = `${timestamp}${lastHash}${JSON.stringify(data)}${nonce}${difficulty}`;
    return CryptoJS.SHA256(hashData).toString();
  }

  const adjustDifficulty = (lastBlock: Block, currentTime: number): number => {
    let { difficulty } = lastBlock;
    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
    console.log(difficulty, lastBlock.timestamp - currentTime);
    return difficulty < BASE_DIFFICULTY ? BASE_DIFFICULTY : difficulty;
  }

  const mineBlock = (lastBlock: Block, data: any): Block => {
    const lastHash = lastBlock.hash;
        let hash, timestamp;
        let { difficulty } = lastBlock;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = adjustDifficulty(lastBlock, timestamp);
            hash = hashInfo(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        return { timestamp, lastHash, hash, data, nonce, difficulty };
  } 

  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 h-[500px] col-span-12 sm:col-span-12">
          <CardHeader>
            <h4 className="text-white/90 font-medium text-xl">Mine a Block</h4>
          </CardHeader>

          <CardBody>
            <Button color="secondary" onClick={mine}>Mine</Button>
          </CardBody>
        </Card>
    </>
  )
}

export default MineBlockCard;