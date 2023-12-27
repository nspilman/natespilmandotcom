"use client";
import React, { useRef } from "react";

import Link from "next/link";
import { Icons } from "@/components/icons";

export function Layout({ children }: { children: React.ReactNode }) {
  const toggler = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (toggler?.current) {
      toggler.current.checked = false;
    }
  };
  return (
    <div id="app">
      <header id="header">
        <div className="menu-wrap">
          <input type="checkbox" className="toggler" ref={toggler} />
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu" onClick={onClick}>
            <div>
              <div>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>{/* <Link href="/music">Music</Link> */}</li>
                  {/* <li>
                      <Link href="https://natespilman.tech/media/pdfs/Resume_Aug_2020.pdf">
                        Resume
                      </Link>
                    </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div id="layout-wrapper">{children}</div>
      <footer className="footer">
        <Icons />
      </footer>
    </div>
  );
}
