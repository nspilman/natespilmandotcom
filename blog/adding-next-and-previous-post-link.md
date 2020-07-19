---
title: Adding Next and Previous post link to the blog
description: A seemingly hacky way to handle pagination
date: 2020-03-28T17:13:36.586Z
tags:
  - Meta
  - Software
  - Gridsome
  - graphql
  - building the blog
published: true
favorite: false

---
Readers of the blog will now see links to previous and next blog posts at the bottom of the page! I've accomplished this via what feels like a hack, as it's really not a scaleable solution... but it works for now!

At a high level - 

* I added a new graphQL query that gets the path, title and date of ALL published blog posts. 
* I've created three Vue computed properties to grab the current post index, previous post and next post. 
* I've added links to the previous and next computed posts. 

- - -

### The new GraphQL query -

```graphQL
<static-query>
query {
  posts: allPost(filter: { published: { eq: true }}, sortBy: "date", order: ASC) {
    edges {
      node {
        id
        title
        path
         }
       }
     }
   }
</static-query>
```

The above query grabs all posts that are published, ordered by published date. 

- - -

### The new Vue computed properties -

```javascript
computed:{
    currentIndex(){
      return this.$static.posts.edges.map(edge => edge.node.path).indexOf(this.$page.post.path)
    },
    nextPost(){
      if(this.currentIndex < this.$static.posts.edges.length -1){
        const nextIndex = this.currentIndex + 1;
        return this.$static.posts.edges[nextIndex].node
      }
      else{
        return -1
      }
    },
      previousPost(){
      if(this.currentIndex > 0){
        const previousPost = this.currentIndex - 1;
        return this.$static.posts.edges[previousPost].node
      }
      else{
        return -1
      }
    }
  }
```

The first computed property - `currentIndex` -  grabs the index of the current post with relation to the posts query. I convert the list of all posts to a list of the post paths via a `map` statement, and then use `.indexOf(path)` to return an index value. This will be my 4th published post, so the index will be 3. 

The second and third computed properties - `nextPost` and `previousPost` take the `currentIndex` value, check that there won't be an index out of range error, and then returns that post value. 

- - -

### Adding the links on the page

```html
<ul
      :style="{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: '2em',
          }"
    >
      <li v-if="previousPost">
        <g-link :to="previousPost.path"> {{previousPost.title}} </g-link>
      </li>
      <li v-if="nextPost">
        <g-link :to="nextPost.path"> {{nextPost.title}} </g-link>
      </li>
    </ul>
```

At the bottom of the \`Post.vue\` template that is used to render all the posts, I've added the above code to render the previous and next posts, if they exist. `-1` coalesces to `false`, which is nice, because we can `v-if="previousPost"` instead of `v-if="previousPost != -1"`. We have the path and the title from our graphql query, which we use for linking and display. 

---
### wrap up

And that's it! I refer to this as hacky, since if I find myself at a point where I have 1000 blog posts, every blogpost pageload is going to pull ALL 1000 posts into memory to find the next and previous post. Obviously not ideal, but functioning for now!!

Thanks for reading. 