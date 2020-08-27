<template>
    <div class="inner-content-wrapper" id="pricing-table">
        <div class="cms-main-wrap">
            <prismic-rich-text :field="slice.primary.title" class="description"/>
            <prismic-rich-text :field="slice.primary.description" class="details"/>
            <div class="pricing-plans">
                <div class="row">
                    <div class="col-lg-4 col-md-4 plan-inner" v-for="(item, index) in slice.items" :key="'plan-' + index"  :style="{ 'background-color': item.column_color }">
                        <div class="top-plan-content">
                            <prismic-rich-text :field="item.plan" class="plan-name"/>
                            <prismic-rich-text :field="item.description" class="plan-description"/>
                            <div class="plan-price"> 
                                <p v-if="item.price != null"><span class="pricing-symbol">US$</span>{{ item.price }}</p>
                            </div>
                            <div class="price-details">
                                <template v-for="(pdetail, i) in item.price_details">
                                    <p :key="'pdetails'+i">{{ pdetail.text }}</p>
                                </template>
                            </div>
                            <div class="price-button" :style="{ 'background-color': item.button_color }">
                                <prismic-link :field="item.button_link1">
                                    <span :style="{ 'color': item.button_text_color }">{{ $prismic.asText(item.button_text) }}</span>
                                </prismic-link>
                            </div>
                        </div>
                        <div :class="'plan-details' + ' plan_'+index ">
                            <template v-for="(listItem, i) in item.details">
                                <p :key="'listItem'+i">{{ listItem.text }}</p>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'pricing-slice'
}
</script>

<style>
#pricing-table .description h2 {
    margin-bottom: 0;
    color: #222;
}
#pricing-table .details p {
    font-size: 14px;
    color: #9f9f9f;
    font-weight: 500;
    line-height: 18px;
}
.pricing-plans .plan-inner {
    text-align: center;
    padding: 0;
}
.pricing-plans .plan-inner .top-plan-content {
    padding: 40px 40px 0px 40px;
}
.pricing-plans .plan-name h3 {
    color: #222222;
    font-weight: 600;
}
.pricing-plans {
    margin-top: 30px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
    margin-right: 15px;
}
.pricing-plans .plan-inner .plan-description p {
    color: #333;
    font-size: 16px;
    line-height: 22px;
}
.pricing-plans .plan-inner .plan-price {
    font-size: 32px;
    color: #222;
    font-weight: 500;
    height: 28px;
}
.pricing-plans .plan-inner .plan-price .pricing-symbol { 
    font-size: 12px;
    vertical-align: super;
}
.pricing-plans .plan-inner .price-details p {
    font-size: 14px;
    color: #222;
    margin-bottom: 0;
    line-height: 22px;
}
.pricing-plans .plan-inner .price-button {
    border: 2px solid rgb(119, 191, 69);
    padding: 7px;
    border-radius: 4px;
    letter-spacing: 0;
    max-width: 150px;
    display: block;
    margin: 0 auto;
    box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);
    margin-top: 40px;
}
.pricing-plans .plan-inner .price-button a { 
    text-decoration: none;
}
.pricing-plans .plan-inner .price-button span {
    font-size: 13px;
    font-weight: 600;
}
.pricing-plans .plan-inner .plan-description {
    min-height: 110px;
}
.pricing-plans  .price-details  {
    margin-top: 30px;
    color: #222;
    letter-spacing: 0;
    font-size: 11px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 66px;
}
.pricing-plans .plan-details {
    position: relative;
    padding-top: 80px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
}
.pricing-plans .plan-details:before {
    content: '';
    position: absolute;
    border-top: 1px solid #c6b8b8;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 40px;
}
.pricing-plans  .plan-details p {
    position: relative;
    padding-left: 20px;
    margin-bottom: 0;
    font-size: 13px;
    color: #222;
    font-weight: 500;
    display: table;
    margin: 0 auto;
}
.pricing-plans  .plan-details p:before {
    font-family: FontAwesome;
    content: "\f00c";
    font-style: normal;
    font-weight: normal;
    position: absolute;
    font-size: 12px;
    color: #77bf45;
    left: 0;
}
.pricing-plans .plan-details:not(.plan_0) p:first-child:before { 
    content: "";
}
@media(max-width: 991px) {
    .pricing-plans .plan-inner .top-plan-content {
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 30px;
    }
    .pricing-plans .plan-details {
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
    }
}
@media(max-width: 767px) { 
    .pricing-plans {
        max-width: 500px;
        margin: 0 auto;
        border: 1px solid #e8e8e8;
        padding: 15px;
        display: block;
    }
    .pricing-plans .plan-inner .plan-price {
        height: auto;
    }
    .pricing-plans .plan-inner .plan-description {
        min-height: inherit;
    }
    .pricing-plans .price-details {
        min-height: inherit;
    }
    .pricing-plans .plan-details:before {
        border-top: none;     
    }
    .pricing-plans {
        border: none;
    }
    .pricing-plans .plan-inner {
        border: 1px solid #e8e8e8;
        margin-bottom: 50px;
    }
}
</style>
