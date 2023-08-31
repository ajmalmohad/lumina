import {Card, CardHeader} from "@nextui-org/react";

function BlockExplorerCard() {
  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 h-[500px] col-span-12 sm:col-span-12">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <h4 className="text-white/90 font-medium text-xl">Block Explorer</h4>
            </CardHeader>
        </Card>
    </>
  )
}

export default BlockExplorerCard