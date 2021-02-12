import React from "react"
import { graphql } from "gatsby"
import Post from "../components/postCard";
import SEO from "../components/seo"

import Layout from "../components/layout"
import BlogType from "../types/blog";

type BlogProps = {
  data: {
    blog:BlogType
  }
}

const Blog = ({ data }: BlogProps) => {
  const { blog } = data;
  const posts = blog.edges.map(post => post.node)

  return (
    <Layout>
      <SEO title="Nate's Blog"/>
      {/* <Title /> */}
      <div id="blog-page">
        <div id="blog-post-wrapper">
          <article id="blog" className="panel special">
            <div className="content">
              <h1>The Blog</h1>
              <div className="card-blog-container">
                {posts.map(post => <Post post={post} key={post.id}/>)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query AllBlogPosts {
    blog: allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
    filter: { fields: { collection: { eq: "blog" } }}) {
    edges {
      node {
        id
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
  }
`

export default Blog
