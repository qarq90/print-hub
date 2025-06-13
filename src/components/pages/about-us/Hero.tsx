import Image from "next/image";
import Manager from "../../../../public/img/about-us/Manager.png";
import { Text } from "@/components/ui/text";

export const Hero = () => {
    return (
        <>
            <section className="text-left flex flex-col gap-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <Text weight="bold" size="3xl">Our Vision</Text>
                        <br />
                        <p className="my-4 text-justify">
                            Founded by Abdurrahman, Print Hub was born from
                            a simple need: to make document printing
                            effortless for both requesters and
                            administrators. Frustrated with clunky
                            processes, we set out to build a modern solution
                            that leverages cutting-edge technologies to
                            streamline the entire workflow.
                        </p>
                        <p className="text-justify">
                            Our platform eliminates paperwork
                            back-and-forth, reduces errors, and saves
                            valuable time for everyone involved in the
                            document printing process.
                        </p>
                    </div>
                    <div className="relative rounded-full overflow-hidden">
                        <Image
                            src={Manager}
                            alt="Streamlined document workflow"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}