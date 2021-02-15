import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import notFoundImage from "../assets/img/404forest.jpg";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <section id="not-found">
     <h1> 404 Page Not Found </h1>
     <h2>A Bit lost?</h2>
     <h4>Follow the path back Home </h4>
     <Link to="/">
      <img id="not-found-image" src={notFoundImage} />
     </Link>
   </section>
  </Layout>
)

export default NotFoundPage
