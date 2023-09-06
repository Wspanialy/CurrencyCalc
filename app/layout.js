import '@styles/globals.css'
import Nav from '@components/Nav'

export const metadata = {
  title: 'Currency Calculator',
  description: 'Currency Calculator powered by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Nav />
      <div>{children}</div>
    </body>
    </html>
  )
}
