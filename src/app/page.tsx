import { MainLayout } from "@/components/layouts/MainLayout";
import { Text } from "@/components/ui/text";
import { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  title: "Print Hub | Home",
  description: "PrintHub Home Page",
};

export default function Page() {
  return (
    <MainLayout>
      <Text size="5xl" weight="bold">PrintHub</Text>
      <Client />
    </MainLayout>
  );
}
