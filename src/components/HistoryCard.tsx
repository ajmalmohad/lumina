import {Card, CardBody, CardHeader} from "@nextui-org/react";

function HistoryCard() {
  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 h-[500px] col-span-12 sm:col-span-4">
          <CardHeader>
            <h4 className="text-white font-medium text-large">Transaction History</h4>
          </CardHeader>
          <CardBody>
            Coming Soon...
          </CardBody>
        </Card>
    </>
  )
}

export default HistoryCard