<template>
  <Layout>
      <section class="panel special">
       <div class="content">
        <div class="inner">
          <div v-for="post in $page.tag.belongsTo.edges.map(edge => edge.node)" :key="post.id" class="post">
            <div class="title">
              <h2>
                <g-link :to="post.path">{{post.title}}</g-link>
              </h2>
              <p>{{post.description}} </p>
              <span v-for="tag in post.tags" :key="tag.title">
                  <g-link :to="'/tags/'+tag.title">#{{tag.title}}</g-link>
                   </span>
            </div>
          </div>
        </div>
      </div>
      </section>
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
export default {
    
}
</script>

<style scoped>

</style>

