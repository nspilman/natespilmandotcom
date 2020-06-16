<template>
  <Layout>
    <article id="blog" class="panel special">
      <!-- <div class="image">
        <img :src="mainImage" alt data-position="center center" id="main-image" />
      </div> -->
      <div class="content">
        <div class="inner">
          <div v-for="post in posts" :key="post.id" class="post">
            <div class="title">
              <h2>
                <g-link :to="post.node.path">{{post.node.title}}</g-link>
              </h2>
              <p>{{post.node.description}} </p>
              <span v-for="tag in post.node.tags" :key="tag.title">
                  <g-link :to="'/tags/'+tag.title">#{{tag.title}}</g-link>
                </span>
            </div>
          </div>
        </div>
      </div>
    </article>
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

.post{
  padding-bottom:4em;
  padding-top:.5em;
  padding-left:.5em;
  border-bottom:4px dotted rgb(165,197,250);
  text-align: left;
  transition: .3s;
}


.post:hover{
  background-color: rgb(225,240,255);
}

@media only screen and (max-width: 600px) {
.image{
max-height: unset;
}  
}

#blog{
  display:flex;
  width:100%;
  align-items: center;
}


.home-links a {
  margin-right: 1rem;
}

.content {
  justify-content: flex-start;
  display:block;
  width:80%;
}
</style>
