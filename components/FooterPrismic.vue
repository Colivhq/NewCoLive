<template>
  <div>
    <footer class="footer" :style="background">
      <div class="footer-inner">
        <nav>
          <div class="row">
            <div class="col-lg-6 col-md-4 col-sm-3 footer-logo col-12">
              <prismic-link :field="fields.logo_link">
                <prismic-image :field="fields.logo"/>
              </prismic-link>
              <prismic-rich-text :field="fields.address" class="details" :style="{'color': fields.text_color}"/>
              
            </div>
            <div class="col-lg-6 col-md-8 col-sm-9 col-12" cols='12'>
              <div class="row mb-5">
                  <div class="col-lg-4 col-md-4 col-sm-4 footer-content" v-for="(slice, index) in slices" :key="'slice-' + index">
                    <template v-if="slice.primary.header_link.link_type == 'Any' || slice.primary.header_link.link_type == 'Document'">
                      <a href="javascript:void(0)" class="link-title" :style="{'color': fields.text_color}">
                        {{ slice.primary.header }}
                      </a>
                    </template>
                    <template v-for="(item, itemindex) in slice.items">
                      <prismic-link :key="'footer-'+itemindex" :field="item.item_link" class="link-title" :style="{'color': fields.text_color}">
                          {{ item.item }}
                      </prismic-link>
                    </template>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <a href="https://colivhq.com/page/operators" target="blank">
                    <img src="~/static/Powered_ColivHQ.png" alt="" height="50">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </footer>
    <div :style="{'background-color': bottom.backGround_color ,'color': bottom.text_color}" class="bottom-bar">
      <div class="row footer-bottom px-0">
        <div class="col-sm-6 footer-copyright pl-lg-0">
          <span class="logo-right-text">{{ fields.copyright }}</span>
        </div>
        <div class="col-sm-6 footer-social text-left text-md-right pr-0">
          <figure v-for="(item, index) in bottom.social_media_links" :key="'social_media_links-item-' + index" class="social-icon">  
            <prismic-link :field="item.social_media_link">
              <prismic-image :field="item.social_media_icon"/>
            </prismic-link>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import func from '../../vue-temp/vue-editor-bridge';
export default {
  name: 'FooterPrismic',
  data () {
    return {
      slices: [],
      fields: {
        address: [],
        logo: [],
        logo_link: [],
        barColor: [],
        copyright: '',
        footerColor: '',
        text_color: ''
      },
      bottom: {
        backGround_color: '',
        text_color: '',
        social_media_links: []
      }
    };
  },
  computed:{
    background () {
      if (this.fields.footerColor) {
        return {
          'background-color': this.fields.footerColor
        }
      }
    }
  },
  methods: {
    getMenu () {
      //Query to get menu content
      this.$prismic.api.getSingle('footer')
        .then((footerContent) => {
          this.slices  = footerContent.data.body
          this.fields.address = footerContent.data.address;
          this.fields.footerColor = footerContent.data.footer_color
          this.fields.text_color = footerContent.data.footer_text_color
          this.fields.logo = footerContent.data.logo;
          this.fields.logo_link = footerContent.data.logo_link;
          this.fields.copyright = footerContent.data.copyright;
          this.bottom.backGround_color = footerContent.data.bottom_bar_color
          this.bottom.text_color = footerContent.data.bottom_bar_text_color
          this.bottom.social_media_links = footerContent.data.social_media_links
        })
    },
  },
  created () {
    this.getMenu()
  }
}

</script>

<style scoped>

.footer {
  padding: 40px 15px 0px 15px;
  margin: 0 auto;
  text-align: center;
  max-width: none;
  position: relative;
  background-color: #8e8d8d;
}
footer .footer-detail .footer-logo {
  text-align: left;
  display: flex;
  align-items: center;
  color: #FFF;
}
.footer .footer-content {
  color: #FFF;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
}
.footer .footer-content .link-title {
  color: #FFF;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  display: block;
  text-align: left;
  line-height: 15px;
  text-decoration: none;
  cursor: pointer;
}
.footer .footer-content .footer-sublink {
  display: block;
  font-size: 14px;
  color: #FFF;
  text-align: left;
  line-height: normal;
  text-decoration: none;
}
.footer .footer-content .footer-sublink:hover {
  color: #72bf44;
}
.footer-detail ul {
  margin-bottom: 0;
  -webkit-box-pack: flex-end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: flex-end;
  justify-content: flex-end;
  padding-left: 0;
}
/*footer-bottom*/
.footer-bottom {
  padding: 10px 20px;
  margin-left: 0;
  margin-right: 0;
  max-width: 980px;
  margin: auto;
  /* background-color: rgb(245, 94, 97); */
}
.footer-bottom .footer-social .social-icon {
  display: inline-block;
  vertical-align: middle;
  float: right;
  -webkit-transform: scale(1);
  -moz-transform: scale(1); 
  -o-transform: scale(1); 
  -ms-transform: scale(1);
  transform: scale(1);
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
.footer-bottom .footer-social {
  text-align: right;
}
.footer-bottom .footer-social .social-icon img {
  height: 12px;
  margin: 0 10px;
} 
.footer-bottom .footer-social .social-icon:hover {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2); 
  -o-transform: scale(1.2); 
  -ms-transform: scale(1.2);
  transform: scale(1.2);
}
.footer .footer-bottom .footer-copyright >>> :first-child {
  color: #fff;
  text-align: left;
  margin-bottom: 0;
}
/* 7/5/2020 */
footer .footer-logo .logo-right-text {
    color: #FFF;
    letter-spacing: 0.5px;
    text-align: left;
    display: inline-block;
    vertical-align: text-top;
    margin-left: 10px;
    font-size: 14px;
}
footer .footer-logo {
  text-align: left;
}
.footer .footer-content .link-title:hover {
  color: #000000;
}

.bottom-bar {
  position: relative;
}
/* responsive */

@media(max-width: 1199px) {
  .footer .footer-content {
    padding: 0 15px;
  }
}
@media(max-width: 767px) {
  /* .footer-bottom{
    padding: 10px 0 60px 0;
  } */
  footer .footer-logo .logo-right-text {
    margin-left: 0;
  }
}
@media(max-width: 680px) {
  footer .footer-logo .logo-right-text {
    font-size: 12px;
  }
}
@media(max-width: 575px) {
  .footer .footer-detail .footer-logo {
    text-align: center;
    display: block;
    margin: 0 0 30px 0;
  }
  .footer-bottom .footer-social{
    text-align: center;
  }
  .footer-bottom .footer-social .social-icon {
    float: none;
  }
  .footer-detail ul{
    display: block;
  }
  .footer .footer-content{
    width: 33.33%;
    float: left;
    margin-bottom: 0;
  }
  .footer .footer-content a:last-child {
    margin-bottom: 30px;
  }
  .footer .footer-bottom .footer-copyright >>> :first-child {
    text-align: center;
  }
  footer .footer-logo {
    margin-bottom: 30px;
  }
}
@media(max-width: 420px) {
  .footer .footer-content {
    width: 100%;
    float: none;
  }
  .footer-detail {
    margin: 15px 0;
  } 
}
#app {
  margin: 0 auto;
  width: 100%;
}
</style>