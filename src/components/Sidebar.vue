<template>
  <div id="sidebar" v-show="toggleShow">
    <div class="inner">
      <!-- Search -->
      <section id="search" class="alt">
        <!-- <form method="post" action="#">
          <input type="text" name="query" id="query" placeholder="Search" />
        </form>-->
      </section>
      <!-- Menu -->
      <nav id="menu">
        <header class="major">
          <h2>Menu</h2>
        </header>
        <ul>
          <li>
            <g-link to="/">Home</g-link>
          </li>
          <li>
            <g-link to="/blog">Blog</g-link>
          </li>
          <li>
            <g-link to="/blog">Resume</g-link>
          </li>
          <!-- <li>
            <g-link to="/blog">Blog</g-link>
          </li> -->
          <!-- <li>
            <a href="elements.html">Elements</a>
          </li>
          <li>
            <span class="opener">Submenu</span>
            <ul>
              <li>
                <a href="#">Lorem Dolor</a>
              </li>
              <li>
                <a href="#">Ipsum Adipiscing</a>
              </li>
              <li>
                <a href="#">Tempus Magna</a>
              </li>
              <li>
                <a href="#">Feugiat Veroeros</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Etiam Dolore</a>
          </li>
          <li>
            <a href="#">Adipiscing</a>
          </li>
          <li>
            <span class="opener">Another Submenu</span>
            <ul>
              <li>
                <a href="#">Lorem Dolor</a>
              </li>
              <li>
                <a href="#">Ipsum Adipiscing</a>
              </li>
              <li>
                <a href="#">Tempus Magna</a>
              </li>
              <li>
                <a href="#">Feugiat Veroeros</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Maximus Erat</a>
          </li>
          <li>
            <a href="#">Sapien Mauris</a>
          </li>
          <li>
            <a href="#">Amet Lacinia</a>
          </li>-->
        </ul>
      </nav>
    </div>
  </div>
</template> 

<script>
export default {
  props: ["toggleShow"]
};
</script>

<style>
</style>