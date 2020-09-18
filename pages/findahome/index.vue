<template>
	<section class="content-page findahome">
		<building-card-slice :home-lists="homeLists" :home-lists-copy="homeLists" :default-filter="defaultFilter"/>
		<slices-block :slices="slices"/>
		<div class="slider-cms">	
			<div v-if="pending" class="loader"></div>
		</div>
	</section>
</template>

<script>
// Imports for all components
import SlicesBlock from '~/components/SlicesBlock.vue'
import BuildingCardSlice from '~/components/slices/BuildingCardSlice.vue'
export default {
	name: 'findahome',
	layout: 'homepage',
	props: ['defaultFilter'],
	components: {
		SlicesBlock,
		BuildingCardSlice
	},
	data () {
		return {
			homeLists: [],
			pending: true,
			slices: {}
		}
	},
	head () {
		return {
			title: this.seo_page_title,
			htmlAttrs: {
				lang: 'en'
			},
			link: [
				{ rel: 'canonical', href: this.meta_url },
			],
			script: [
				{ type: 'application/ld+json', json: this.homeListLd }
			],
			meta: [
				{ hid: 'author', name: 'author', content: this.meta_author },
				{ hid: 'description', name: 'description', content: this.seo_description },
				{
					hid: 'ogtitle',
					property: 'og:title',
					content: this.meta_title
				},
				{
					hid: 'ogdescription',
					property: 'og:description',
					content: this.meta_description
				},
				{
					hid: 'ogimage',
					property: 'og:image',
					content: this.meta_image
				},
				{
					hid: 'ogurl',
					property: 'og:url',
					content: this.meta_url
				},
				{
					hid: 'ogtype',
					property: 'og:type',
					content: 'Website'
				},
				{
					hid: 'ogsite_name',
					property: 'og:site_name',
					content: this.meta_site_name
				},
				{
					hid: 'twittertitle',
					name: 'twitter:title',
					content: this.twitter_title
				},
				{
					hid: 'twitterdescription',
					name: 'twitter:description',
					content: this.twitter_description
				},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary'
				},
				{
					hid: 'twitterimage',
					name: 'twitter:image',
					content: this.twitter_image
				},
			],
		}
	},
	async asyncData({ $prismic, params, error, store, defaultFilter, $axios }) {
		try{
			// Query to get post content
			//const document = (await $prismic.api.getByUID('page', params.uid)).data
			const appartments = await $axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
				//"operatorId": "HaF6mb19L6AzWVavPr5t",
				"neighborhoodId": "",
				"cityId": (defaultFilter != undefined && defaultFilter.cityId != undefined) ? defaultFilter.cityId : ""
			},{
				headers: {
					Authorization: 'Bearer '+process.env.bearer
				}
			})
			let homeList = [];
			let homeListLd = [];
			if(appartments) {
				if(appartments.data.data.length > 0) {
					appartments.data.data.forEach(function(appartment, index) {
						if(appartment.homeId != undefined) {
							let roomType = [];
							let priceCurrency = '';
							let startingPrice = 0;
							if(appartment.rooms != undefined && appartment.rooms.length > 0) {
								// Extract unique room price
								let roomPrice = [...new Set(appartment.rooms.map(function(item){ 
									if(item.startingPrice != undefined) 
										return { startingPrice: item.startingPrice, priceCurrency: item.priceCurrency } 
									})
								)];
								// Extract unique room type
								roomType = [...new Set(appartment.rooms.map(item => item.type))];
							
						
								// Sort array in assending order ro extract small price
								roomPrice.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
								
								if(roomPrice.length > 0) {
									roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
									startingPrice = roomPrice[0].startingPrice
									priceCurrency = roomPrice[0].priceCurrency
								}
							}
							
							var cardImg = {
								url: '',
								altText: ''
							};
							if(appartment.picture != undefined && appartment.picture.versions.length > 0) {
								cardImg.altText = appartment.picture.description;
								appartment.picture.versions.forEach(function(image) { 
									if(image.versionsName == 'card') {
										cardImg.url = image.link;
									}
								});
								
							}
							if(appartment.listingType != undefined && appartment.listingType != '') {
								roomType.push(appartment.listingType)
							}
							homeList.push({
								homeID: appartment.homeId,
								banner: cardImg,
								cityName:appartment.cityName,
								name:appartment.name,
								neighborhoodName:appartment.neighbourhoodName,
								address:appartment.address,
								description: (appartment.description != null && appartment.description.length > 97) ? appartment.description.substring(0, 97) + '...' : appartment.description,
								startingPrice: startingPrice,
								priceCurrency: priceCurrency,
								availability: appartment.availability,
								roomType: roomType,
								totalBedrooms: appartment.totalBedrooms,
								mapLocation: appartment.mapLocation
							})
							homeListLd.push( {
								"@context": "http://schema.org/",
								"@type": "Apartment",
								"accommodationCategory": "Apartment",
								"address": appartment.address + ' ' + appartment.postalCode + ' '+ appartment.cityName,
								"description": appartment.description,
								"image": cardImg.url,
								"name": appartment.name,
								"numberOfRooms": appartment.totalBedrooms,
								"url": process.env.baseUrl + '/findahome/' + params.uid,
								"geo": {
									"@type": "GeoCoordinates",
									"latitude": appartment.mapLocation._latitude,
									"longitude": appartment.mapLocation._longitude
								}
							})
						}
					});
					homeList.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
					//store.commit('setHomeLists', homeList)
					//resolve(appartments)
				}
			}
			const document = (await $prismic.api.getByUID('page', 'findyourhome')).data
			return {
				// Page content
				banner: {
					hero_image: document.hero_image,
					title: document.page_title,
					tagline: document.page_description
				},
				// Set slices as variable
				slices: document.page_content,
				homeLists: homeList,
				homeListLd:  {
					"@context": "http://schema.org/",
					"@graph": homeListLd
				},
				//SEO
				seo_page_title: (document.seo_page_title.length) ? document.seo_page_title[0].text : '',
				seo_description: (document.seo_description[0].text != '' &&  document.seo_description[0].text.length > 170) ?  document.seo_description[0].text.substring(0, 167) + '...' :  document.seo_description[0].text,
				meta_title: (document.meta_title.length) ? document.meta_title[0].text : '',
				meta_description: (document.meta_description[0].text != '' &&  document.meta_description[0].text.length > 170) ?  document.meta_description[0].text.substring(0, 167) + '...' :  document.meta_description[0].text,
				meta_image: (document.meta_image.url) ? document.meta_image.url : '',
				meta_url: process.env.baseUrl+'/findahome',
				meta_site_name: process.env.COMPANY_NAME,
				twitter_title: (document.twitter_title.length) ? document.twitter_title[0].text : '',
				twitter_description: (document.twitter_description.length) ? document.twitter_description[0].text : '',
				twitter_image: (document.meta_image.url) ? document.meta_image.url : '',
				pending: false
			}
		} catch (e) {
			console.log('Error', e)
			// Returns error page
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	/* async fetch() {
		this.$store.dispatch("fetchHomelist", this.defaultFilter).then(response => {
			this.pending = false;
            console.log("Got some data, now lets show something in this component")
        }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again")
        })
	}, */
	/* mounted: function() {
        // This component just got created. Lets fetch some data here using an action
        this.$store.dispatch("fetchHomelist").then(response => {
			this.pending = false;
            console.log("Got some data, now lets show something in this component")
        }, error => {
            console.error("Got nothing from server. Prompt user to check internet connection and try again")
        })
    }, */
	fetchOnServer: false
}
</script>
<style scoped>
	.findahome >>> .form-cms-build {
		background-color: #fff !important;
		padding: 0px;
	}
	.content-page {
		padding-bottom: 0px;
	}
</style>
