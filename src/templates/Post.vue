
<template>
  <Layout>
    <article id="home" class="panel special">
    <div id="post-main">
      <article class="post">
        <header>
            <h1>{{$page.post.title}}</h1>
            <p>{{$page.post.description}}</p>
            <time class="published" datetime="2015-11-01">{{formattedDateString($page.post.date)}}</time>
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
        <g-link :to="previousPost.path"> {{previousPost.title}} </g-link>
      </li>
      <li v-if="nextPost">
        <g-link :to="nextPost.path"> {{nextPost.title}} </g-link>
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
  import formatDate from "../utils/formattedDateString"
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        { name: "description", content: this.$page.post.description }
     ]
    };
  },
  methods:{
    formattedDateString(string){
      return formatDate(string)
    }
  },
  computed:{
    post(){
      return this.$page.post
    },
    currentIndex(){
      return this.$static.posts.edges.map(edge => edge.node.path).indexOf(this.$page.post.path)
    },
    nextPost(){
      if(this.currentIndex < this.$static.posts.edges.length -1){
        const nextIndex = this.currentIndex + 1;
        return this.$static.posts.edges[nextIndex].node
      }
      else{
        return -1
      }
    },
      previousPost(){
      if(this.currentIndex > 0){
        const previousPost = this.currentIndex - 1;
        return this.$static.posts.edges[previousPost].node
      }
      else{
        return -1
      }
    }
  },
  watch:{
    post(){
      location.reload();
    }
  }
};
</script>
<style>
#post-main{
    margin-top: 4em;
    background-color: white;
}

#post-body{
    text-align: left;
    display:flex;
    flex-direction: column;
    align-items: center;
}
#post-body > p > img{
    max-width:100%;
    max-height:100vh;
    text-align: center;
    margin:1em;
    display: flex;
    align-items: center;
    justify-content: center;
}

.post{
    padding:2em;
}

ul {
    list-style-position: inside;
}

ul p {
  display:inline;
}
</style>