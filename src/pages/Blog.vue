<template>
  <Layout>
      <Title/>
    <div id="blog-page">
      <div id="blog-post-wrapper">
        <Blogposts :posts="posts" />
      </div>
    </div>
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
import Title from "../components/BlogTitle.vue";


export default {
  metaInfo: {
    title: "Nate Spilman | Personal and Professional Website",
  },
  components: {
    Blogposts,
    Title
  },
  data() {
    return {
      mainImage,
    };
  },
  computed: {
    posts() {
      return this.$page.posts.edges;
    },
  },
};
</script>

<style scoped>
#blog-page {
  display:flex;
  flex-direction: column;
  padding:1rem 3rem;
}

</style>
