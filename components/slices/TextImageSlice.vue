<template>
    <section :style="{ 'background-color': slice.primary.background }">
        <div class="inner-content-wrapper" >
            <div class="cms-main-wrap tbp50 text-img">
                <prismic-rich-text :field="slice.primary.title" class="topic-heading"/>
                <!-- For desktop version: START -->
                <div class="desktop d-none d-md-block">
                    <template v-for="(item, index) in slice.items">
                        <div class="row right-img" :key="index" v-if="item.image_position == 'Right'">
                            <div class="col-lg-6 col-md-6">
                                <prismic-image :field="item.image" class="single-image"/>
                            </div>
                            <div class="col-lg-6 col-md-6 align-self-center">
                                <prismic-rich-text class="title" :field="item.title"/>
                                <prismic-rich-text class="description" :field="item.subtitle"/>
                                <prismic-rich-text class="details" :field="item.text"/>
                            </div> 
                        </div>
                        <div class="row left-img" v-else :key="index">
                            <div class="col-lg-6 col-md-6 align-self-center">
                                <prismic-rich-text class="title" :field="item.title"/>
                                <prismic-rich-text class="description" :field="item.subtitle"/>
                                <prismic-rich-text class="details" :field="item.text"/>
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <prismic-image :field="item.image" class="single-image"/>
                            </div>   
                        </div>
                    </template>    
                </div>
                <!-- For desktop version: END -->
                <!-- For mobile version: START -->
                <div class="mobile d-md-none d-lg-none d-xl-none">
                    <template v-for="(item, index) in slice.items">
                        <div class="row" :key="index">
                            <div class="col-lg-12">
                                <prismic-image :field="item.image" class="single-image"/>
                            </div>
                            <div class="col-lg-12 align-self-center">
                                <prismic-rich-text class="title" :field="item.title"/>
                                <prismic-rich-text class="description" :field="item.subtitle"/>
                                <prismic-rich-text class="details" :field="item.text"/>
                            </div> 
                        </div>
                    </template>    
                </div>
                <!-- For mobile version: END -->
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: ['slice'],
  name: 'text-image'
}
</script>
<style>
.text-img .description h2 {
    color: #72767b ;
}
.text-img .title h2 {
    color: #d1d1d1;
    font-size: 50px;
}
.text-img .details p {
    line-height: 20px;
}
.right-img img {
    position: relative;
    left: 10%;
}
.left-img img {
    position: relative;
    right: 10%;
}
.right-img .align-self-center {
    padding: 0px 10% 0px 5%;
}
.left-img .align-self-center {
    padding: 0px 5% 0px 10%;
}
</style>