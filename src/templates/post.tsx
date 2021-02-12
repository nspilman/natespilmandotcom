

import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import formattedDateString from "../utils/formattedDateString"

export default function Template({ data, pageContext }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const {title, date, description} = frontmatter

  const { next, previous } = pageContext
  return (
    <Layout>
      <SEO
      title={title}/>
      <article id="home" className="panel special">
        <div id="post-main">
          {/* <Title/> */}
          <article className="post">
            <header>
              <h2 id="post-title">{title}</h2>
              <p>{description}</p>
              <time className="published" dateTime={date}>{
                formattedDateString(date)
              }</time>
            </header>

            <div id="post-body" dangerouslySetInnerHTML={{ __html: html }} />
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
              previous && <li><Link to={previous.fields.slug}> {previous.frontmatter.title} </Link> </li>
            }
            {
              next && <li><Link to={next.fields.slug}> {next.frontmatter.title} </Link></li>
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
