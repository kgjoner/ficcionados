const axios = require('axios');
const baseApiUrl = 'https://ficcionados-backend.herokuapp.com'
// const baseApiUrl = 'http://localhost:3000'

module.exports = function (api) {
  api.loadSource(async actions => {
    const authorCollection = actions.addCollection('Author')
    const categoryCollection = actions.addCollection('Category')
    const imageCollection = actions.addCollection('ImageInfo')
    const articleCollection = actions.addCollection('Article')

    const { data: users } = await axios.get(`${baseApiUrl}/build/users`)
    const { data: categories } = await axios.get(`${baseApiUrl}/categories`)
    const { data: images } = await axios.get(`${baseApiUrl}/images`)
    const { data: articles } = await axios.get(`${baseApiUrl}/build/articles`)

    let standoutIds;
    if(baseApiUrl.includes('localhost')) {
      standoutIds = [1]
    } else {
      const { data: standout } = await axios.get(`${baseApiUrl}/standoutarticles`)
      standoutIds = [...standout.recommended, ...standout.interviews]
    }

    for (const user of users) {
      authorCollection.addNode({
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        admin: user.admin,
        facebook: user.facebook || '',
        instagram: user.instagram || '',
        twitter: user.twitter || '',
        wattpad: user.wattpad || '',
        website: user.website || '',
        sweek: user.sweek || '',
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
      const parentCategory = categories.find(c => c.id === category.parentId) || {}
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

  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
