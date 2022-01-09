import React from "react"
import { graphql, Link } from "gatsby"
import ContentPageWrapper from "../components/contentPageWrapper"
import SEO from "../components/seo"
import styled from "styled-components"
import { backgroundColorPrimary } from "../styles/theme.css"

interface Props {
  readonly data: PageQueryData
  readonly pageContext: {
    previous?: Navigation
    next: Navigation
  }
  next?: any
}

const StyledPost = styled.article`
  padding: 5rem 3rem;
  @media (max-width: 1068px) {
    padding: 5rem 0.5rem;
  }
`

const StyledPostBody = styled.article`
  max-width: 1200px;
  margin: auto;
  padding: 3rem 2rem;
  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`

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
      <StyledPost id="home" className={backgroundColorPrimary}>
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
          <StyledPostBody>
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
          </StyledPostBody>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: "2em",
            }}
          >
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
      </StyledPost>
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
