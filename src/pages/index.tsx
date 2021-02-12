import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Icons from "../components/icons"
import Post from "../components/postCard"

type IndexPageProps = {
  data: {
    blog: {
      edges: [
        {
          node: {
            html: string,
            fields: {
              slug: string,
            }
            frontmatter: {
              date: string,
              description: string,
              favorite: boolean,
              published: boolean,
              title: string,
              tags: string[],
            }
          }
        }
      ]
    },
    music: {
      edges: [
        {
        node: {
          html:string,
          frontmatter: {
            date: string,
            description: string,
            favorite: boolean,
            title: string,
            published: boolean
          }
        }
      }
      ]
    }
  }
}


const IndexPage = ({ data }: IndexPageProps) => {
  const { blog, music } = data;
  const posts = blog.edges.map(post => post.node)
  const song = music.edges.map(song => song.node)[0]
  return (
    <Layout
    removePadding={true}>
      <SEO
        title="Home" />
      <section className="hero">
        <div className="hero-container">
          <h1>Hi, I'm Nate Spilman</h1>
          <p>
            I’m a software developer, musician and creative organizer.
            </p>
          <div className="nate"></div>
          <Icons />
        </div>
      </section>

      <main className="main">
        <div className="content-container">
          <div className="card-header">
            <h2>Nate's Blog</h2>
            <hr />
          </div>
          <div className="card-blog-container">
            {posts.map(
              post => {
                return (
                  <Post
                    post={post}
                    key={post.fields.slug}
                  />
                )
              }
            )}
          </div>
          <div className="button-container">
            <Link to="/blog">
              <button>Read</button>
            </Link>
          </div>
          <div className="card-header">
            <h2>Nate's Music</h2>
            <hr />
          </div>
          <div className="card-music">
            <h3>{song.frontmatter.title}</h3>
            <p>{song.frontmatter.description}</p>
            <div>

              <div dangerouslySetInnerHTML={{ __html: song.html }} />
            </div>
          </div>
          <div className="button-container">
            <Link to="/music"><button>Listen</button></Link>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query HomePageQuery {
    blog: allMarkdownRemark(
      limit:4
      sort: {fields: frontmatter___date, order: DESC}
    filter: { fields: { collection: { eq: "blog" } }}) {
    edges {
      node {
        fields{
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
  music: allMarkdownRemark(limit:1
    sort: {fields: frontmatter___date, order: DESC}
    filter: { fields: { collection: { eq: "music" } }}) {
    edges {
      node {
        html
        fields{
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
