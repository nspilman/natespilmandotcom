<template>
  <Layout>
   <section id="not-found">
     <h1> 404 Page Not Found </h1>
     <h2>A Bit lost?</h2>
     <h4>Follow the path back Home </h4>
     <g-link to="/">
      <g-image id="not-found-image" :src="mainImage" />
     </g-link>
   </section>
  </Layout>
</template>

<script>
import mainImage from "../assets/img/404forest.jpg";
export default {
  metaInfo: {
    title: "Nate Spilman | 404 Page Not Found | Personal and Professional Website"
  },
  data() {
    return {
      mainImage
    };
  }
};
</script>

<style scoped>
  #not-found{
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }

  #app{
background-image: unset;
  }

  #not-found-image {
    max-width: 60vw;
  }

</style>
