import Link from 'next/link'

const Header = () => (
    <div className="header">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
    </div>
)

export default Header