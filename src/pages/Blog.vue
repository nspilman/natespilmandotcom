<template>
  <Layout>
    <article id="home" class="panel special">
      <div class="image">
        <img :src="mainImage" alt data-position="center center" id="main-image" />
      </div>
      <div class="content">
        <div class="inner">
          <div v-for="post in posts" :key="post.id" class="post">
            <div class="title">
              <h2>
                <g-link :to="post.node.path">{{post.node.title}}</g-link>
              </h2>
              <p>{{post.node.description}} </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>
query Posts {
  posts: allPost {
    edges {
      node {
        id
        title
        date
        description
        path
        excerpt
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
      console.log(this.$page.posts.edges)
      return this.$page.posts.edges
    }
  }
};
</script>

<style scoped>
img {
  padding: 3em;
  background-color: white;
}

.home-links a {
  margin-right: 1rem;
}

.content {
  justify-content: flex-start;
}
</style>
