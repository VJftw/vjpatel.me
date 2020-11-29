import Footer from './footer'
import Meta from './meta'
import Navbar from './nav'


export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen flex flex-col">
        <Navbar />
          <main className="my-10 flex-grow flex flex-col">{children}</main>
        <Footer />
      </div>
    </>
  )
}
