import { Avatar, CardBody, Snippet } from "@nextui-org/react";
import {Card, CardHeader, Select, SelectItem} from "@nextui-org/react";
import { useBlockchainStore } from "../store/store";
import { useState } from "react";

function WalletCard() {
  const { wallet } = useBlockchainStore()

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
                      <small className="text-default-500">Balance ({value})</small>
                      <h4 className="font-bold text-large">{value == "LUM" ? wallet.balance : wallet.balance*1.2}</h4>
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
                <Snippet hideSymbol codeString={wallet.publicKey} className="w-full overflow-hidden"><p className="w-full flex justify-around">{wallet.publicKey.substring(0,10)+"...."+wallet.publicKey.substring(wallet.publicKey.length-8, wallet.publicKey.length)}</p></Snippet>
              </div>

          </CardBody>
        </Card>
    </>
  )
}

export default WalletCard