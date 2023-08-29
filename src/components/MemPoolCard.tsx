import {Card, CardHeader, Image} from "@nextui-org/react";

function MemPoolCard() {
  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 col-span-12 sm:col-span-8 h-[500px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">Memory Pool</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="/images/card-example-4.jpeg"
          />
        </Card>
    </>
  )
}

export default MemPoolCard