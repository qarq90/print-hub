import Image from "next/image";
import Documents from "../../../../public/img/about-us/Documents.png";
import { Text } from "@/components/ui/text";

export const Problems = () => {
    return (
        <>
            <section className="text-left flex flex-col gap-4">
                <div className="flex flex-col-reverse md:flex-row gap-36 items-center">
                    <div className="relative rounded-full overflow-hidden">
                        <Image
                            src={Documents}
                            alt="Streamlined document workflow"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div>
                        <div className="flex flex-row">
                            <Text className="text-4xl">
                                The&nbsp;
                            </Text>
                            <Text weight="bold" className="text-4xl text-accent">
                                Problems
                            </Text>
                            <Text className="text-4xl">
                                &nbsp;we aim to solve
                            </Text>
                        </div>
                        <ul className="pl-5 mt-2 space-y-1">
                            <li>- Lengthy approval chains</li>
                            <li>- Manual form submissions</li>
                            <li>- Version control issues</li>
                            <li>- Status tracking difficulties</li>
                            <li>- Paper-based record keeping</li>
                        </ul>
                        <p className="mt-4">
                            Print Hub eliminates these pain points through
                            automation and digital workflows.
                        </p>
                    </div>
                </div>
            </section >
        </>
    )
}