<template>
  <article>
    <g-link :to="post.path">
      <h3>{{post.title}}</h3>
      <h5>{{formatDate(post.date)}}</h5>
      <p>{{post.description}}</p>
    </g-link>
    <ul class="actions">
      <li>
        <g-link :to="post.path" class="button">More</g-link>
      </li>
    </ul>
  </article>
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

<style>
</style>