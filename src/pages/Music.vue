<template>
  <Layout>
    <div id="music-page">
      <h1 id="music-title">Music</h1>
      <hr/>
      <div v-for="post in posts" :key="post.title" class="music-post">
          <h3>{{post.title}}</h3>
          <h4>{{post.description}}</h4>
          <div v-html="post.content"/>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Posts {
  posts: allMusic(filter: { published: { eq: true }}) {
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
import mainImage from "../assets/img/blog_main.jpeg";

export default {
  metaInfo: {
    title: "Nate Spilman | Personal and Professional Website"
  },
  data() {
    return {
      mainImage
    }
  },
  computed:{
    posts(){
      return this.$page.posts.edges.map(edge => edge.node)
    }
  }
};
</script>

<style scoped>
#music-page{
  padding:5rem 2rem;
}

.music-post{
  padding:2rem;
}
</style>
