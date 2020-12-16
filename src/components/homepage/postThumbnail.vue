<template>
  <div class="card-blog">
    <g-link :to="post.path" :style="{textDecoration:'none'}">
      <h3>{{ post.title }}</h3>
      <p>{{ formatDate(post.date) }}</p>
      <p>{{ post.description }}</p>
      <p class="tag"><span v-for="tag in post.tags.map(tag => tag.title)" :key="tag">#{{tag}} </span></p>
    </g-link>
  </div>
</template>

<script>
import formattedDateString from "../../utils/formattedDateString";

export default {
  props: ["post"],
  methods: {
    formatDate(string) {
      return formattedDateString(string);
    },
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
  color:unset;
}


</style>