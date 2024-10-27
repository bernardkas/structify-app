"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface NaviagtionMenuButtonProps {
    onClose?: () => void
}

const components: { title: string; href: string}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Clients",
    href: "/clients",
  },
  {
    title: "Projects",
    href: "/projects",
  },
]

export default function NavigationMenuButton({onClose}: NaviagtionMenuButtonProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
        {components.map(item => (
            <Link onClick={onClose} href={item.href} legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent rounded-full`}>
              {item.title}
            </NavigationMenuLink>
          </Link>
        ))}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Employee</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1">
              <ListItem onClick={onClose} href="/employees" title="Employee">
               Manage employee
              </ListItem>
              <ListItem onClick={onClose} href="/employees/add-hours" title="Add hours">
              Add employee daily hours worked
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <Link onClick={onClose} href='/invoice' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent rounded-full`}>
              Invoice
            </NavigationMenuLink>
          </Link>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
