import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Icons from "../components/icons"
import Post from "../components/postCard"

import Blog from "../types/blog"
import Music from "../types/music"
import { headers, textAlignLeft, marginAuto, hr } from "../styles/theme.css"
import * as styles from "../components/layout.css"

type IndexPageProps = {
  data: {
    blog: Blog
    music: Music
  }
}

const IndexPage = ({ data }: IndexPageProps) => {
  const { blog, music } = data
  const posts = blog.edges.map(post => post.node)
  const song = music.edges.map(song => song.node)[0]
  return (
    <Layout>
      <SEO title="Home" />
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={headers.h1}>Hi, I'm Nate Spilman</h1>
          <p className={marginAuto}>
            I’m a software developer, musician and creative organizer.
          </p>
          <div className={styles.nateIcon}></div>
          <Icons />
        </div>
      </section>

      <main>
        <div className={styles.contentContainer}>
          <div className={textAlignLeft}>
            <h2 className={headers.h2}>Nate's Blog</h2>
            <hr className={hr} />
          </div>
          <div className={styles.cardBlogContainer}>
            {posts.map(post => {
              return <Post post={post} key={post.fields.slug} />
            })}
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/blog">
              <button className={styles.buttonStyle}>Read</button>
            </Link>
          </div>
          <div className={textAlignLeft}>
            <h2 className={headers.h2}>Nate's Music</h2>
            <hr />
          </div>
          <div className={styles.cardMusic}>
            <h3 className={headers.h3}>{song.frontmatter.title}</h3>
            <p>{song.frontmatter.description}</p>
            <div>
              <div dangerouslySetInnerHTML={{ __html: song.html }} />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/music">
              <button className={styles.buttonStyle}>Listen</button>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    blog: allMarkdownRemark(
      limit: 4
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fields: { collection: { eq: "blog" } }
        frontmatter: { published: { eq: true } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            description
            favorite
            published
            title
            tags
          }
        }
      }
    }
    music: allMarkdownRemark(
      limit: 1
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fields: { collection: { eq: "music" } }
        frontmatter: { published: { eq: true } }
      }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            date
            description
            favorite
            published
            title
          }
        }
      }
    }
  }
`

export default IndexPage
