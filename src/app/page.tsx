import { Metadata } from "next";
import Client from "./client";

export const metadata: Metadata = {
  title: "Print Hub | Home",
  description: "PrintHub Home Page",
};

export default function Page() {
  return (
    <Client />
  );
}
