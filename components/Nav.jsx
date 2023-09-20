import Link from "next/link"

const Nav = () => {
  return (
    <nav className="bg-gray-800 py-4 text-white">
    <div className="container mx-auto flex justify-center">
        <Link href="/" className="text-xl font-semibold px-4 hover:text-gray-400">Main page</Link>
        <Link href="/exchange_rate" className="text-xl font-semibold px-4 hover:text-gray-400">Exchange rate</Link>
        <Link href="/gold_rate" className="text-xl font-semibold px-4 hover:text-gray-400">Gold rate</Link>
      </div>
    </nav>
  )
}

export default Nav