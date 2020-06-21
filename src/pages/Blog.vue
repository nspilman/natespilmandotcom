<template>
  <Layout>
    <Blogposts :posts="posts"/>
  </Layout>
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
        tags {
          title
        }
    }
  }
  }
  }
  </page-query>

<script>
import mainImage from "../assets/img/blog_main.jpeg";
import Blogposts from "../components/Blogposts";

export default {
  metaInfo: {
    title: "Nate Spilman | Personal and Professional Website"
  },
  components:{
    Blogposts
  },
  data() {
    return {
      mainImage
    }
  },
  computed:{
    posts(){
      return this.$page.posts.edges
    }
  }
};
</script>

<style scoped>

</style>
