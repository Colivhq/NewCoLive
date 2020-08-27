<template>
    <div class="inner-content-wrapper">
        <div class="cms-main-wrap">
            <div class="main-part">
                <div class="section-main-title" ><prismic-rich-text :field="slice.primary.title" class="cms-title"/></div>
                <div class="room-card">
                    <div v-for="(item, item_index) in slice.items" :key="item.roomId" class="room-wrapper">
                        <div class="room-image">
                            <carousel 
                                v-if="slice.room_image && slice.room_image.toLowerCase() === 'slider'"
                                :autoplay="true" 
                                :loop="true"
                                :perPage="1"
                                :navigationEnabled="true"
                                :paginationEnabled="true"
                                :speed="2000" 
                                navigationNextLabel="<i class='fa angle-right cust-icon'></i>"
    				            navigationPrevLabel="<i class='fa angle-left cust-icon'></i>"
                                paginationActiveColor="#72bf44" 
                                :autoplayTimeout="3000">
                                <template v-for="(image, index) in item.roomPicturesArray" >
                                    <slide :key="'carousel_'+index" v-if=" (image.link != '')">
                                        <picture class="slider-img">
                                            <img :src="image.link" :alt="image.description">                                        
                                        </picture>
                                    </slide>
                                </template>
                            </carousel>
                            <template v-if="slice.room_image && slice.room_image.toLowerCase() != 'slider'">
                                <picture class="slider-img">
                                    <img :src="slice.items[0].roomPicturesArray[0].link" :alt="slice.items[0].roomPicturesArray[0].description">                                        
                                </picture>
                            </template>
                            <div class="overlay">
                                <p v-if="item.availability != null">{{ item.availability }}</p>
                                <p v-else>Not Available</p>
                            </div>
                        </div>
                        <div class="room-detail" :key="item_index" :style="{'background-color': slice.background}">
                            <div class="detail-inner">
                                <div class="type">
                                    <h3>{{ item.roomName }}</h3>
                                </div>
                                <div class="desc">
                                   <p v-html="item.description" class="feature"></p>
                                </div>
                                <div class="btn-wrapper">
                                    <div class="price">
                                        <p>Starting at {{ item.priceCurrency}}{{ Number(item.startingPrice).toLocaleString() }} {{ item.priceUnit }}</p>
                                    </div>
                                    <a v-if="(item.availability == 'Available' || item.availability == 'At least a bed available' || item.availability == 'Available soon')" href="javascript:void(0)" ref="item.roomId"  class="request-btn" @click="showModal(item.roomId)">Book now</a>
                                    <a v-else-if="(item.availability == 'Available')" href="javascript:void(0)" ref="item.roomId"  class="request-btn" @click="showModal(item.roomId)"> Join the waiting list</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const FindaHomeSideForm = () => import("../forms/FindaHomeSideForm.vue");
    export default {
        props: ['slice'],   
        name: 'room-slice',
        data () {
            return {
                waitListLink: '',
                sliderImages: [],
                clickSlice: {}
            }
        },
        methods: {
            showModal(roomId) {
                this.$store.commit('SET_ROOM_ID', roomId);
                this.$store.commit('SET_MODAL_FLAG', true);
            }
        }
    }    
</script>



<style scoped> 
.btn-waitlist {
    color: #fff !important;
    background-color: #72bf44 !important;
    border-color: #72bf44 !important;
}
[id^=wait-list-modal___] {
    z-index: 99999 !important;
}
#modal-header {
    margin: unset !important;
    max-width: unset  !important;
}
.section-main-title .cms-title >>> :first-child {
  color: #222222;
  margin-bottom: 40px;
  text-align: left;
}
.room-wrapper {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 45px;
}
.room-card {
    margin-top: 50px;
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button {
    top: 35%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 0;
    border-radius: .3125rem;
    padding: 0;
    outline: 0;
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button .angle-left {
	position: relative;
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button .cust-icon:before,
.room-wrapper .room-image >>> .VueCarousel-navigation-button .cust-icon:after {
	content: '';
    position: absolute;
    height: 10px;
    width: 75px;
    background-color: #72bf44;
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button.VueCarousel-navigation-prev .cust-icon.angle-left:before {
    transform: rotate(-60deg);
	-webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button.VueCarousel-navigation-prev .cust-icon.angle-left:after {
    transform: rotate(60deg);
	-webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
    top: 59px;
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button.VueCarousel-navigation-next .cust-icon.angle-right:before {
	right: 10px;
	left: auto;
	transform: rotate(60deg);
	-webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);

}
.room-wrapper .room-image >>> .VueCarousel-navigation-button.VueCarousel-navigation-next  .cust-icon.angle-right:after {
	right: 10px;
	left: auto;
	transform: rotate(-60deg);
	-webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
    top: 79px;
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button .fa {
   color: rgba(255,255,255,1);
    
}
.room-wrapper .room-image >>> .VueCarousel-navigation-button.VueCarousel-navigation-prev, .room-wrapper .room-image >>> .VueCarousel-navigation-button.VueCarousel-navigation-next { 
	padding: 0px 18px!important;
}
.room-wrapper .room-image >>> .VueCarousel-pagination {
	position: absolute;
    bottom: 15px;
    top: auto;
}
.room-wrapper .room-image ,
.room-wrapper .room-detail {
    width: 50%;
    position: relative;
}
.room-wrapper .room-image img {
    height: 100%;
}
.room-wrapper .room-image .overlay {
    position: absolute;
    bottom: 25px;
    left: 25px;
}
.room-wrapper .room-detail {
    background-color: #fff8e5;
    padding: 35px 20px 35px 35px;
}
.room-wrapper .room-detail .feature {
    margin: 10px 15px 10px 0px;
    width: 100%;
    overflow: hidden;
}
.room-wrapper .room-detail  .btn-wrapper {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    position: relative;
}
.room-wrapper .room-detail  .btn-wrapper .request-btn {
    color: #fff;
    font-size: 17px;
    background-color: #72bf44;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
    position: absolute;
    right: 0;
    top: 0;
    bottom: auto;
}
.room-wrapper .room-detail  .btn-wrapper .price {
    padding-right: 100px;
}
.room-wrapper .room-detail {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.room-wrapper .room-detail  .detail-inner {
    width: 100%;
}
/* bedroom */
.room-wrapper .room-detail .type h3 {
    font-size: 25px;
    font-weight: 500;
}
.room-wrapper .room-detail .type >>> :first-child {
  color: #000000;
  /* font-weight: 600; */
  line-height: normal;
  margin-bottom: 0;
}
.room-wrapper .room-detail .desc >>> :first-child,
.room-wrapper .room-detail .size >>> :first-child {
  margin-top: 7px;
}
.room-wrapper .room-detail .feature >>> ul {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}
.room-wrapper .room-detail .desc p {
  font-size: 14px;
  font-weight: 400;
}
.room-wrapper .room-detail .desc >>> p ,
.room-wrapper .room-detail .feature >>> ul li ,
.room-wrapper .room-detail .size >>> p {
  /* font-size: 13px; */
  color: #000;
  line-height: normal;
  margin-bottom: 0;
}

.room-wrapper .room-detail .feature >>> p ,
.room-wrapper .room-detail .feature >>> ul li {
  position: relative;
  padding-left: 15px;
  color: #000;
  margin-bottom: 0;
  width: 50%;
  float: left;
  line-height: 18px;
  margin-top: 0px !important;
}
.room-wrapper .room-detail .feature >>> p:after ,
.room-wrapper .room-detail .feature >>> ul li:after {
  content: '';
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%); 
  -o-transform: translateY(-50%); 
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 0;
  height: 7px;
  width: 7px;
  background-color: #72bf44;
  border-radius: 50%;
}
 .room-wrapper .room-detail .price > :first-child {
    font-size: 18px;
    font-weight: 500;
}
.room-wrapper .room-detail .price >>> :first-child {
  color: #000;
  margin-bottom: 0;
}
.room-wrapper .room-image .overlay >>> :first-child {
  background-color: #f1eaef;
  border: 1px solid #ef5357;
  color: #000;
  padding: 0 10px;
  margin-bottom: 0;
  display: inline-block;
  vertical-align: middle;
}
@media (min-width: 800) and (max-width: 991px) { 
    .home-detail .room-wrapper {
        max-width: 480px;
        margin: 0 auto;
    }
}
@media (max-width: 991px) {
    .room-wrapper .room-detail .btn-wrapper {
        display: block;
    }
    .room-wrapper .room-detail .btn-wrapper .request-btn {  
        position: relative;
        margin-top: 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .room-wrapper .room-detail  .btn-wrapper .price {
        padding-right: 0;
    }
    .room-wrapper .room-image ,
    .room-wrapper .room-detail {
        width: 100%;
    }
}
@media (max-width: 767px) { 
    .VueCarousel-navigation-button.VueCarousel-navigation-next, .VueCarousel-navigation-button.VueCarousel-navigation-prev {
        display: none;
    }
}
@media (max-width: 767px) and (min-width: 576px) {
  .room-wrapper .room-detail .feature >>> p ,
  .room-wrapper .room-detail .feature >>> ul li {
      width: 100%;
  }
    .room-wrapper .room-image img {
		height: auto;
	}
}
@media (max-width: 575px) {
    .room-wrapper .room-image ,
    .room-wrapper .room-detail {
        width: 100%;
    }  
    .room-wrapper .room-image img {
		height: auto;
	}
    .section-main-title .cms-title >>> :first-child {
        font-size: 24px;
    }
    .room-wrapper .room-detail .btn-wrapper .request-btn {  
        position: relative;
        margin-top: 10px;
        display: inline-block;
        width: 100%;
        text-align: center;
        padding: 15px 0px;
        font-size: 20px;
        vertical-align: middle;
    }
}
@media (max-width: 420px) {
    .room-wrapper .room-detail {
        padding: 30px 15px;
    }
    .room-wrapper .room-detail .feature >>> p ,
    .room-wrapper .room-detail .feature >>> ul li {
        width: 100%;
    }
}



</style>
