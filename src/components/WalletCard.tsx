import { Avatar, CardBody, Snippet } from "@nextui-org/react";
import {Card, CardHeader, CardFooter, Select, SelectItem} from "@nextui-org/react";
import { WalletContext } from "../store/store";
import { useContext, useState } from "react";
import {Chip} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

function WalletCard() {

  const wallet = useContext(WalletContext)

  const currencies = [
    {
      value: "LUM",
      label: "LUM"
    },
    {
      value: "USD",
      label: "USD"
    },
  ]

  const [value, setValue] = useState("LUM");

  const handleSelectionChange = (e:any) => {
    setValue(e.target.value);
  };

  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 col-span-12 sm:col-span-6 h-[500px]">
          <CardHeader className="flex-row !items-start justify-between">
            <div>
              <p className="text-tiny text-white/60 uppercase font-bold">Wallet</p>
              <h4 className="text-white font-medium text-large">Username</h4>
            </div>
            <Avatar isBordered color="secondary" name="User" />
          </CardHeader>
          <CardBody>
              <div>
                <Card isBlurred className="py-4">
                  <CardBody className="overflow-visible py-2 flex flex-row justify-between">
                    <div className="flex-1">
                      <small className="text-default-500">Balance <Chip size="sm" color="warning" variant="dot">{value}</Chip></small>
                      <h4 className="font-bold text-large">{value == "LUM" ? Math.round(wallet.balance * 100) / 100 : Math.round(wallet.balance * 1.5 * 100) / 100}</h4>
                    </div>
                    <div className="flex-1">
                      <Select
                        color="success"
                        label="Currency"
                        placeholder="Currency"
                        defaultSelectedKeys={[value]}
                        className="max-w-xs"
                        onChange={handleSelectionChange}
                      >
                        {currencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </CardBody>
                </Card>
              </div>
             
              <div className="mt-6">
                <p className="text-tiny text-white/100 uppercase font-bold mb-2">Public Address</p>
                <Snippet 
                  hideSymbol 
                  codeString={wallet.publicKey.toString()} 
                  className="w-full overflow-hidden">
                    <p className="w-full flex justify-around">
                      {wallet.publicKey.toString().substring(0,10)+"...."+wallet.publicKey.toString().substring(wallet.publicKey.toString().length-8, wallet.publicKey.toString().length)}
                    </p>
                </Snippet>
              </div>

              <div className="mt-6">
                <p className="text-tiny text-white/100 uppercase font-bold mb-2">Faucet</p>
                <div className="flex flex-row items-end gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    labelPlacement="outside"
                    endContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">LUM</span>
                      </div>
                    }
                  />
                  <Button radius="full" className="bg-secondary rounded-lg text-white">
                    Get LUM
                  </Button>
                </div>
              </div>
          </CardBody>

          <CardFooter>
            <Button className="py-2 text-tiny text-white/80">Know More</Button>
          </CardFooter>
        </Card>
    </>
  )
}

export default WalletCard