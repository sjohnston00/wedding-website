import React from "react";
import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='#rsvp'>RSVP</Link>
        </li>
        <li>
          <Link to='#'>Location</Link>
        </li>
        <li>
          <Link to='#'>Our Story</Link>
        </li>
        <li>
          <Link to='#'>FAQs</Link>
        </li>
        <li>
          <Link to='#'>Itenerary</Link>
        </li>
      </ul>
    </nav>
  );
}
