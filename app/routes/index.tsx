import Navbar from "~/components/Navbar";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/navbar.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
  return (
    <>
      <script src='/scripts/index.js' defer></script>
      {/* <Navbar /> */}
      <div id='time-to-wedding'>
        <div className='time'>
          <span>Days</span>
          <span id='days'>00</span>
        </div>
        <div className='time'>
          <span>Hours</span>
          <span id='hours'>00</span>
        </div>
        <div className='time'>
          <span>Minutes</span>
          <span id='minutes'>00</span>
        </div>
        <div className='time'>
          <span>Seconds</span>
          <span id='seconds'>00</span>
        </div>
      </div>
    </>
  );
}
