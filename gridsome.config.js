// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Nate Spilman - Website and Blog',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './blog/*.md',
        typeName: 'Post',
        remark: {
        },
        refs: {
          tags:{
            typeName: 'Tag',
            route: '/tag/:id',
            create: true
          }
        }
      }
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: `/admin`
      }
    },
  ]
}
