"use client"
import { MainLayout } from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import { printHubFeatures, printhubTestimonials } from "@/data/home-data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
    LuList,
    LuUpload,
    LuUser,
    LuUserPlus,
    LuUsers,
    LuSettings,
    LuShoppingCart,
    LuTruck,
    LuArrowRight,
    LuPlus,
} from "react-icons/lu"
import { Text } from "@/components/ui/text"

export default function Client() {
    return (
        <MainLayout>
            <div className="flex flex-col gap-8 w-full justify-center items-center mt-72 mb-36">
                <div className="flex flex-row">
                    <Text weight="bold" className="text-5xl md:text-7xl">
                        Print
                    </Text>
                    <Text weight="bold" className="text-5xl md:text-7xl text-accent">
                        hub
                    </Text>
                </div>
                <Text className="text-xl">Nobody prints it better</Text>
                <div className="flex md:flex-row flex-col-reverse gap-4 items-center justify-center">
                    <Link href="/new/print">
                        <Button variant="accent" className="text-black">
                            <LuUpload /> Schedule Prints
                        </Button>
                    </Link>
                    <Link href="/new/order">
                        <Button variant="accent" className="text-black">
                            <LuList />
                            Order Now
                        </Button>
                    </Link>
                    {/* <Link href="/sign-in/google">
                        <Button variant="outline">
                            <LuUserPlus /> Sign In
                        </Button>
                    </Link> */}
                </div>
            </div>

            <div className="flex flex-col gap-12 w-full justify-center items-center my-32 px-4">
                <div className="text-center flex flex-col">
                    <Text weight="bold" className="text-5xl mb-4">
                        How It <span className="text-accent">works</span>?
                    </Text>
                    <Text className="text-xl text-foreground/70">Simple steps to get your prints or items delivered</Text>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                                <LuPlus size={32} className="text-accent" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                                1
                            </div>
                        </div>
                        <Text weight="semibold" size="lg" className="mb-2">
                            Create Job
                        </Text>
                    </div>

                    <LuArrowRight size={28} className="hidden md:block text-accent/50" />

                    <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                                <LuSettings size={32} className="text-accent" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                                2
                            </div>
                        </div>
                        <Text weight="semibold" size="lg" className="mb-2">
                            Customize Options
                        </Text>
                    </div>

                    <LuArrowRight size={28} className="hidden md:block text-accent/50" />

                    <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                                <LuShoppingCart size={32} className="text-accent" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                                3
                            </div>
                        </div>
                        <Text weight="semibold" size="lg" className="mb-2">
                            Confirm Order
                        </Text>
                    </div>

                    <LuArrowRight size={28} className="hidden md:block text-accent/50" />

                    <div className="flex flex-col items-center text-center group">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                                <LuTruck size={32} className="text-accent" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                                4
                            </div>
                        </div>
                        <Text weight="semibold" size="lg" className="mb-2">
                            Get Delivery
                        </Text>
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <Link href="/new/print">
                        <Button variant="accent" className="text-black">
                            <LuUpload /> Schedule Prints
                        </Button>
                    </Link>
                    <Link href="/new/order">
                        <Button variant="accent" className="text-black">
                            <LuList />
                            Order Now
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-8 w-full justify-center items-center my-32">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <Text weight="bold" className="text-5xl md:text-7xl">
                        Why choose&nbsp;
                    </Text>
                    <Text weight="bold" className="text-5xl md:text-7xl">
                        Print
                    </Text>
                    <Text weight="bold" className="text-5xl md:text-7xl text-accent">
                        hub
                    </Text>
                    <Text weight="bold" className="text-5xl md:text-7xl">
                        ?
                    </Text>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {printHubFeatures.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className={cn(
                                    "flex flex-col gap-3 rounded-lg border bg-gray-500/5 border-foreground/10 justify-center items-center px-8 py-8 hover:shadow-md transition-all",
                                )}
                            >
                                <Icon size={36} className="text-accent" />
                                <Text size="xl" weight="semibold">
                                    {feature.header}
                                </Text>
                                <Text className="text-center text-foreground/80">{feature.text}</Text>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-12 w-full justify-center items-center my-32">
                <Text weight="bold" className="w-full justify-center flex text-4xl flex-row items-center">
                    What our <LuUsers className="mx-4 text-accent" /> say...
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {printhubTestimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4 rounded-xl border bg-gray-500/5 border-foreground/10 p-6 hover:shadow-md transition-all"
                        >
                            <Text className="text-accent flex flex-row gap-2 items-center">
                                <LuUser size={24} /> {testimonial.name}
                            </Text>
                            <Text size="lg" className="text-left text-foreground/70">
                                &#34;{testimonial.feedback}&#34;
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
