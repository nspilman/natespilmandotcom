/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Icons from "./icons"
import "../assets/css/style.css"

const Layout = ({ children, removePadding = false}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div id="app">
        <header id="header">
          <div className="menu-wrap">
            <input type="checkbox" className="toggler" />
            <div className="hamburger"><div></div></div>
            <div className="menu">
              <div>
                <div>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/music">Music</Link></li>
                    <li><Link to="https://natespilman.tech/media/pdfs/Resume_Aug_2020.pdf">Resume</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div id='layout-wrapper' style={{padding: removePadding ? 0 : '5rem'}}>
          {children}
        </div>
        <footer className="footer">
          <Icons/>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
