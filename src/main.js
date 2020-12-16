// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import mainImage from "./assets/img/nate-professional.jpg";

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  head.meta.push({
    key: 'og:image',
    name: 'og:image',
    content: mainImage,
  })
  Vue.component('Layout', DefaultLayout)
}
