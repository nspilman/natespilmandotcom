/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { ReactNode } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { darkTheme, lightTheme } from "../styles/theme.css"
import * as styles from "./layout.css"
import classnames from "classnames"

import Icons from "./icons"
import "../assets/css/style.css"

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <div id="app" className={classnames(darkTheme, styles.body)}>
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
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link to="/music">Music</Link>
                    </li>
                    <li>
                      <Link to="https://natespilman.tech/media/pdfs/Resume_Aug_2020.pdf">
                        Resume
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div id="layout-wrapper">{children}</div>
        <footer className={styles.footer}>
          <Icons />
        </footer>
      </div>
    </>
  )
}

export default Layout
