import {Card, CardHeader, CardBody, Chip, Button, Code, Divider} from "@nextui-org/react";
import { useMemPoolStore } from "../store/memPoolStore";

function MemPoolCard() {

  const { transactions } = useMemPoolStore();

  let rows = [];
  for (let i = 0; i < Math.min(transactions.length, 6); i++) {
    rows.push(
      <Card isBlurred className={`bg-background/60 dark:bg-default-100/50 col-span-2 lg:col-span-1`}>

        <CardHeader className="justify-between">
            <Chip color="success" size="sm">Transaction</Chip> 
            <Code>{transactions[i].input?.address.slice(0, 8)+"..."+transactions[i].input?.address.slice(-6)}</Code>
        </CardHeader>

        <CardBody className="pt-0 pb-3 px-3 flex flex-row">
          <div className="flex flex-col flex-1 rounded px-2 py-1">
            <small className="text-default-500">Input</small>
            <Chip className="mt-2">{transactions[i].input?.amount} LUM</Chip>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col flex-1 rounded px-2 py-1">
            <small className="text-default-500">Spent</small>
            <Chip className="mt-2">{transactions[i].outputs.reduce((accumulator, currentValue, index) => {
              if (index > 0) return accumulator + currentValue.amount
              else return accumulator
            }, 0)} LUM</Chip>
          </div>
          <Divider orientation="vertical" />
          <div className="flex flex-col flex-1 rounded px-2 py-1">
            <small className="text-default-500">Balance</small>
            <Chip className="mt-2">{transactions[i].outputs[0].amount} LUM</Chip>
          </div>
        </CardBody>

      </Card>
    );
  }

  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 col-span-12 sm:col-span-8 h-[500px]">
          
          <CardHeader className="justify-between">
            <h4 className="text-white font-medium text-large">Memory Pool</h4>
            <Button className="py-2 text-tiny text-white/80">View Full</Button>
          </CardHeader>

          <CardBody className="m-auto gap-2 grid grid-cols-2 grid-rows-3 px-2 py-2 lg:hidden">
            {
              transactions.length ? rows.slice(0, 3): <></>
            }
          </CardBody>

          <CardBody className="m-auto gap-2 lg:grid grid-cols-2 grid-rows-3 px-2 py-2 hidden">
            {
              transactions.length ? rows.slice(0, 6): <></>
            }
          </CardBody>

        </Card>
    </>
  )
}

export default MemPoolCard