import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import tailwindStyles from "../styles/tailwind.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  // { rel: "stylesheet", href: globalStyles },
  // { rel: "stylesheet", href: navbarStyles }
]

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sam & Melissa Wedding",
  viewport: "width=device-width,initial-scale=1",
})

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        {/* <Navbar /> */}
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "production" ? <LiveReload /> : null}
        <Footer />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Layout>
      {/* <Navbar /> */}
      <Outlet />
    </Layout>
  )
}

export function CatchBoundary() {
  return (
    <Layout>
      {/* <Navbar /> */}
      <div className="flex flex-col gap-6 min-h-screen px-4 bg-white items-center justify-center">
        <h1 className="tracking-widest text-sage font-bold uppercase text-2xl">
          404 | Not Found
        </h1>
        <Link className="px-8 py-2 shadow bg-sage rounded text-white" to={"/"}>
          Go back home
        </Link>
      </div>
    </Layout>
  )
}
