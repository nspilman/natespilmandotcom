

import React from "react"
import { graphql, Link } from "gatsby"
import ContentPageWrapper from "../components/contentPageWrapper"
import SEO from "../components/seo"

interface Props {
  readonly data: PageQueryData
  readonly pageContext: {
    previous?: Navigation,
    next: Navigation
  }
  next?: any
}

import formattedDateString from "../utils/formattedDateString"

export default function Template({ data, pageContext }: Props) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { title, date, description } = frontmatter

  const { next, previous } = pageContext
  return (
    <ContentPageWrapper>
      <SEO
        title={title} />
      <article
        style={{
          paddingTop: "5rem",
          paddingLeft: "3rem",
          paddingRight: "3rem",
        }}
        id="home" className="panel special">
        <div id="post-main">
          <div id="blog-title">
            <Link style={{
                  textDecoration: 'none'
                }} to="/blog">
              <h1>Nate's Blog</h1>
            </Link>
            <hr />
          </div>
          <article className="post"
                 style={{
                  maxWidth:'1200px',
                  margin:'auto',
                  padding:'3rem 2rem'
                }}
          >
            <header>
              <h2 id="post-title">{title}</h2>
              <p>{description}</p>
              <time className="published" dateTime={date}>{
                formattedDateString(date)
              }</time>
            </header>

            <div id="post-body" 
            dangerouslySetInnerHTML={{ __html: html }} />
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
    </ContentPageWrapper>
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

interface PageQueryData {
  markdownRemark: {
    html: string,
    frontmatter: {
      date: string,
      title: string,
      description: string
    }
  }
}

interface Navigation {
  fields: {
    slug: string
  },
  frontmatter: {
    title: string
  }
}
