import {Card, CardHeader, Image} from "@nextui-org/react";

function SettingsCard() {
  return (
    <>
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 h-[500px] col-span-12 sm:col-span-6">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <h4 className="text-white/90 font-medium text-xl">Settings</h4>
            </CardHeader>
            <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="/images/card-example-5.jpeg"
            />
        </Card>
    </>
  )
}

export default SettingsCard