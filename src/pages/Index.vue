<template>
  <Layout>
    <section id="banner">
      <div class="content">
        <header>
          <div>
            <h1>Hi, I'm Nate Spilman</h1>
            <p>Welcome to my Website and Blog</p>
          </div>
        </header>
        <p>I'm a professional software developer and amateur musician and photographer. I like to write and put things on the internet, and this is where those enjoyments intersect. Thanks for stopping by.</p>
        <nav id="nav">
          <ul class="actions">
            <li>
              <g-link class="button" to="/blog">Blog</g-link>
            </li>
            <li>
              <g-link to="https://natespilman.tech/media/pdfs/2019_Resume.pdf" class="button">Resume</g-link>
            </li>
          </ul>
        </nav>
        <ul class="icons">
          <li>
            <g-link href="https://twitter.com/Natetheperson" class="icon brands fa-twitter">
              <span class="label">Twitter</span>
            </g-link>
          </li>
          <li>
            <a href="https://github.com/nspilman" target="_blank" class="icon brands fa-github">
              <span class="label">GitHub</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/natespilman/"
              target="_blank"
              class="icon brands fa-instagram"
            >
              <span class="label">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/natespilman/"
              target="_blank"
              class="icon brands fa-linkedin"
            >
              <span class="label">LinkedIn</span>
            </a>
          </li>
          <br />
          <li>
            <span class="label">nate.spilman@gmail.com</span>
          </li>
        </ul>
      </div>
      <span class="image object">
        <img :src="mainImage" alt data-position="center center" id="main-image" />
      </span>
    </section>
    <section>
      <h1>The Blog</h1>
      <br />
      <div class="posts">
        <article v-for="post in posts.map(post => post.node)" :key="post.id">
          <h3>{{post.title}}</h3>
          <h5>{{formatDate(post.date)}}</h5>
          <p>{{post.description}}</p>
          <ul class="actions">
            <li>
              <g-link :to="post.path" class="button">More</g-link>
            </li>
          </ul>
        </article>
      </div>
    </section>
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
import mainImage from "../assets/img/Jan52020-pro-photo.png";
import formattedDateString from "../utils/formattedDateString";
export default {
  metaInfo: {
    title: "Nate Spilman | Personal and Professional Website"
  },
  created() {},
  methods: {
    formatDate(string) {
      return formattedDateString(string);
    }
  },
  data() {
    return {
      mainImage
    };
  },
  computed: {
    posts() {
      return this.$page.posts.edges;
    }
  }
};
</script>

<style scoped>
img {
  /* padding: 3em; */
  background-color: white;
}

#main-image {
  height: 30em !important;
}

@media only screen and (max-width: 600px) {
  #banner {
    display: flex;
    flex-direction: column-reverse;
  }

  #main-image {
    height: 35vh !important;
  }
}
</style>
