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
 // don't create a template for the section
import SlicesBlock from '~/components/SlicesBlock.vue'
import BuildingCardSlice from '~/components/slices/BuildingCardSlice.vue'
export default {
	name: 'city-page',
	components: {
		SlicesBlock,
		BuildingCardSlice	
	},
	data() {
		return {
			defaultFilter: {
				city: ''
			},
			homeLists: [],
			pending: true,
			slices: {}
		}
	},
	head () {
		return {
			title: this.meta_title,
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
					content: this.meta_title
				},
				{
					hid: 'twitterdescription',
					name: 'twitter:description',
					content: this.meta_description
				},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary'
				},
				{
					hid: 'twittercreator',
					name: 'twitter:creator',
					content: this.twitter_handle
				},
				{
					hid: 'twitterimage',
					name: 'twitter:image',
					content: this.meta_image
				},
			],
		}
	},
	/* async asyncData({ $prismic, params, error }) {
		try{
			// Query to get post content
			//const document = (await $prismic.api.getByUID('page', params.uid)).data
			const document = (await $prismic.api.getByUID('city', params.uid)).data

			return {
				// Page content
				document: document,
				defaultFilter: {
					city: params.uid.charAt(0).toUpperCase() + params.uid.slice(1),
					cityId: document.cityid
				},
				//SEO
				meta_title: (document.page_title.length) ? document.page_title[0].text : '',
				meta_description: (document.seo_description.length) ? document.seo_description[0].text : '',
				meta_image: (document.meta_image.url) ? document.meta_image.url : '',
				meta_site_name: 'ColivHQ web',
				meta_url: process.env.baseUrl+'/city/'+params.uid,
				twitter_handle: 'ColivHQ',
			}
		} catch (e) {
			console.log('Error', e)
			// Returns error page
			error({ statusCode: 404, message: 'Page not found' })
		}
	}, */
	async asyncData({ $prismic, params, error, store, $axios }) {
		try{
			// Query to get post content
			//const document = (await $prismic.api.getByUID('page', params.uid)).data
			const document = (await $prismic.api.getByUID('city', params.uid)).data
			console.log('document.cityid', document.cityid)
			const appartments = await $axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
				//"operatorId": "HaF6mb19L6AzWVavPr5t",
				"neighborhoodId": "",
				"cityId": (document.cityid != undefined ) ? document.cityid : ""
			},{
				headers: {
					Authorization: 'Bearer '+process.env.COLIV_HQ_KEY
				}
			})
			let homeList = [];
			let homeListLd = [];
			if(appartments) {
				if(appartments.data.data.length > 0) {
					appartments.data.data.forEach(function(appartment, index) {
						if(appartment.homeId != undefined) {
							
							// Extract unique room price
							let roomPrice = [...new Set(appartment.rooms.map(function(item){ 
								if(item.startingPrice != undefined) 
									return { startingPrice: item.startingPrice, priceCurrency: item.priceCurrency } 
								})
							)];
						
							// Sort array in assending order ro extract small price
							roomPrice.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
							let priceCurrency = '';
							let startingPrice = 0;
							if(roomPrice.length > 0) {
								roomPrice = roomPrice.slice(0,1) // Extract 1st element from array as starting price
								startingPrice = roomPrice[0].startingPrice
								priceCurrency = roomPrice[0].priceCurrency
							}
							
							// Extract unique room type
							let roomType = [...new Set(appartment.rooms.map(item => item.type))];
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
				meta_title: (document.page_title.length) ? document.page_title[0].text : '',
				meta_description: (document.seo_description.length) ? document.seo_description[0].text : '',
				meta_image: (document.meta_image.url) ? document.meta_image.url : '',
				meta_site_name: document.meta_site_name,
				meta_url: process.env.baseUrl+'/city/'+params.uid,
				pending: false,
				defaultFilter: {
					city: params.uid.charAt(0).toUpperCase() + params.uid.slice(1),
					cityId: document.cityid
				}
			}
		} catch (e) {
			console.log('Error', e)
			// Returns error page
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
}
</script>