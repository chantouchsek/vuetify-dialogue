/*
Nuxt.js module for vuetify-dialogue
Usage:
  - Install vuetify-dialogue package
  - Add this into your nuxt.config.js file:
  {
    modules: [
      // Simple usage
      'vuetify-dialogue/nuxt'
      // Optionally passing options in module configuration
      ['vuetify-dialogue/nuxt', { property: '$dialog' }]
    ],
    // Optionally passing options in module top level configuration
    vuetifyDialog: { property: '$dialog' }
  }
*/

const { resolve } = require('path')

module.exports = function nuxtVueWaitModule (moduleOptions) {
  const options = Object.assign({}, this.options.vuetifyDialogue, moduleOptions)

  if (this.options.build.ssr) {
    this.options.build.transpile.push(/^vuetify-dialogue/)
  }
  // Register plugin
  this.addPlugin({
    ssr: false,
    src: resolve(__dirname, 'plugin.template.js'),
    fileName: 'vuetify-dialogue.js',
    options: options
  })
}

// required by nuxt
module.exports.meta = require('../package.json')
