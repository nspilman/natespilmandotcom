import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"

import Layout from "../components/layout"

import Music from "../types/music";

type MusicProps = {
  data: {
    music:Music
  }
}

const MusicPage = ({ data }: MusicProps) => {
  const { music } = data;
  const songs = music.edges.map(song => song.node)

  return (
    <Layout>
      <SEO title="Nate's Music"/>
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

export default MusicPage
