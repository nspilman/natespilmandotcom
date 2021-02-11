import React from "react"
import { Link, graphql } from "gatsby"
import Post from "../components/postCard";

import Layout from "../components/layout"

const IndexPage = ({ data }) => {
  const { music } = data;
  const songs = music.edges.map(song => song.node)

  return (
    <Layout>
      {/* <Title /> */}
    <div id="music-page">
      <h1 id="music-title">Nate's Music</h1>
      <hr/>
      {songs.map(song => (
      <article key="post.title" className="music-post">
        <h3>{song.frontmatter.title}</h3>
        <h4>{song.frontmatter.description}</h4>
      <div dangerouslySetInnerHTML={{ __html: song.html }} />
        </article>
      ))}

    </div>
    </Layout>
  )
}

export const query = graphql`
  query AllMusicPosts {
    music: allMarkdownRemark(
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
          tags
        }
      }
    }
  }
  }
`

export default IndexPage
