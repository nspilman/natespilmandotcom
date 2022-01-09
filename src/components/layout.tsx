/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { ReactNode, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { darkTheme, lightTheme } from "../styles/theme.css"
import * as styles from "./layout.css"
import classnames from "classnames"

import Icons from "./icons"
import "../assets/css/style.css"

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState(lightTheme)
  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme)
    } else {
      setTheme(darkTheme)
    }
  }
  return (
    <>
      <div id="app" className={classnames(theme, styles.body)}>
        <header id="header">
          <div className={classnames("menu-wrap", styles.menuWrap)}>
            <input
              type="checkbox"
              className={classnames("toggler", styles.menuToggleIcon)}
            />
            <div className="hamburger">
              <div></div>
            </div>
            <div className="menu">
              <div>
                <div>
                  <ul>
                    <li>
                      <Link className={styles.menuItemStyles} to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.menuItemStyles} to="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.menuItemStyles} to="/music">
                        Music
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={styles.menuItemStyles}
                        to="https://natespilman.tech/media/pdfs/Resume_Aug_2020.pdf"
                      >
                        Resume
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div>
          <button className={styles.themeToggler} onClick={() => toggleTheme()}>
            Toggle Theme
          </button>
        </div>
        <div id="layout-wrapper">{children}</div>
        <footer className={styles.footer}>
          <Icons />
        </footer>
      </div>
    </>
  )
}

export default Layout
