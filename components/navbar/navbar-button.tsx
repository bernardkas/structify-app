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
import { useTranslations } from 'next-intl';

interface NaviagtionMenuButtonProps {
    onClose?: () => void
    className?: string
    linkClassName?: string
}


export default function NavigationMenuButton({onClose, className, linkClassName}: NaviagtionMenuButtonProps) {
  
  const t = useTranslations('Navbar');
  
  const components: { title: string; href: string}[] = [
    {
      title: t('dashboard'),
      href: "/dashboard",
    },
    {
      title: t('clients'),
      href: "/clients",
    },
  ]
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn(className)}>
      <NavigationMenuItem>
        {components.map(item => (
            <Link key={item.title} onClick={onClose} href={item.href} legacyBehavior passHref>
            <NavigationMenuLink className={`${cn(navigationMenuTriggerStyle(), linkClassName)} bg-transparent rounded-full`}>
              {item.title}
            </NavigationMenuLink>
          </Link>
        ))}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">{t('projects.title')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1">
              <ListItem onClick={onClose} href="/projects" title={t('projects.title')}> 
               {t('projects.description')}
              </ListItem>
              <ListItem onClick={onClose} href="/projects/add-hours" title={t('projects.addHours')}>
              {t('projects.addHoursDescription')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>


        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">{t('employees.title')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1">
              <ListItem onClick={onClose} href="/employees" title={t('employees.title')}>
               {t('employees.desc')}
              </ListItem>
              <ListItem onClick={onClose} href="/employees/add-hours" title={t('employees.addHours')}>
              {t('employees.addHoursDescription')}
              </ListItem>
              <ListItem onClick={onClose} href="/employees/assign-employee" title={t('employees.assignEmployee')}>
              {t('employees.assignEmployeeDescription')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <Link onClick={onClose} href='/invoice' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent rounded-full`}>
              {t('invoice')}
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
