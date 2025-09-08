import Image from "next/image";
import Contact from "../../../../public/img/contact-us/Contact.png"
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export const Mail = () => {
    return (
        <>
            <section className="w-full text-left gap-4 flex flex-col-reverse md:flex-row items-center justify-between md:px-24 mb-10">
                <div className="flex flex-col gap-2 md:w-1/2">
                    <Text weight="bold" size="3xl">Customer Support</Text>
                    <p>Email: rahman.242466.it@mhssce.ac.in</p>
                    <p>Email: scythethroughtheheart05@gmail.com</p>
                    <p>Phone: +91 8879662240</p>
                    <a
                        className="mt-4 flex md:w-1/3 cursor-pointer bg-accent text-black items-center justify-center rounded-md gap-2 shadow-md transition-all duration-200 hover:opacity-75"
                        href="mailto:abc@gmail.com">
                        <Button variant="accent">
                            Mail Us
                        </Button>
                    </a>
                </div>
                <Image
                    src={Contact}
                    alt="Streamlined document workflow"
                    className="w-80 h-80 object-cover rounded-full"
                />
            </section>
        </>
    )
}