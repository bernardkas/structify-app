'use client'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const NavbarButton = () => {
  return (
    <div>
        <Link href="/dashboard">
        <Button variant="link" className="text-white">
            Dashboard
        </Button>
        </Link>
        <Link href="/clients">
        <Button variant="link" className="text-white">
            Clients
        </Button>
        </Link>

        <Link href="/projects">
        <Button variant="link" className="text-white">
            Projects
        </Button>
        </Link>
        <Link href="/employees">
        <Button variant="link" className="text-white">
            Employees
        </Button>
        </Link>
        <Button disabled variant="link" className="text-white">
            Invoices
        </Button>
       
    </div>
  )
}

export default NavbarButton