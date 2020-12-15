
<template>
  <Layout>
    <article id="home" class="panel special">
      <div id="post-main">
        <Title/>

        <article class="post">
          <header>
            <h2 id="post-title">{{ $page.post.title }}</h2>
            <p>{{ $page.post.description }}</p>
            <time class="published" datetime="2015-11-01">{{
              formattedDateString($page.post.date)
            }}</time>
          </header>
          <!-- <span class="image featured">
          <g-image :src="$page.post.image" class="p5" />
        </span> -->
          <div id="post-body" v-html="$page.post.content" />
        </article>
        <!-- <BlogCommmentWrapper postId = {post.id} draft = {post.frontmatter.draft}/> -->
        <ul
          :style="{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: '2em',
          }"
        >
          <li v-if="previousPost">
            <g-link :to="previousPost.path"> {{ previousPost.title }} </g-link>
          </li>
          <li v-if="nextPost">
            <g-link :to="nextPost.path"> {{ nextPost.title }} </g-link>
          </li>
        </ul>
      </div>
    </article>
  </Layout>
</template>

<page-query>
query Post ($path:String!){
post:post(path:$path)
       {
        title
        description
        path
        content
        date
      }
  }
</page-query>
<static-query>
query {
  posts: allPost(filter: { published: { eq: true }}, sortBy: "date", order: ASC) {
    edges {
      node {
        id
        title
        path
    }
  }
  }
  }
</static-query>

  <script>
import formatDate from "../utils/formattedDateString";
import Title from "../components/BlogTitle";
export default {
  components:{
    Title
  },
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [{ name: "description", content: this.$page.post.description }],
    };
  },
  methods: {
    formattedDateString(string) {
      return formatDate(string);
    },
  },
  computed: {
    post() {
      return this.$page.post;
    },
    currentIndex() {
      return this.$static.posts.edges
        .map((edge) => edge.node.path)
        .indexOf(this.$page.post.path);
    },
    nextPost() {
      if (this.currentIndex < this.$static.posts.edges.length - 1) {
        const nextIndex = this.currentIndex + 1;
        return this.$static.posts.edges[nextIndex].node;
      } else {
        return -1;
      }
    },
    previousPost() {
      if (this.currentIndex > 0) {
        const previousPost = this.currentIndex - 1;
        return this.$static.posts.edges[previousPost].node;
      } else {
        return -1;
      }
    },
  },
  watch: {
    post() {
      location.reload();
    },
  },
};
</script>
<style scoped>
#post-main {
  color: white;
}
#post-title {
  color: white;
}

h2{
  color:white;
}

h3{
  color:white !important;
}

ul {
  padding:unset;
}

.post {
  padding: 1rem 10rem;
}
</style>