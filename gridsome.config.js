module.exports = {
  siteName: 'Ficcionados',
  templates: {
    Article: [{
      path: node => `/artigo/${node.slug}`
    }, {
      name: 'redirects',
      path: '/:slug',
      component: './src/components/Redirect.vue'
    }],
    Category: [{
      path: node => `/categorias/${node.id}`
    }],
  },
  plugins: [
    {
      use: 'gridsome-plugin-vue-toasted',
      options: {
        iconPack: 'fontawesome',
        duration: 5000
      },
    }
  ],
}
