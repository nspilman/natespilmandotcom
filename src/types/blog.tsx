type Blog = {
        edges: [
          {
            node: {
              html: string,
              id:string,
              fields: {
                slug: string,
              }
              frontmatter: {
                date: string,
                description: string,
                favorite: boolean,
                published: boolean,
                title: string,
                tags: string[],
              }
            }
          }
        ]
}

export default Blog;