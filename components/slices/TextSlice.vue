<template>
  <div :class="custFullWidth + ' text-slice-cms'">
    <div class="cms-main-wrap">
      <prismic-rich-text :field="slice.primary.title" class="description"/>
        <prismic-rich-text :field="slice.primary.text" class="details"/>
        <div class="row image-block">
          <template v-for="(item, index) in slice.items" >
            <div v-if="slice.slice_label == 'onecol'" v-bind:key="index" class="col-lg-12 col-md-12 col-sm-12"> 
              <prismic-rich-text v-if="item.column.length > 0" class="only-text" :field="item.column"/>
              <prismic-rich-text v-if="item.images_only.length > 0" class="only-image" :field="item.images_only"/>
            </div>
            <div v-else-if="slice.slice_label == 'twocol'" v-bind:key="index" class="col-lg-6 col-md-6 col-sm-6">
              <prismic-rich-text v-if="item.column.length > 0" class="only-text" :field="item.column"/>
              <prismic-rich-text v-if="item.images_only.length > 0" class="only-image" :field="item.images_only"/>
            </div>
            <div v-else-if="slice.slice_label == 'threecol'" v-bind:key="index" class="col-lg-4 col-md-4 col-sm-4">
              <prismic-rich-text v-if="item.column.length > 0" class="only-text" :field="item.column"/>
              <prismic-rich-text v-if="item.images_only.length > 0" class="only-image" :field="item.images_only"/>
            </div>
            <div v-else-if="slice.slice_label == 'fullwidth'" v-bind:key="index" class="col-lg-6 col-md-6 col-sm-6">
              <prismic-rich-text v-if="item.column.length > 0" class="only-text" :field="item.column"/>
              <prismic-rich-text v-if="item.images_only.length > 0" class="only-image" :field="item.images_only"/>
            </div>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'text-slice',
  data() {
    return {
      custFullWidth: 'inner-content-wrapper'
    }
  },
  beforeMount() {
    if(this.slice.slice_label === 'fullwidth') {
        this.custFullWidth = 'fullslice'
    }
  }
}
</script>

<style scoped>
.text-section-2col {
  -webkit-column-count: 2; /* Chrome, Safari, Opera */
  -moz-column-count: 2; /* Firefox */
  column-count: 2;
  -webkit-column-gap: 40px; /* Chrome, Safari, Opera */
  -moz-column-gap: 40px; /* Firefox */
  column-gap: 40px;
}
.text-section-1col img,
.text-section-2col img,
.gallery img {
  margin-bottom: 1rem;
}
.text-section-1col p:last-child,
.text-section-2col p:last-child {
  margin-bottom: 0;
}
/* .text-slice-cms {
  margin-bottom: 190px;
} */
.text-slice-cms .details > :first-child {
  color: #444;
  margin-bottom: 0;
} 
.text-slice-cms .details > .block-img {
  text-align: center;
}
.text-slice-cms .details  p a {
  /* background-color: #72bf44; */
  /* color: #fff; */
  /* padding: 15px 30px; */
  border-radius: 5px;
  /* text-decoration: none; */
  display: inline-block;
  vertical-align: middle;
  /* margin-top: 35px; */
}
.text-slice-cms .details  p a {
  font-weight: bold;
}

.text-slice-cms .details  p a:hover {
  color: grey;
}

/* Media Queries */
@media(min-width:576px) {
    /** Only image */
    .text-slice-cms .image-block > .col-lg-4:nth-child(1) .only-image  {
        text-align: right;
    }
    .text-slice-cms .image-block > .col-lg-4:nth-child(2) .only-image {
        text-align: center;
    }
    .text-slice-cms .image-block > .col-lg-6:nth-child(1) .only-image {
        text-align: left;
    }  
    .text-slice-cms .image-block > .col-lg-4:nth-child(3) .only-image,
    .text-slice-cms .image-block > .col-lg-6:nth-child(2) .only-image {
        text-align: left;
    }

    /** Only text */
    .text-slice-cms .image-block > .col-lg-4:nth-child(1) .only-text {
        text-align: left;
    }
    .text-slice-cms .image-block > .col-lg-4:nth-child(2) .only-text {
        text-align: left;
    }
    .text-slice-cms .image-block > .col-lg-6:nth-child(1) .only-text {
        text-align: left;
    }  
    .text-slice-cms .image-block > .col-lg-4:nth-child(3) .only-text,
    .text-slice-cms .image-block > .col-lg-6:nth-child(2) .only-text {
        text-align: left;
    }
}
@media (max-width: 991px) {
  /* .text-slice-cms {
    margin-bottom: 100px;
  } 
  .text-slice-cms .details > :first-child {
    font-size: 20px;
    line-height: 28px;
  } */
  .text-slice-cms .details p a  {
    padding: 10px 20px;
  }
}
@media (max-width: 767px) {
  .text-section-2col {
    -webkit-column-count: 1; /* Chrome, Safari, Opera */
    -moz-column-count: 1; /* Firefox */
    column-count: 1;
    -webkit-column-gap: 40px; /* Chrome, Safari, Opera */
    -moz-column-gap: 40px; /* Firefox */
    column-gap: 40px;
  }
}
@media (max-width: 575px) {
  /* .text-slice-cms {
    margin-bottom: 60px;
  }  
  .text-slice-cms .details > :first-child {
    font-size: 17px;
  } */
  .text-slice-cms .image-block > div .only-image{
    text-align: center;
  }
  .text-slice-cms .image-block > div .only-text {
    text-align: left;
  }
  .text-slice-cms .details p a  {
    padding: 8px 15px;
    margin-top: 30px;
    font-size: 16px;
  }
}

</style>
