

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import formattedDateString from "../utils/formattedDateString"

export default function Template(props) {
  const {data, pageContext} = props;
  const { markdownRemark } = data 
  const { frontmatter, html } = markdownRemark

  const { next, previous } = pageContext
  return (
<Layout>
<article id="home" className="panel special">
      <div id="post-main">
        {/* <Title/> */}
        <article className="post">
          <header>
            <h2 id="post-title">{ frontmatter.title }</h2>
            <p>{ frontmatter.description }</p>
            <time className="published" dateTime={frontmatter.date}>{
              formattedDateString(frontmatter.date)
            }</time>
          </header>

          <div id="post-body" dangerouslySetInnerHTML={{__html:html}} />
        </article>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: '2em',
          }}
        >
          {
            previous && <li><Link to={previous.fields.slug}> {previous.frontmatter.title } </Link> </li>
          }
          {
            next && <li><Link to={next.fields.slug}> {next.frontmatter.title } </Link></li>
          }
        </ul>
      </div>
    </article>
  </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`
