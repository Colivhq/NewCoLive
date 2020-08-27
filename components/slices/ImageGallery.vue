<template>
  <div :class="custFullWidth" :style="{'background-color': slice.background}">
    <section :class="['image-gallery content-section'] + ' ' + [ custFullWidth == 'galley-full-width' ? 'inner-content-wrapper' : '']">
      <div class="cms-main-wrap">
        <div class="section-main-title">
          <prismic-rich-text :field="slice.primary.gallery_title" class="cms-title"/>
        </div>
        <div :class="'gallery row ' + [isGallaryClass ? gallaryClass : '']">
          <template v-for="(item, index) in slice.items" >
            <div v-if="slice.slice_label == 'onecol'" v-bind:key="index" class="gallery-item col-lg-12">        
              <prismic-image :field="item.image[slice.slice_label]" class="single-image"/> <!-- this sets the right image resolution, based on the slice label -->
              <h3><prismic-rich-text :field="item.feature" class="title"/></h3>
              <prismic-rich-text :field="item.image_description" class="description"/>
              <prismic-rich-text :field="item.overlay_text" />
              <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
            </div>
            <div v-else-if="slice.slice_label == 'twocol'" v-bind:key="index" class="gallery-item col-lg-6">
              <prismic-link :field="item.link" class="gallery-link">
                <prismic-image :field="item.image[slice.slice_label]"/> <!-- this sets the right image resolution, based on the slice label -->
                <h3 v-if="item.feature.length > 0"><prismic-rich-text :field="item.feature" class="title"/>{{item.feature.text}}</h3>
                <prismic-rich-text :field="item.image_description" class="description"/>
                <prismic-rich-text :field="item.overlay_text" class="image-link" />
                {{ $prismic.asText(item.link_label) }}
              </prismic-link>
            </div>
            <div v-else-if="slice.slice_label == 'threecol'" v-bind:key="index" class="gallery-item col-lg-4">
              <prismic-link :field="item.link" class="gallery-link">
                <prismic-image :field="item.image[slice.slice_label]"/> <!-- this sets the right image resolution, based on the slice label -->
                <h3 v-if="item.feature.length > 0"><prismic-rich-text :field="item.feature" class="title"/>{{item.feature.text}}</h3>
                <prismic-rich-text :field="item.image_description" class="description"/>
                <prismic-rich-text :field="item.overlay_text" class="image-link" />
                {{ $prismic.asText(item.link_label) }}
              </prismic-link>
            </div>
            <div v-else-if="slice.slice_label == 'fourcol'" v-bind:key="index" class="gallery-item col-lg-3">
              <prismic-image :field="item.image[slice.slice_label]"/> <!-- this sets the right image resolution, based on the slice label -->
              <h3><prismic-rich-text :field="item.feature" class="title"/></h3>
              <prismic-rich-text :field="item.image_description" class="description"/>
              <prismic-rich-text :field="item.overlay_text" />
              <prismic-link :field="item.link" class="gallery-link">{{ $prismic.asText(item.link_label) }}</prismic-link>
            </div>
            <div v-else-if="slice.slice_label == 'icons'" v-bind:key="index" class="gallery-item galley-item-icon col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <img :src="item.icon" :alt="item.name" /> <!-- this sets the right image resolution, based on the slice label -->
						  <div class="title">
                <h3>{{ item.name }}</h3>
              </div>
            </div>
            <div v-else-if="slice.slice_label == 'avatars'" v-bind:key="index" class="gallery-item galley-item-avatar col-lg-2 col-sm-2 col-xs-6">
				<img v-if="item.gender == 'male'" src="~/static/male.png" :alt="item.gender" ><!-- this sets the right image resolution, based on the slice label -->
				<img v-if="item.gender == 'female'" src="~/static/female.png" :alt="item.gender" >
				<div class="title">
					<h3>{{ item.standardizedJobTitle }}, {{ item.age }}</h3>
				</div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'image-gallery',
  data() {
    return {
      isGallaryClass: false,
      gallaryClass: '',
      custFullWidth: 'inner-content-wrapper'
    }
  },
  beforeMount() {
    if(this.slice.slice_label === 'avatars') {
        this.isGallaryClass = true
        this.gallaryClass = 'galley-custom-avatar'
    } else if(this.slice.slice_label === 'icons') {
        this.isGallaryClass = true
        this.gallaryClass = 'galley-custom-icon'
        this.custFullWidth = 'galley-full-width'
    }
  }
}
</script>

<!-- use slice.slice_label to determine the formatting. Here are its possible values:
onecol - should center the image, single row
twocol (630x630) - two images per rows, possible multiple rows
threecol (411x411) - three images per rows, likely mulpiple rows
fourcol (308x308) - four images per rows, likely multiple rows
icons (58x58) - three icons per rows, many rows
avatars (630x630) - as many images per rows as possible, it could go on a second row; align left
 -->
<style scoped>
.single-image {
  width: 100%!important;
}
.section-main-title .cms-title h3 {
  font-weight: 700;
  line-height: normal;
  font-size: 32px;
}
.section-main-title .cms-title >>> :first-child {
  color: #222222;
  margin-bottom: 40px;
  text-align: left;
}
.image-gallery.content-section .gallery-item {
  text-align: center;
  position: relative;
}
.image-gallery.content-section .image-link {
  position: absolute;
  margin-bottom: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.image-gallery.content-section .gallery-link {
  display: block;
}
.image-gallery .gallery img {
  margin-bottom: 15px;
  width: auto;
}
.image-gallery.content-section .gallery-item .title h4 {
  font-size: 25px;
}
.image-gallery.content-section .gallery-item .title > :first-child {
  color: #222222;
  margin-bottom: 18px;
}
.image-gallery.content-section .description  > :first-child {
  line-height: 20px;
  color: #333;
  margin-bottom: 15px;
}
.image-gallery.content-section .image-link  > :first-child {
  color: #fff;
  font-size: 46px;
  font-weight: 600;
  margin-bottom: 0;
}

/* Bedroom : .galley-item-avatar */
.image-gallery.content-section .gallery-item.galley-item-avatar {
  padding: 0 5px;
}
.image-gallery.content-section .gallery-item.galley-item-avatar .title  >>> :first-child {
  word-break: break-all;
  margin-bottom: 0;
}
.image-gallery.content-section .gallery-item.galley-item-avatar h3 {
  margin-bottom: 0;
  font-size: 12px;
}
.galley-custom-avatar {
  margin-top: 50px;
}
.galley-custom-avatar .galley-item-avatar img {
  margin-bottom: 0px;
}
/* Bedroom: .galley-custom-icon */
.galley-full-width .galley-custom-icon {
  padding-top: 15px;
}
.galley-full-width {
  background-color: #fff8e5;
  padding: 30px 0;
  margin-bottom: 50px;
}
.galley-custom-icon .galley-item-icon {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 30px;
}
.galley-custom-icon .galley-item-icon img {
  margin-bottom: 0;
}
.galley-full-width .content-section {
  margin-bottom: 0;
}
.image-gallery.content-section .gallery-item.galley-item-icon  .title >>> :first-child,
.image-gallery.content-section .gallery-item.galley-item-icon > h3 {
  margin-bottom: 0;
}
.image-gallery.content-section .gallery-item.galley-item-icon .title h3 {
    font-size: 25px;
}
.image-gallery.content-section .gallery-item.galley-item-icon  .title >>> :first-child {
  margin-left: 15px;
  font-weight: 400;
  text-align: left;
}
@media (max-width: 1199px) {
  .image-gallery.content-section {
    margin-left: auto;
    margin-right: auto;
  }  
}
@media (max-width: 1199px) and (min-width: 992px) {
  .image-gallery.content-section .gallery-item .title > :first-child {
    min-height: 60px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
@media (max-width: 991px) {
  .image-gallery.content-section .gallery-item  {
    width: 50%;
  } 
  .image-gallery.content-section .image-link > :first-child {
    font-size: 34px;
  }  
  .image-gallery.content-section .gallery-item.galley-item-icon .title > :first-child {
    font-size: 16px;
  }
}

@media (max-width: 575px) { 
  .section-main-title .cms-title >>> :first-child {
    font-size: 24px;
  }
  .image-gallery.content-section .gallery-item  {
    width: 100%;
    max-width: 308px;
    margin: 0 auto;
  }
  .image-gallery.content-section .gallery-item.galley-item-icon  {
    width: 50%;
  }
  .image-gallery.content-section .gallery-item.galley-item-avatar {
    width: 25%;
  }
}
@media (max-width: 480px) {
  .image-gallery.content-section .gallery-item.galley-item-icon  {
    width: 100%;
  } 
}
@media (max-width: 420px) { 
  .image-gallery.content-section .gallery-item.galley-item-avatar {
    width: 33.33%;
  }
}
</style>
