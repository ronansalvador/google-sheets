import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="h-12 bg-teal-700 flex justify-evenly items-center">
      <Link href="/" className="hover:text-teal-200">
        Table
      </Link>
      <Link href="/edit" className="hover:text-teal-200">
        AddRow
      </Link>
    </nav>
  )
}

export default Header
