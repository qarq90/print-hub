import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";
// import Client from "./client";
import { LuUpload, LuUserPlus } from "react-icons/lu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { printHubFeatures } from "@/data/home-data";

export const metadata: Metadata = {
  title: "Print Hub | Home",
  description: "PrintHub Home Page",
};

export default function Page() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-8 w-full justify-center items-center my-72">
        <div className="flex flex-row">
          <Text weight="bold" className="text-7xl">Print</Text>
          {/* <Text weight="bold" className="text-7xl p-1.5 rounded-md text-black bg-[#f79817]">Print</Text> */}
          <Text weight="bold" className="text-7xl">hub</Text>
        </div>
        <Text className="text-xl">Nobody prints it better.</Text>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Link href="/new/print">
            <Button><LuUpload /> Schedule Prints</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline"><LuUserPlus /> Sign In</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full justify-center items-center my-72">
        <div className="flex flex-row items-center justify-center">
          <Text weight="bold" className="text-7xl">Why choose&nbsp;</Text>
          <Text weight="bold" className="text-7xl">Print</Text>
          {/* <Text weight="bold" className="text-7xl p-1.5 rounded-md text-black bg-[#f79817]">Print</Text> */}
          <Text weight="bold" className="text-7xl">hub?</Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
          {printHubFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn("flex flex-col gap-3 rounded-lg border bg-gray-500/5 border-foreground/10 justify-center items-center px-4 py-8 hover:shadow-md transition-all")}
              >
                <Icon size={36} className="text-accent" />
                <Text size="xl" weight="semibold">{feature.header}</Text>
                <Text className="text-center text-foreground/80">
                  {feature.text}
                </Text>
              </div>
            );
          })}
        </div>
      </div>

      {/* <Client /> */}
    </MainLayout >
  );
}
