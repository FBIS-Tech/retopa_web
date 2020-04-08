const path = require("path")
module.exports = {
  siteMetadata: {
    title: `Retopa`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-antd",
    `gatsby-plugin-sass`,
    `gatsby-plugin-split-css`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-netlify-cms`,
    "gatsby-plugin-htaccess",

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Retopa`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        reducers: path.join(__dirname, "./src/Reducers/rootReducer.js"),
        sagas: path.join(__dirname, "./src/saga/rootSaga.js"),
        store: path.join(__dirname, "./src/Reducers/ReduxWrapper.js"),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-remove-serviceworker`,
  ],
}
