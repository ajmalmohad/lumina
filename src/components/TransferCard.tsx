import {Card, CardBody, CardHeader, Input, Chip} from "@nextui-org/react";
import { useState } from "react";
import {Button} from "@nextui-org/react";
import { wallet } from "../store/store";

function TransferCard() {

  const [toAddress, setAddress] = useState("");
  const [amount, setAmount] = useState("");

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
              <Chip color="default">{wallet.balance - (parseFloat(amount) || 0) >= 0 ? "Remaining: "+ (wallet.balance - (parseFloat(amount) || 0)).toString() : "Invalid" }</Chip>
            </div>
            <div className="mt-5">
              <Button 
                color="primary" 
                isDisabled={!parseFloat(amount) || toAddress==="" || wallet.balance - parseFloat(amount) < 0 }
                onClick={()=>{console.log(wallet);
                }}
              >Send LUM</Button> 
            </div>
          </CardBody>
        </Card>
    </>
  )
}

export default TransferCard