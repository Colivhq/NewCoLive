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
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'embed-slice'
}
</script>

<style>
</style>
