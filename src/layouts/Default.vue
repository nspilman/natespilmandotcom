<template>
  <div id="app">
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <div class="inner">
          <!-- Header -->
          <header id="header">
            <g-link to="/" class="logo">
              <strong>Nate Spilman</strong> dot com
            </g-link>
            <ul class="icons">
              <li>
                <g-link href="https://twitter.com/Natetheperson" class="icon brands fa-twitter">
                  <span class="label">Twitter</span>
                </g-link>
              </li>
              <li>
                <g-link href="https://www.instagram.com/natespilman/" class="icon brands fa-instagram">
                  <span class="label">Instagram</span>
                </g-link>
              </li>
              <li>
            <a href="https://github.com/nspilman" target="_blank" class="icon brands fa-github">
              <span class="label">GitHub</span>
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
            </ul>
          </header>
          <!-- <transition name="component-fade" mode="out-in"> -->
            <slot />
          <!-- </transition> -->
        </div>
      </div>
      <div id="sidebar-wrapper" :style="{width: showSidebarMenu ? '25em' : '4em'}">
        <img
          class="toggle"
          :style="showSidebarMenu ? openMenuStyles : closedMenuStyles"
          @click="showSidebarMenu = !showSidebarMenu"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/440px-Hamburger_icon.svg.png"
        />
        <Sidebar :toggleShow="showSidebarMenu" />
      </div>
    </div>
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
import Sidebar from "../components/Sidebar";
export default {
  components: {
    Sidebar
  },
  created() {
    if (process.isClient) {
      if(window.innerWidth < 800){
        this.showSidebarMenu = false;
      }
    }
  },
  data() {
    return {
      showSidebarMenu: true,
      openMenuStyles: {
        left: "22em"
      },
      closedMenuStyles: {
        left: "1em"
      }
    };
  }
};
</script>

<style>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/ie8.css";
@import "../assets/css/ie9.css";
@import "../assets/css/font-awesome.min.css";
@import "../assets/css/main.css";

#sidebar-wrapper {
  display: flex;
  justify-content: flex-end;
}

#main {
  display: flex;
}

#sidebar-wrapper .toggle {
  height: 40px;
  width: 40px;
}

.toggle {
  display: none;
}

@media only screen and (max-width: 800px) {
  .toggle {
    position: fixed;
    display: block;
    top: 1em;
  }
}
</style>
