<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nate Spilman</title>
    </head>

    <body>
      <Layout>
        <section class="hero">
          <div class="hero-container">
            <h1>Hi, I'm Nate Spilman</h1>
            <p>
              I’m a professional software developer and amateur musician and
              photographer. I like to write and put things on the internet, and
              this is where those enjoyments intersect. Thanks for stopping by.
            </p>
            <div class="nate"></div>
                <Icons/>
          </div>
        </section>

        <main class="main">
          <div class="content-container">
            <div class="card-header">
              <h2>Nate's Blog</h2>
              <hr />
            </div>
            <div class="card-blog-container">
             <PostThumbnail :post="post" v-for="post in lastFourPosts" :key="post.id"/> 
            </div>
            <div class="button-container">
              <g-link to="/blog">
                <button>Read</button>
              </g-link>
            </div>
            <div class="card-header">
              <h2>Nate's Music</h2>
              <hr />
            </div>
           <Song
            :song="latestSong"

           />
            <div class="button-container">
              <g-link to="/music"><button>Listen</button></g-link>
            </div>
          </div>
        </main>
      </Layout>
    </body>
  </html>
</template>

<page-query>
query Posts {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date
        description
        path
        excerpt
        published
        favorite
        tags {
          title
        }
    }
  }
  }
    music: allMusic(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date
        content
        description
        path
        excerpt
        published
    }
  }
  }
  }
  </page-query>

<script>
import mainImage from "../assets/img/Jan52020-pro-photo.png";
import PostThumbnail from "../components/homepage/postThumbnail";
import Icons from "../components/Icons";
import Song from "../components/Song"

export default {
  metaInfo: {
    title: "Nate Spilman | Personal and Professional Website",
  },
  components: {
    PostThumbnail,
    Icons,
    Song
  },
  data() {
    return {
      mainImage,
    };
  },
  computed: {
    posts() {
      return this.$page.posts.edges.map((post) => post.node);
    },
    lastFourPosts(){
        return this.posts.slice(0,4)
    },
    music(){
        return this.$page.music.edges.map(song=>song.node)
    },
    latestSong(){
        return this.music[0]
    }

  },
};
</script>

<style scoped>
.hero{
  padding:5rem 0;
}
</style>
