<template>
    <div class="inner-content-wrapper" >
        <div class="cms-main-wrap">
            <div :class="[isFaq == 'yes' ? 'small-cta-outer' : '']" >
                <section class="small-cta" :style="{ background: slice.primary.cta_background_color }">
                    <prismic-rich-text :field="slice.primary.cta_text" class="title"/>
                    <!-- <prismic-color :field="slice.primary.cta_background_color"/> -->
                    <div class="small-cta-button">
                        <prismic-link :field="slice.primary.button_link" :style="{ background: slice.primary.button_color }" >
                            {{ $prismic.asText(slice.primary.button) }}
                        </prismic-link>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['slice', 'isFaq'],   
  name: 'smallCta-slice'
}
</script>



<style scoped> 
.small-cta {
    padding: 30px 60px;
    width: 60%;
}
.small-cta .small-cta-button a {
    color: #fff;
    padding: 9px 15px;
    border-radius: 5px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
    margin-top: 25px;
    max-width: 180px;
    width: 100%;
    text-align: center;
    line-height: 28px;
    box-shadow: 0 10px 6px -6px rgba(0,0,0,0.5);
}
.small-cta .title >>> :first-child {
  color: #3f3d39;
  margin-bottom: 0;
}
@media (max-width: 991px) {
    .small-cta {
       width: 70%;
    }
    .small-cta .small-cta-button a {
        padding: 10px 10px;
    }
    .small-cta .title  >>> :first-child {
        font-size: 21px;
    }
}
@media (max-width: 575px) {
    .small-cta {
        padding: 30px;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
    }
    .small-cta .small-cta-button a {
        padding: 8px 15px;
        margin-top: 30px;
        font-size: 16px;
        width: auto;
        max-width: 100%;
    }
    .small-cta .title >>> :first-child  {
        font-size: 20px;
    }
}
</style>