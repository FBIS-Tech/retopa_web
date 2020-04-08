module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-transition-link/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-netlify-cms/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Retopa","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
