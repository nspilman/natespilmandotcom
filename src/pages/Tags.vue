<template>
    <Layout>
         <section id="all-tags">
             <h1>All Tags </h1>
        <ul>
            <li v-for="tag in tagsByCount" :key="tag.id">
              <g-link :to="`tags/${tag.title}`"> {{tag.count}} - {{tag.title}} </g-link>
                </li>

            </ul>
    </section>
    </Layout>
</template>

<page-query>
query {
  allPost {
    edges {
      node {
        tags {
          title
        }
      }
    }
  }
}
</page-query>

<script>
export default {
    computed:{
        tagsByCount(){
            const output = {}
            const tagList = []
            const edges = this.$page.allPost.edges
            const nodes = edges.map(edge => edge.node)
            const tags = nodes.map(node => node.tags).filter(tags => tags.length > 0)
            tags.forEach(tag => tag.forEach(t => tagList.push(t.title)))
            tagList.forEach(tag => {
            if (output.hasOwnProperty(tag)) {
                output[tag] = output[tag] + 1
                }
                else{
                    output[tag] = 1
                }
            })
            return Object.entries(output).sort((a,b) => b[1] - a[1]).map(entry => {return {title:entry[0],count:entry[1]}})
        }
    }
}
</script>

<style scoped>
   #all-tags{
        margin-top: 4em;
    }
</style>