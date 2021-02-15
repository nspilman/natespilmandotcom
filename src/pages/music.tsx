import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import ContentPageWrapper from "../components/contentPageWrapper"
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
    <ContentPageWrapper>
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
    </ContentPageWrapper>
  )
}

export const query = graphql`
  query AllMusicPosts {
    music: allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
    filter: { fields: { collection: { eq: "music" }, , published: {eq: true} }}) {
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
