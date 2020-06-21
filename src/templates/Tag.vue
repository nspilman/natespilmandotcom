<template>
  <Layout>
    <Blogposts :title="$page.tag.title" :posts="$page.tag.belongsTo.edges"/>
  </Layout>
</template>

<page-query>
query Tag ($id: ID!) {
  tag (id: $id) {
    title
    belongsTo {
      edges {
        node {
          ...on Post {
            title
            path
            description
            tags{
                title
            }
            date (format: "D. MMMM YYYY")
            content
          }
        }
      }
    }
  }
  allTag {
    edges {
      node {
        id
        path
      }
    }
  }
}
</page-query>

<script>
import Blogposts from "../components/Blogposts"
export default {
  components:{
    Blogposts
  }
    
}
</script>

<style scoped>

</style>

