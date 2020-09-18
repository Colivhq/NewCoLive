<template>
  <div class="inner-content-wrapper embedslice-cms">
    <div class="cms-main-wrap">
      <!-- If .embded is undefined, do not show on page, but show .embed_html -->
      <div class="eb-wrap">
        <prismic-embed :field="slice.primary.embed"/>
      </div>
      <!-- This here is the code to get the form. Currently is is not execuring the code, it's just pringint it on the screen-->
      <prismic-rich-text :field="slice.primary.embed_html"/>
    </div>
    <hr v-if="slice.slice_devider != undefined && slice.slice_devider === true"/>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'embed-slice',
  mounted() {
    // Remove lazy-load attribute
    $('.embedslice-cms iframe').removeAttr('v-lazy-load');
    var src = $('.embedslice-cms iframe').attr('data-src');
    $('.embedslice-cms iframe').removeAttr('data-src');
    $('.embedslice-cms iframe').attr('src', src);
  }
}
</script>

<style scoped>
hr {
  margin-top: 50px;
}
</style>
