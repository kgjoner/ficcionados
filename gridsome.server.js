// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

const axios = require('axios');
const category = require('../backend/api/category');
// const baseApiUrl = 'https://ficcionados-backend.herokuapp.com'
const baseApiUrl = 'http://localhost:3000'

module.exports = function (api) {
  api.loadSource(async actions => {
    let standoutIds;
    if(baseApiUrl.includes('localhost')) {
      standoutIds = [1]
    }

    const authorCollection = actions.addCollection('Author')
    const categoryCollection = actions.addCollection('Category')
    const imageCollection = actions.addCollection('ImageInfo')
    const articleCollection = actions.addCollection('Article')

    const { data: users } = await axios.get(`${baseApiUrl}/build/users`)
    const { data: categories } = await axios.get(`${baseApiUrl}/categories`)
    const { data: images } = await axios.get(`${baseApiUrl}/images`)
    const { data: articles } = await axios.get(`${baseApiUrl}/build/articles`)

    for (const user of users) {
      authorCollection.addNode({
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio || false,
        admin: user.admin,
        facebook: user.facebook || false,
        instagram: user.instagram || false,
        twitter: user.twitter || false,
        wattpad: user.wattpad || false,
        website: user.website || false,
        sweek: user.sweek || false,
      })
    }

    for(const category of categories) {
      category.children = categories.filter(c => c.parentId === category.id).map(c => c.id)
      category.breadcrumb = category.path
      delete category.path
      categoryCollection.addNode(category)
    }

    for(const image of images) {
      image.id = image._id
      delete image._id
      imageCollection.addNode(image)
    }

    for (const article of articles) {
      const category = categories.find(c => c.id === article.categoryId)
      const parentCategory = categories.find(c => c.id === category.parentId)
      articleCollection.addNode({
        ...article,
        author: actions.store.createReference('Author', article.userId),
        image: actions.store.createReference('ImageInfo', article.imageId),
        category: actions.store.createReference('Category', article.categoryId),
        parentCategory: actions.store.createReference('Category', parentCategory.id),
        grandparentCategory: actions.store.createReference('Category', parentCategory.parentId),
        standout: standoutIds.includes(article.id)
      })
    }

    // function getChildren(id) {
    //   let children = categories.filter(c => c.parentId === id).map(c => c.id)
    //   children.forEach(childId => {
    //     children = [...children, ...getChildren(childId)]
    //   })
    //   return children
    // }

  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
