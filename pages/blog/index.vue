<template>
  <section>
    <!-- Banner component -->
    <homepage-banner :banner="banner"/>
    <!-- Slices block component -->
    <slices-block :slices="slices"/>
  </section>
</template>

<script>
// Imports for Prismic Slice components
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'blog',
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
  async asyncData({ $prismic, params, error }) {
    try{
	  // Query to get post content
	    const document = (await $prismic.api.getByUID('page', 'blog')).data
		
      return {
        document: document,
        // Page content
        banner: {
          hero_image: document.hero_image,
          title: document.page_title,
          tagline: document.page_description,
          title_color: document.title_color
        },
        // Set slices as variable
        slices: document.page_content,
        
        //SEO
        seo_page_title: (document.seo_page_title.length) ? document.seo_page_title[0].text : '',
        seo_description: (document.seo_description.length) ? document.seo_description[0].text : '',
        meta_title: (document.meta_title.length) ? document.meta_title[0].text : '',
        meta_description: (document.meta_description.length) ? document.meta_description[0].text : '',
        meta_image: (document.meta_image.url) ? document.meta_image.url : '',
        meta_url: process.env.baseUrl + '/blog',
        meta_site_name: (document.meta_site_name.length) ? document.meta_site_name[0].text : 'ColivHQ web',
        twitter_handle: (document.twitter_handle) ? document.twitter_handle : '',
        twitter_title: (document.twitter_title.length) ? document.twitter_title[0].text : '',
        twitter_description: (document.twitter_description.length) ? document.twitter_description[0].text : '',
        twitter_image: (document.twitter_image) ? document.twitter_image.url : '',
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
