import React from "react"
import { Link, graphql } from "gatsby"
import Post from "../components/postCard";

import Layout from "../components/layout"

const Blog = ({ data }) => {
  const { blog } = data;
  const posts = blog.edges.map(post => post.node)

  return (
    <Layout>
      {/* <Title /> */}
      <div id="blog-page">
        <div id="blog-post-wrapper">
          <article id="blog" class="panel special">
            <div class="content">
              <h1>The Blog</h1>
              <div class="card-blog-container">
                {posts.map(post => <Post post={post}/>)}
              </div>
            </div>
          </article>
          )
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
