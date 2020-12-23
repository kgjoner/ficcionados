module.exports = {
  siteName: 'Ficcionados',
  templates: {
    Article: [{
      path: node => `/artigo/${node.slug}`
    }, {
      name: 'redirects',
      path: node => `/${node.slug}`,
      component: './src/components/article/ArticleRedirect.vue'
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
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-99215702-1'
      }
    }
  ],
}
