
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
    </div>
    <ul
      :style="{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }"
    >
      <li>
        <!-- {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
        )}-->
      </li>
      <li>
        <!-- {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
        </Link>-->
        <!-- )} -->
      </li>
    </ul>
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
  <script>
  import formatDate from "../utils/formattedDateString"
export default {
  metaInfo() {
    return {
      title: this.$page.title
    };
  },
  methods:{
    formattedDateString(string){
      return formatDate(string)
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
    display:flex;
    flex-direction: column;
}
img{
    width:100%;
    height:auto;
}

.post{
    padding:2em;
}
</style>