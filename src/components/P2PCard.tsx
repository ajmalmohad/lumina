import {Card, CardHeader} from "@nextui-org/react";

function P2PCard() {
  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 h-[500px] col-span-12 sm:col-span-6">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <h4 className="text-white/90 font-medium text-xl">P2P Connection & Sync</h4>
          </CardHeader>
        </Card>
    </>
  )
}

export default P2PCard