'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface NavbarButtonProps {
    className?: string
    textColor?: string
    onClose?: () => void
}

const NavbarButton = ({className, textColor = 'text-white', onClose}: NavbarButtonProps) => {
  return (
    <div className={className}>
        <Link href="/dashboard">
        <Button onClick={onClose} variant="link" className={textColor}>
            Dashboard
        </Button>
        </Link>
        <Link href="/clients">
        <Button onClick={onClose} variant="link" className={textColor}>
            Clients
        </Button>
        </Link>

        <Link href="/projects">
        <Button onClick={onClose} variant="link" className={textColor}>
            Projects
        </Button>
        </Link>
        <Link href="/employees">
        <Button onClick={onClose} variant="link" className={textColor}>
            Employees
        </Button>
        </Link>

        <Button disabled variant="link" className={textColor}>
            Invoices
        </Button>
       
    </div>
  )
}

export default NavbarButton