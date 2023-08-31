import {Card, CardBody, CardHeader, Input, Chip} from "@nextui-org/react";
import { useState } from "react";
import {Button} from "@nextui-org/react";
import { useWalletStore } from "../store/walletStore";
import { useMemPoolStore, Transaction, TransactionOutput } from "../store/memPoolStore";
import { useBlockChainStore, Block } from "../store/blockChainStore";
import CryptoJS from 'crypto-js';
import { v1 as uuidv1 } from 'uuid';

function TransferCard() {

  const { balance, publicKey, changeBalance, sign } = useWalletStore()
  const { transactions, addTransaction, setTransactions } = useMemPoolStore()
  const { chain } = useBlockChainStore()

  const [toAddress, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  
  const calculateBalance = (chain: Block[]): number => {
      let currentBalance:number = balance;
      let allTransactions: any[] = [...transactions];

      let found = false;
      for (let i = chain.length-1; i >= 0; i--) {
          if (found) break;
          chain[i].data.forEach((transaction: any) => {
            allTransactions.push(transaction);
              if(transaction.input.address === publicKey) found = true;
          });
      }

      const walletInputs = allTransactions.filter((transaction: any) => {
          return transaction.input.address === publicKey;
      });

      let startTime = 0;
      if(walletInputs.length > 0){
          const recentInput = walletInputs.reduce((prev: any, current: any) => {
              return prev.input.timestamp > current.input.timestamp ? prev : current;
          });

          currentBalance = recentInput.outputs.find((output: any) => output.address === publicKey).amount;
          startTime = recentInput.input.timestamp;
      }
      
      allTransactions.forEach((transaction: any) => {
          if(transaction.input.timestamp > startTime){
              transaction.outputs.find((output: any) => {
                  if(output.address === publicKey) {
                      currentBalance += output.amount;
                  }
              });
          }
      });

      return currentBalance;
  }

  const existingTransaction = (address: string): Transaction | undefined => {
    return transactions.find(t => {
        return t.input && t.input.address === address
    });
  }

  const updateOrAddTransaction = (transaction: Transaction): void => {
      const transactionWithId = transactions.find(t => t.id === transaction.id);
      if (transactionWithId) {
          transactions[transactions.indexOf(transactionWithId)] = transaction;
          setTransactions(transactions);
      } else {
          addTransaction(transaction);
      }
  }

  const update = (transaction: Transaction, recipient: string, amount: number):void => {
      
    const senderOutput = transaction.outputs.find(output => output.address === publicKey);
      if(!senderOutput) return;

      if (amount > senderOutput.amount) {
          console.log(`Amount: ${amount} exceeds balance.`);
          return;
      }

      senderOutput.amount -= amount;
      transaction.outputs.push({ amount, address: recipient });

      transaction.input = {
        timestamp: Date.now(),
        amount: balance,
        address: publicKey,
        signature: sign(CryptoJS.SHA256(JSON.stringify(transaction.outputs)).toString()),
      };
  }

  const transactionWithOutputs = (outputs: TransactionOutput[]): Transaction => {
      const transaction: Transaction = {
        id: uuidv1(),
        input: null,
        outputs: [],
      };
      transaction.outputs.push(...outputs);
      transaction.input = {
        timestamp: Date.now(),
        amount: balance,
        address: publicKey,
        signature: sign(CryptoJS.SHA256(JSON.stringify(transaction.outputs)).toString()),
      };
      return transaction;
  }

  const newTransaction = (recipient: string, amount: number): Transaction | undefined => {
      if (amount > balance) {
          console.log(`Amount: ${amount} exceeds balance.`);
          return undefined;
      }

      return transactionWithOutputs([
          { amount: balance - amount, address: publicKey },
          { amount, address: recipient },
      ]);
  }

  const createTransaction = (recipient: string, amount: number): void => {
      changeBalance(calculateBalance(chain));
      
      if (amount > balance){
          console.log(`Amount: ${amount} exceeds current balance: ${balance}`);
          return;
      }

      let transaction = existingTransaction(publicKey);
      if(transaction) {
          update(transaction, recipient, amount);
          setTransactions(transactions);
      } else {
          transaction = newTransaction(recipient, amount);
          if(transaction) updateOrAddTransaction(transaction);
      }
  }

  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 col-span-12 sm:col-span-6 h-[500px]">
          <CardHeader>
            <h4 className="text-white font-medium text-large">Transfer</h4>
          </CardHeader>
          <CardBody>
            <Input isClearable type="text" variant={"bordered"} label="To Address" value={toAddress} onValueChange={setAddress} />
            <Input className="mt-5" type="number" variant={"bordered"} label="Amount" value={amount} onValueChange={setAmount} />
            <div className="mt-5">
              <Chip color="default">{balance - (parseFloat(amount) || 0) >= 0 ? "Remaining: "+ (balance - (parseFloat(amount) || 0)).toString() : "Invalid" }</Chip>
            </div>
            <div className="mt-5">
              <Button 
                color="primary" 
                isDisabled={!parseFloat(amount) || toAddress==="" || balance - parseFloat(amount) < 0 }
                onClick={() => { createTransaction(toAddress, parseFloat(amount));
                  console.log(transactions);
                  
                 }}
              >Send LUM</Button> 
            </div>
          </CardBody>
        </Card>
    </>
  )
}

export default TransferCard