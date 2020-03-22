<template>
  <div id="app">
    <div id = "header">
      <g-link v-if="path !='/'" to= "/">
          <span class="home-link"> NATESPILMAN.COM </span>
      </g-link>
      </div>
			<div id="wrapper">
        <transition name="component-fade" mode="out-in">
        <slot/>
        </transition>
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
export default {
  data(){
    return {
      path: process.isClient ? window.location.pathname : "/",
    }
  }
}
</script>

<style>
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/ie8.css";
@import "../assets/css/ie9.css";
@import "../assets/css/font-awesome.min.css";
@import "../assets/css/main.css";

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

#header {
  height: 20px;
  padding:1em;
  background-color: white;
}

.home-link{
  font-size: 1rem;
  letter-spacing: 3px;
  font-weight: 600;
}

.nav__link {
  margin-left: 20px;
}

#app {
  background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fdfff2'/%3E%3Cstop offset='1' stop-color='%2399c3ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}

a:visited{
    text-decoration: none;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
