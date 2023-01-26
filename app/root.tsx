import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import Navbar from "./components/Navbar";
import tailwindStyles from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles }
  // { rel: "stylesheet", href: globalStyles },
  // { rel: "stylesheet", href: navbarStyles }
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sam & Melissa Wedding",
  viewport: "width=device-width,initial-scale=1"
});

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* <Navbar /> */}

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
