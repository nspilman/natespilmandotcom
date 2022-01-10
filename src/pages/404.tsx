import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import notFoundImage from "../assets/img/404forest.jpg"
import ContentPageWrapper from "../components/contentPageWrapper"
import { headers } from "../styles/theme.css"
import * as styles from "./404.css"

const NotFoundPage = () => (
  <ContentPageWrapper>
    <SEO title="404: Not found" />
    <section id="not-found">
      <h1> 404 Page Not Found </h1>
      <h2 className={headers.h2}>A Bit lost?</h2>
      <h4>Follow the path back Home </h4>
      <Link to="/">
        <img
          id="not-found-image"
          className={styles.image}
          src={notFoundImage}
        />
      </Link>
    </section>
  </ContentPageWrapper>
)

export default NotFoundPage
