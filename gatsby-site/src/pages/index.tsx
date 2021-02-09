import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <section className="hero">
      <div className="hero-container">
        <h1>Hi, I'm Nate Spilman</h1>
        <p>
          I’m a professional software developer and amateur musician and
          photographer. I like to write and put things on the internet, and
          this is where those enjoyments intersect. Thanks for stopping by.
            </p>
        <div className="nate"></div>
        {/* <Icons /> */}
      </div>
    </section>

    <main className="main">
      <div className="content-container">
        <div className="card-header">
          <h2>Nate's Blog</h2>
          <hr />
        </div>
        <div className="card-blog-container">
          {/* <PostThumbnail :post="post" v-for="post in lastFourPosts" :key="post.id"/> */}
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
        {/* <Song
            :song="latestSong"

           /> */}
            <div className="button-container">
          <Link to="/music"><button>Listen</button></Link>
        </div>
      </div>
    </main>
  </Layout>
)

export default IndexPage
