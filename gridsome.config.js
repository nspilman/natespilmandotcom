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
            route: '/tags/:id',
            create: true
          }
        }
      },
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: './music/*.md',
        typeName: 'Music',
        remark: {
        },
        refs: {
        }
      },
    },
    {
      use: `gridsome-plugin-netlify-cms`,
      options: {
        publicPath: process.env.CMS_PUBLIC_PATH
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: process.env.GOOGLE_ANALYTICS_KEY
      }
    }
  ]
}
