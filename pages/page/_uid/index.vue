<template>
  <section :class="[isNormalLink ? 'custom-page-main' : '']">
    <!-- Banner component -->
    <homepage-banner v-show="!this.isFormSlice" :banner="banner"/>
    <!-- Slices block component -->
    <slices-block :slices="slices" :banner="banner"/>
  </section>
</template>

<script>
// Imports for Prismic Slice components
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'page',
  layout: 'homepage',
  components: {
    HomepageBanner,
    SlicesBlock
  },
  data() {
	  return {
      isFormSlice: false,
      isNormalLink: false
	  }
  },
  head () {
    return {
      title: this.seo_page_title,
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'canonical', href: this.meta_url },
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
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
      ],
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      // Query to get post content
      const document = (await $prismic.api.getByUID('page', params.uid)).data
      return {
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
        meta_url: (document.meta_url) ? document.meta_url.url : '',
        meta_site_name: (document.meta_site_name.length) ? document.meta_site_name[0].text : '',
        twitter_handle: (document.twitter_handle) ? document.twitter_handle : '',
        twitter_title: (document.twitter_title.length) ? document.twitter_title[0].text : '',
        twitter_description: (document.twitter_description.length) ? document.twitter_description[0].text : '',
        twitter_image: (document.twitter_image) ? document.twitter_image.url : '',
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  created () {
    const isForm = this.slices.filter(function(slice) {                
      if(slice.slice_type == 'form') {
        return slice;
      }
    });
    if(isForm.length >= 1) {
      this.isFormSlice = true;
    }
    if(this.$route.params.uid == 'privacy' || this.$route.params.uid == 'termsofservice') {
      this.isNormalLink = true;
    }
  },
}
</script>
<style>
.custom-page-main .text-slice-cms .details p a {
  background-color: transparent;
  color: #72bf44;
  padding: 0!important;
  margin: 0;
}
.custom-page-main .text-slice-cms .details p a:hover {
  color: #000;
}
</style>