import React from 'react'
import Link from 'next/link'
import text from '../config/common'

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__logo">
        <Link href="/"><a>{text.title}</a></Link>
      </h1>
    </header>
  )
}

export default Header