<template>
  <article id="blog" class="panel special">
    <!-- <div class="image">
        <img :src="mainImage" alt data-position="center center" id="main-image" />
    </div>-->
    <div class="content">
      <h1 v-if="title">#{{title}}</h1>
      <div class="card-blog-container">
        <Blogpost v-for="post in posts.map(post=> post.node)" :key="post.id"
        :post="post" />
      </div>
    </div>
  </article>
</template>

<script>
import Blogpost from "./homepage/postThumbnail"
export default {
  props: ["posts", "title"],
  components:{
    Blogpost
  }
};
</script>

<style scoped>

#content{
  max-width:1200px;
  margin:auto;
}

</style>