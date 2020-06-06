<template>
  <Layout>
    <article id="home" class="panel special">
      <div class="image">
        <img :src="mainImage" alt data-position="center center" id="main-image" />
      </div>
      <div class="content">
        <div class="inner">
          <header>
            <div>
              <h1>Nate Spilman</h1>
              <hr />
              <p>Software Engineer</p>
              <p>Musician</p>
              <p>Photographer</p>
            </div>
          </header>
          <nav id="nav">
            <ul class="actions vertical special spinY">
              <li>
                <g-link class="button" to="/blog">Blog</g-link>
              </li>
              <li>
                <g-link class="button" to="https://www.instagram.com/natespilman/">Instagram</g-link>
              </li>
              <li>
                <g-link
                  to="https://natespilman.tech/media/pdfs/2019_Resume.pdf"
                  class="button"
                >Resume</g-link>
              </li>
            </ul>
          </nav>
          <ul class="icons">
            <li>
              <a href="https://github.com/nspilman" target="_blank" class="icon fa-github">
                <span class="label">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/natespilman/"
                target="_blank"
                class="icon fa-instagram"
              >
                <span class="label">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/natespilman/"
                target="_blank"
                class="icon fa-linkedin"
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
      </div>
    </article>
  </Layout>
</template>

<script>
import mainImage from "../assets/img/Jan52020-pro-photo.png";
export default {
  metaInfo: {
    title: "Nate Spilman | Personal and Professional Website"
  },
  data() {
    return {
      mainImage
    };
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
</style>
