import React from "react"
import { graphql } from "gatsby"
import Post from "../components/postCard";
import SEO from "../components/seo"

import ContentPageWrapper from "../components/contentPageWrapper"
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
    <ContentPageWrapper>
      <SEO title="Nate's Blog"/>
      <div id="blog-page">
      <h1>Nate's Blog</h1>
      <hr />
        <div id="blog-post-wrapper">
          <article id="blog" className="panel special">
            <div className="content">
              <div className="card-blog-container">
                {posts.map(post => <Post post={post} key={post.id}/>)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </ContentPageWrapper>
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