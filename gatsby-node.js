const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const parent = getNode(node.parent);
        let collection = parent.sourceInstanceName;
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: 'collection',
            value: collection,
        });
        createNodeField({
            node,
            name: `slug`,
            value: `/${collection}${slug}`,
        })
    }
  }

    exports.createPages = async ({ actions, graphql, reporter }) => {
        const { createPage } = actions
        const blogPostTemplate = require.resolve(`./src/templates/post.tsx`)
        const posts = await graphql(`
            {
              allMarkdownRemark(
                    filter: { fields: { collection: { eq: "blog" } }}) {
                    edges {
                      next{
                        frontmatter{
                          title
                        }
                        fields{
                          slug
                        }
                      }
                      previous{
                        frontmatter{
                          title
                        }
                        fields{
                          slug
                        }
                      }
                      node {
                        fields{
                          slug
                          }
                      }
                    }
                  }
            }
          `)
        // Handle errors
        if (posts.errors) {
            reporter.panicOnBuild(`Error while running GraphQL query.`)
            return
        }

        console.log(posts)
        posts.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
            createPage({
                path: node.fields.slug,
                component: blogPostTemplate,
                context: {
                    next: next,
                    previous: previous,
                    slug: node.fields.slug,
                },
            })
        })
};
