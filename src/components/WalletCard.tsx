import { Avatar, CardBody, Snippet } from "@nextui-org/react";
import {Card, CardHeader} from "@nextui-org/react";

let text: string = "Loremipsumolorsit amet consectetur adipisicing elit. Autem explicabo voluptates mollitia ipsam ducimus sapiente quia est culpa eligendi voluptatum, commodi error aut perferendis, ipsum praesentium, dignissimos deleniticonsecteturcumque."

function WalletCard() {
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
              <p className="text-tiny text-white/100 uppercase font-bold mb-2">Public Address</p>
              <Snippet hideSymbol codeString={text} className="w-full overflow-hidden"><p className="w-full flex justify-around">{text.substring(0,12)+"...."+text.substring(text.length-8, text.length)}</p></Snippet>
            </div>
          </CardBody>
        </Card>
    </>
  )
}

export default WalletCard