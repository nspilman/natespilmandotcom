import React from "react"
import { graphql, Link } from "gatsby"
import ContentPageWrapper from "../components/contentPageWrapper"
import SEO from "../components/seo"
import { backgroundColorPrimary } from "../styles/theme.css"
import * as styles from "../styles/global.css"

interface Props {
  readonly data: PageQueryData
  readonly pageContext: {
    previous?: Navigation
    next: Navigation
  }
  next?: any
}

import formattedDateString from "../utils/formattedDateString"
import { headers } from "../styles/theme.css"

export default function Template({ data, pageContext }: Props) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { title, date, description } = frontmatter

  const { next, previous } = pageContext
  return (
    <ContentPageWrapper>
      <SEO title={title} />
      <article id="home" className={styles.postStyle}>
        <div id="post-main">
          <div id="blog-title">
            <Link
              style={{
                textDecoration: "none",
              }}
              to="/blog"
            >
              <h1>Nate's Blog</h1>
            </Link>
            <hr />
          </div>
          <article className={styles.postBodyStyle}>
            <header>
              <h2 className={headers.h2} id="post-title">
                {title}
              </h2>
              <p>{description}</p>
              <time dateTime={date}>{formattedDateString(date)}</time>
            </header>
            <div className={backgroundColorPrimary}>
              <div id="post-body" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </article>
          <ul className={styles.nextAndPrevious}>
            {previous && (
              <li>
                <Link to={previous.fields.slug}>
                  {" "}
                  {previous.frontmatter.title}{" "}
                </Link>{" "}
              </li>
            )}
            {next && (
              <li>
                <Link to={next.fields.slug}> {next.frontmatter.title} </Link>
              </li>
            )}
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
    html: string
    frontmatter: {
      date: string
      title: string
      description: string
    }
  }
}

interface Navigation {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}
