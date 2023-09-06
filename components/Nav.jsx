import Link from "next/link"

const Nav = () => {
  return (
    <nav>
        <Link href="/" className="">Main page</Link>
        <Link href="/exchange_rate" className="">Exchange rate</Link>
        <Link href="/gold_rate" className="">Gold rate</Link>
    </nav>
  )
}

export default Nav