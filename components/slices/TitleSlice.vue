<template>
  <div class="inner-content-wrapper title-wrap">
    <section class="top-title-main row">
        <h2 class="title-text">
          <prismic-image :field="slice.primary.section_icon"/>
          <prismic-rich-text :field="slice.primary.section_title"/>
        </h2>
    </section>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'title-slice'
}
</script>
<style>
.top-title-main {
  position: relative;
  margin-bottom: 45px;
  margin-left: 0;
  margin-right: 0;
}
.top-title-main .title-text > img {
  width: 66.5px;
  height: 63.3px;
}
.top-title-main .title-text {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: flex-end;
  -webkit-align-items: flex-end;
  -ms-flex-align: flex-end;
  align-items: flex-end;
}
@media (max-width: 991px) {
  .top-title-main {
    margin-bottom: 30px;
  } 
}
@media (max-width: 575px) {

}
</style>