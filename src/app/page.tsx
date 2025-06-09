import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";
import Client from "./client";
import { LuCloudLightning, LuShieldEllipsis, LuUpload, LuUserPlus, LuUsers } from "react-icons/lu";
import { LuCheck, LuClock, LuList, LuShieldCheck } from "react-icons/lu";
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
        <Text weight="bold" className="text-7xl">PrintHub</Text>
        <Text className="text-xl">Your one stop for all printouts.</Text>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Link href="/upload-files">
            <Button><LuUpload /> Schedule Prints</Button>
          </Link>
          <Link href="/authentication">
            <Button variant="outline"><LuUserPlus /> Sign Up</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 my-72">
        <Text weight="bold" className="text-7xl">Why Choose PrintHub?</Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {printHubFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn("flex flex-col gap-3 rounded-lg border border-foreground/10 justify-center items-center px-4 py-8 hover:shadow-md transition-all", feature.columns === 1 ? "col-span-1" : "col-span-2")}
              >
                <Icon size={36} />
                <Text size="xl" weight="semibold">{feature.header}</Text>
                <Text className="text-center text-foreground/80">
                  {feature.text}
                </Text>
              </div>
            );
          })}
        </div>
      </div>




      <Client />
    </MainLayout >
  );
}
