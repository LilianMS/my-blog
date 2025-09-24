import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b absolute top-0 w-full">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            My Blog
          </Link>
          
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}