<template>
  <Layout>
      <h1>Music</h1>
      <div v-for="post in posts" :key="post.title" class="music-post">
          <h2>{{post.title}}</h2>
          <h4>{{post.description}}</h4>
          <div v-html="post.content"/>
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
 .music-post{ 
     width:60vw;
    padding:2rem 0;
     };
</style>
