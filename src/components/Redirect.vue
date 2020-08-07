<page-query>
query Redirect ($id: ID!) {
   article (id: $id) {
    slug
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
        title: `Redirect to /artigo/${this.$page.article.slug}`,
        meta: [
            { 'http-equiv': 'refresh', content: `0; URL='/artigo/${this.$page.article.slug}'`}
        ],
    }
  }
}
</script>