"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { LuChevronDown } from "react-icons/lu"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root className="my-2" data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  background,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & { background?: boolean }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "rounded-md",
        background && "bg-gray-500/5 border border-foreground/10 first:rounded-t-md last:rounded-b-md",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex mb-1 items-center justify-between">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring px-4 focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <LuChevronDown className="text-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 scale-125" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  padding,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & { padding?: boolean }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div
        className={cn(
          "pt-0",
          padding ? "pb-4 px-4" : "pb-0 px-0 mb-4 mt-2",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
