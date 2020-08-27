<template>
  <section>
    <!-- Banner component -->
    <homepage-banner :banner="banner"/>
    <!-- Slices block component -->
    <slices-block :slices="slices"/>
  </section>
</template>

<script>
// Imports for all components
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'Home',
  layout: 'homepage',
  components: {
    HomepageBanner,
    SlicesBlock
  },
  head () {
    return {
      title: this.seo_page_title,
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'canonical', href: this.meta_url },
      ],
      meta: [
        { hid: 'author', name: 'author', content: this.meta_author },
        { hid: 'description', name: 'description', content: this.seo_description },
        {
          hid: 'ogtitle',
          property: 'og:title',
          content: this.meta_title
        },
        {
          hid: 'ogdescription',
          property: 'og:description',
          content: this.meta_description
        },
        {
          hid: 'ogimage',
          property: 'og:image',
          content: this.meta_image
        },
        {
          hid: 'ogurl',
          property: 'og:url',
          content: this.meta_url
        },
        {
          hid: 'ogtype',
          property: 'og:type',
          content: 'Website'
        },
        {
          hid: 'ogsite_name',
          property: 'og:site_name',
          content: this.meta_site_name
        },
        {
          hid: 'twittertitle',
          name: 'twitter:title',
          content: this.twitter_title
        },
        {
          hid: 'twitterdescription',
          name: 'twitter:description',
          content: this.twitter_description
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twittercreator',
          name: 'twitter:creator',
          content: this.twitter_handle
        },
        {
          hid: 'twitterimage',
          name: 'twitter:image',
          content: this.twitter_image
        },
      ]
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get the home page content
      const homepage = (await $prismic.api.getSingle('homepage')).data
      return {
        // Page content
        banner: homepage.homepage_banner[0],
        // Set slices as variable
        slices: homepage.body,
        seo: homepage,
        //SEO
        seo_page_title: (homepage.seo_page_title.length && homepage.seo_page_title[0]) ?
          homepage.seo_page_title[0].text : '',
        seo_description: (homepage.seo_description.length &&
          homepage.seo_description[0].text != null) ? 
              homepage.seo_description[0].text.length > 170 ?
              homepage.seo_description[0].text.substring(0, 167) + '...' :
              homepage.seo_description[0].text :
          '',
        meta_title: (homepage.meta_title.length && homepage.meta_title[0]) ? homepage.meta_title[0].text : '',
        meta_description: (homepage.meta_description.length && homepage.meta_description[0].text != null) ?
            homepage.meta_description[0].text.length > 170 ?
            homepage.meta_description[0].text.substring(0, 167) + '...' :
            homepage.meta_description[0].text :
          '',
        meta_image: (homepage.meta_image.url) ? homepage.meta_image.url : '',
        meta_url: (homepage.meta_url) ? homepage.meta_url.url : '',
        meta_site_name: (homepage.meta_site_name && homepage.meta_site_name.length) ? homepage.meta_site_name[0].text : '',
        twitter_handle: (homepage.twitter_handle) ? homepage.twitter_handle : '',
        twitter_title: (homepage.twitter_title && homepage.twitter_title.length) ? homepage.twitter_title[0].text : '',
        twitter_description: (homepage.twitter_description && homepage.twitter_description.length) ? homepage.twitter_description[0].text : '',
        twitter_image: (homepage.twitter_image) ? homepage.twitter_image.url : '',
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
