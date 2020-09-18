<template>
  <div>
    <div class="header-wrap">
      <header-prismic/>
    </div>
    <nuxt />
    <footer-prismic/>
  </div>
</template>
<script>
  window.prismic = {
    endpoint: 'https://colivhq.cdn.prismic.io/api/v2'
  };
</script>
<script>
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import FooterPrismic from '~/components/FooterPrismic.vue'

export default {
  components: {
    HeaderPrismic,
    FooterPrismic
  },
  head () {
    return {
      title: 'ColivHQ Web',
    }
  },
  // Called before rendering the layout (even for error page)
/*   async middleware({ store, $prismic }) {
    await store.dispatch('fetchMenu', $prismic)
  } */
}
</script>

