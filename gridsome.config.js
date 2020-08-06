module.exports = {
  siteName: 'Ficcionados',
  templates: {
    Article: [{
      path: node => `/artigo/${node.slug}`
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
