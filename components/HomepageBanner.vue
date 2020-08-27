<template>
    <section class="slider-cms">
     
      <div class="homepage-banner">
        <div class="slider-outer">
          <!-- <img :src="mainView.url" :alt="mobileView.alt"> -->
          <div class="slicer-image-main">
            <picture>
              <source :data-srcset="banner.hero_image.phone.url" media="(max-width: 750px)" class="lazyload" >
              <source :data-srcset="banner.hero_image.tablet.url" media="(max-width: 991px)" class="lazyload" >
              <img :data-src="banner.hero_image.url" class="lazyload" >
            </picture>
          </div>
          <div class="silder-content inner-content-wrapper">
            <div class="cms-main-wrap">
              <div class="slider-inner">
                  <template v-if="banner.title_color || banner.text_color">
                    <span class="title">
                      <h1 :style="{ 'color': banner.title_color || banner.text_color}">
                        {{ banner.title[0].text }}
                      </h1>
                    </span>
                    <div v-if="banner.tagline" class="description">
                      <p :style="{ 'color': banner.title_color || banner.text_color}" >{{banner.tagline[0].text}}</p>
                    </div>
                  </template>
                  <template v-else>
                    <p class="title">
                    <prismic-rich-text :field="banner.title"/></p>
                    <prismic-rich-text :field="banner.tagline" v-if="banner.tagline" class="description"/>
                  </template>
                <prismic-link :field="banner.button_link" v-if="banner.button_link" class="slider-btn"  id="hero-join-us-today" :style="{ 'background-color': banner.button_color, 'color': banner.button_text_color }">
                  <span>{{ $prismic.asText(banner.button_label) }}</span>
                </prismic-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import lazysizes from 'lazysizes';
export default {
  props: ['banner'],
  name: 'homepage-banner',
}
</script>

<style scoped>
.h1{
  font-size: 1.3rem
}
.homepage .homepage-banner {
  width: 100%;
  background-size: cover;
}
.homepage .image-gallery .gallery-item.col-lg-6 img {
  margin-bottom: 0;
}
.homepage .image-gallery.content-section .description > :first-child {
  margin-bottom: 25px;
}
.homepage .gallery .gallery-item:nth-child(n+5) {
  margin-top: 40px;
}
.homepage .text-slice-cms .description > :first-child {
  margin-bottom: 90px;
}

@media (max-width: 991px) {
  .homepage .gallery .gallery-item:nth-child(n+3) {
    margin-top: 20px;
  }
}
@media (max-width: 575px) {
  .homepage .gallery .gallery-item:nth-child(n+2) {
    margin-top: 20px;
  }
}
</style>
