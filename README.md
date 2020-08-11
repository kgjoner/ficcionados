# Ficcionados Frontend

A JAMstack blog made with Gridsome.

![Images of how the pages look like on desktop and mobile](/src/assets/img/git-presentation.png)


## Packages

* Gridsome
* Vue
* Vue-Router 
* Vuex
* Bootstrap-Vue
* Vue-Disqus
* Vue-MQ
* Vue-Gravatar


## Overview

It was my first web project, and it has started with pure Vue along with the Prerender-Spa-Plugin to deal with SEO. Back then, the prerendered pages were there for the web crawlers, while the content for the users remained dynamically generated via ajax.

However, the things have changed. Gridsome came into play, and now almost all the blog is served from static assets.

For those who are not familiar with Gridsome, it makes all the necessary backend calls during the build phase, then it creates a GraphQL layer with the data received, and generates the pages matching all the predefined routes.

You can find more info in the [docs](https://gridsome.org/docs/).

One of the problems with this approach was facing user generated content, which is the case for the comment sections. But that was handled by Disqus.


## SEO

That was my main concern during all the project phases. I know it is a typical concern for content creators, but in this case it was not only a matter of conquering good ranks, but also do not lose the ranks it has already conquered.

The blog is older than this repository; it has born in Wordpress, even before I work with webdev. So the content has already been out there, and it was doing well on google, even appearing in the first page for some keywords.

Nonetheless, the SEO ended up boosted. Beyond the good practices, the improved website speed and the better responsiveness for small screens have helped as well.

It is a blog for fiction writers in portuguese, and now it is in the first page for several relevant keywords in this niche, like "writer's block", "writing prompts", "character archetype" or "three-act structure" (in portuguese: "bloqueio do escritor", "prompts de escrita", "arquétipos de personagens" e "estrutura de três atos").


## CMS

I run this blog with a friend, who is not a developer, so it was important to build a good interface to let him manage the content: writing new posts, editing old ones, managing categories, uploading images and updating users info.

That was made and hosted in another subdomain: [admin.ficcionados.com.br](https://admin.ficcionados.com.br)

As the content here is pretty sensitive to the user input, it has been kept dynamic and not built over Gridsome.


## Routes

* `/` : home page, where it is displayed favorite articles, recent ones, and the main call to actions.

* `/artigos` : full list of articles ordered by date.

* `/artigo/:slug`:  single article page, defined by _slug_

* `/categorias/:id`: list of articles belonged to the _id_ category; here the user can view them ordered by date or by didactics.

* `/desbloqueando-a-escrita`: landing page for a free ebook, with a Mailchimp form.

* `/sobre`: about page.

* `/contato`: contact page, with a Netlify form.

* `/busca?term=term`: list of articles matching the _term_ queried.


## API

It consumes a backend API hosted in Heroku. The repository is here: [ficcionados-backend](https://github.com/kgjoner/ficcionados-backend)

In general, the calls are made during the build phase to generate the static assets. Those calls are found in the `gridsome.server.js` file.

But there are two situation that require feeding the components with an unpredictable dynamic content:

1. Searching for articles accordingly to a keyword input by the user (the _/busca_ route above).
2. Drawing random articles from a given branch category (to display related articles to the one just read).

So they required a dynamic communication with the backend. These communications are found in `/src/api` folder. 

It also uses the Netlify forms API, and its call configuration can also be found in the folder above mentioned.

At least, despite using Mailchimp forms, they do not require extra configuration beyond what is in the HTML.


## Folder Structure

```
 /src
 |   /api
 |   |   /backend.js
 |   |   /netlifyForm.js
 |   /assets
 |   |   /css
 |   |   |   /...
 |   |   /fonts
 |   |   |   /...
 |   |   /img
 |   |   |   /...
 |   /components
 |   |   /article
 |   |   |   (the ones used in the article page)
 |   |   |   /Component.vue
 |   |   |   /...
 |   |   /home
 |   |   |   (the ones used in the home page)
 |   |   |   /Component.vue
 |   |   |   /...
 |   |   /template
 |   |   |   (the ones used in the website layout)
 |   |   |   /Component.vue
 |   |   |   /...
 |   |   /utils
 |   |   |   (the ones used and reused in many pages and components)
 |   |   |   /Component.vue
 |   |   |   /...
 |   /directives
 |   |   /VueDirective.js
 |   |   /...
 |   /pages
 |   |   (the components here are used to generate routes)
 |   |   /Route.vue
 |   |   /...
 |   /templates
 |   |   (the components here are used to generate routes based on data collections)
 |   |   /Article.vue
 |   |   /Category.vue
 |   /utils
 |   |   /...
 |   App.vue
 |   constant.js
 |   main.js
 |   store.js
 /static
 |   articleFunctions.js
 |   favicon.ico
 |   robots.txt
 |   sitemap.xml

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run develop
```

### Compiles and generates static pages for production
```
npm run build
```
