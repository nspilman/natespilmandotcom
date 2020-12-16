<template>
  <div id="app">
    <header id ="header">
        <div class="menu-wrap">
            <input type="checkbox" class="toggler">
            <div class="hamburger"><div></div></div>
            <div class="menu">
              <div>
                <div>
                  <ul>
                    <li><g-link to="/">Home</g-link></li>
                    <li><g-link to="/blog">Blog</g-link></li>
                    <li><g-link to="/music">Music</g-link></li>
                    <li><g-link to="https://natespilman.tech/media/pdfs/Resume_Aug_2020.pdf">Resume</g-link></li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
    </header>
          <!-- <transition name="component-fade" mode="out-in"> -->
            <slot />
          <!-- </transition> -->

      <footer class="footer">
       <Icons/>
      </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Icons from "../components/Icons"

export default {
  name:'Layout',
  components:{
    Icons
  }
};
</script>

<style scoped>
@import "../assets/css/style.css";

</style>
