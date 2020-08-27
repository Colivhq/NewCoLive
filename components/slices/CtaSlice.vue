<template>
    <div class="cta-wrapper" id="cta-section">
        <!-- <div class="background" v-if="slice.primary.background_image">
            <picture>
                <source :srcset="slice.primary.background_image.mobile.url" media="(max-width: 750px)">
                <source :srcset="slice.primary.background_image.tablet.url" media="(max-width: 991px)">
                <img :src="slice.primary.background_image.url">
            </picture>
        </div> -->
        <section class="cta" :style="{ 'background-color': slice.primary.cta_background_color, backgroundImage: 'url(' + backgroundImage + ')', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }">
            <prismic-rich-text :field="slice.primary.cta_text" class="text"/>
            <div class="cta-button" v-if="slice.primary.cta_button[0].text != ''">
                <prismic-link :field="slice.primary.cta_button_link">
                    <span
                        :style="{ 'background-color': slice.primary.cta_button_color, 'color': slice.primary.cta_button_text_color }">
                        {{ $prismic.asText(slice.primary.cta_button) }}
                    </span>
                </prismic-link>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: ['slice'],   
    name: 'cta-slice',
    data () {
        return {
            email: '',
            screenSize: '',
            backgroundImage: ''
        }
    },
    created() {
		if(process.browser) {
			window.addEventListener('resize', this.handleResize); 
		}
		this.handleResize();
	},
    methods: {
        handleResize() {
            this.screenSize = (process.browser) ? screen.width : ''
            if(this.screenSize <= 750) {
                this.backgroundImage = this.slice.primary.background_image.mobile.url
            } else if(this.screenSize > 750 && this.screenSize <= 991) { 
                this.backgroundImage = this.slice.primary.background_image.tablet.url
            } else if(this.screenSize > 991) {
                this.backgroundImage = this.slice.primary.background_image.url
            }
		},
        addToSendgrid() {
            if(this.email != '') {
                const config = {
                    headers: { Authorization: `Bearer Bearer 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` }
                };

                const bodyParameters = [
                    { "email": this.email}
                ];

                this.$axios.post('https://api.sendgrid.com/v3/contactdb/recipients', 
                    bodyParameters,
                    config
                ).then((response) => {
                    if(response.status == 200) {
                        alert('Success')
                    }
                })
                .catch((error) => {
                    alert('Error', error)
                })
            } else {
                alert('Enter valid email')
            }
        }
    }
}
</script>
<style scoped>
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #72BF44;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #72BF44;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #72BF44;
}
:-moz-placeholder { /* Firefox 18- */
  color: #72BF44;
}
.email {
    width: 30%;
    margin: 20px auto;
} 
.cta {
    width: 100%;
    min-height: 8em;
    text-align: center;
    color: white;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 90px 15px;
    /* position: absolute; */
    top: 0;
    height: 100%;
}
.cta-button a {
    background-color: #fff;
    padding: 9px 15px;
    border-radius: 5px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
    margin-top: 25px;
    max-width: 200px;
    font-size: 16px;
    width: 100%;
    text-align: center;
    box-shadow: 0 10px 6px -6px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0 10px 6px -6px rgba(0,0,0,0.5);
    -moz-box-shadow: 0 10px 6px -6px rgba(0,0,0,0.5);
}
.cta-wrapper {
    position: relative;
    background: #ffffff;
    width: 100%;
    overflow: hidden;
    /* z-index: 8; */
}
.cta-wrapper .content {
    position: relative;
    z-index: 100;
}
/*.cta-wrapper .background{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    width: 100%;
}*/
.cta-wrapper .background > picture{
    display: block;
}
.cta-wrapper .background img {
    vertical-align: middle;
}
.cta-wrapper .background img, .cta-wrapper .background source {
    width: 100%;
}
.cta .text >>> :first-child {
  margin-bottom: 0;
  font-size: 48px;
  font-weight: bold;
  line-height: normal;
}
@media (max-width: 1299px) {
  .cta .text >>> :first-child {
    font-size: 28px;
  }
}
@media (max-width: 991px) {
    .cta {
        padding: 70px 15px;
    }
    .cta-button a {
        padding: 10px 20px;
        margin-top: 40px;
        font-size: 20px;
    }
}
@media (max-width: 767px) { 
    .cta .cta-mobile-button {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #72bf44; 
        width: 100%;
        right: 0;
        opacity: 1;
        z-index: 9999;
        box-sizing: border-box;
    }
    .cta .cta-mobile-button a {
        font-size: 24px;
        display: block;
        background-color: #72bf44;
        color: #fff;
        font-weight: normal;
        margin-top: 0;
        border-radius: 0;
    }
}
@supports (-webkit-overflow-scrolling: touch) {
    .cta .cta-mobile-button {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #72bf44; 
        width: 100%;
        right: 0;
        opacity: 1;
        z-index: 9999;
        box-sizing: border-box;
    }
}
@media (min-width: 768px) { 
    .cta .cta-mobile-button {
        display: none;
    }
}
@media (max-width: 575px) {
    .cta {
        padding: 40px 15px;
    }
    
    .cta .text >>> :first-child {
        font-size: 20px;
    }
    .cta {
        min-height: inherit;
    }   
}
</style>