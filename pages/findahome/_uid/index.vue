
<template>
  <section class="home-detail">
    <div class="home-detail-slider slider-cms">
		<div v-if="$fetchState.pending" class="loader"></div>
		<client-only>
			<carousel
				v-if="homeDetails.hero_banner && homeDetails.hero_banner.toLowerCase() === 'slider'"
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
				<slide v-for="(images, index) in homeDetails.picturesArray" :key="index" >
					<picture class="slider-img" v-if="images">
						<template v-for="(image, inx) in images.versions">
							<img v-if="(image.versionsName == 'phone' && screenSize <= 750 )" :key="inx" :alt="images.description" :src="image.link" media="(max-width: 750px)">
							<img v-else-if="(image.versionsName == 'tablet'  && (screenSize > 750 && screenSize <= 991))" :key="inx" :alt="images.description" :src="image.link" media="(max-width: 991px)">
							<img :alt="images.description" v-else-if="(image.versionsName == 'desk' && screenSize > 991 )" :key="inx" :src="image.link">
						</template>
					</picture>
				</slide>
			</carousel>
			<div v-if="homeDetails.hero_banner && homeDetails.hero_banner.toLowerCase() != 'slider'">
				<template v-for="(image, inx) in homeDetails.picturesArray[0].versions">
					<img
						v-if="(image.versionsName == 'phone' && screenSize <= 750 )"
						:key="inx"
						:alt="image.description"
						:src="image.link" media="(max-width: 750px)">
					<img
						v-else-if="(image.versionsName == 'tablet'  && (screenSize > 750 && screenSize <= 991))"
						:key="inx"
						:alt="image.description"
						:src="image.link" media="(max-width: 991px)">
					<img
						:alt="image.description"
						v-else-if="(image.versionsName == 'desk' && screenSize > 991 )"
						:key="inx"
						:src="image.link">
				</template>
			</div>
		</client-only>
		<div class="inner-content-wrapper">
			<div class="cms-main-wrap">
				<div class="home-detail-slider-content">
					<div class="nb-main mt-3 row">
						<!-- <i class="fa fa-map icon_ font-weight-bold" aria-haspopup="true" aria-expanded="false"></i> -->
						<div class="col-sm-6"> {{ homeDetails.cityName }}, {{ homeDetails.neighbourhoodName }} </div>
						<div v-if="homeDetails.totalBedrooms != null" class="icons-details col-sm-6">
							<div class="icon-1 icon pull-right">
								<div class="icon-wrap">
									<i class="fa fa-bed icon_ font-weight-bold" aria-haspopup="true" aria-expanded="false"></i>
									<!-- <img src="~/assets/img/bedroom.png" alt="bedroom" class="build-icon"> -->
								</div>
								<div class="desc">
									<p>{{ homeDetails.totalBedrooms }}</p>
									<div><p>bedrooms</p></div>
								</div>
							</div>	
						</div>
					</div>
					<div class="home-detail-title"><h1>{{ homeDetails.name }}</h1></div>
					<div class="home-detail-address">{{ homeDetails.address }}</div>
					<div class="build-desc">
						<p v-html="homeDetails.description"></p>
					</div>
					<!-- <p class="location">Location: {{ fields.geohome-detail.latitude }}, {{ fields.geohome-detail.longitude }}</p> -->
				</div>
			</div>
			<hr>
		</div>
	</div>
	<slices-block :slices="slices"/>
  </section>
</template>

<script>
// Imports for all components
import SlicesBlock from '~/components/SlicesBlock.vue'
export default {	
    name: 'home-details',
    layout: 'homepage',
    components: {
		SlicesBlock
	},
	data () {
		return {
			homeDetails: {},
			homeLists: [],
			screenSize: '',
			slices: null,
			params: '',
			threeD_tour: false,
			hero_banner: 'Slider',
			amenities_background_color: '',
			housemates: false,
			map: false,
			room_image: '',
			rooms_background_color: '',
			similar_homes: false
		}
	},
	async mounted () {
		await this.$fetch()
	},
	created() {
		if(process.browser) {
			window.addEventListener('resize', this.handleResize); 
		}
		this.params = this.$route.params
		this.handleResize();
	},
	methods: {
		handleResize() {
			this.screenSize = (process.browser) ? screen.width : ''
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
			{ rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
		],
		script: [
			{ src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}` },
			{ type: 'application/ld+json', json: this.structuredData },
			{ type: 'application/ld+json', json: this.roomStructureData }
		],
		meta: [
			{ hid: 'author', name: 'author', content: 'ColivHQ' },
			{ hid: 'description', name: 'description', content: this.meta_description },
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
				hid: 'twitterimage',
				name: 'twitter:image',
				content: this.meta_image
			},
		],
		}
	},
	async asyncData ({ $prismic, params, error, $axios }) {
			try{
				// Query to get post content
				// let documentPage = (await this.$prismic.api.getByUID('page', this.params.uid))
				const document = (await $prismic.api.getSingle('homes')).data
				console.log('document: ', document)
				const appartments = await $axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
					"homeId": params.uid,
					"neighborhoodId": "",
					"cityId": ""
				},{
					headers: {
						Authorization: 'Bearer '+ process.env.COLIV_HQ_KEY
					}
				})
				var homeData = appartments.data.data[0]
				var meta_image='';
				if(homeData.picturesArray != undefined && homeData.picturesArray.length > 0) {
					homeData.picturesArray[0].versions.forEach(function(image) { 
						if(image.versionsName == 'desk') {
							meta_image = image.link;
						}
					});				
				}
				let amenitiesFeatures = []
				homeData.amenitiesArray =  homeData.amenitiesArray.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
				homeData.amenitiesArray.forEach(function(feature) { 
					amenitiesFeatures.push( {
						"@type": "http://schema.org/LocationFeatureSpecification",
						"name": feature.name,
						"value":"true"
					})
				});
				let roomsLd = []
				homeData.roomsArray.forEach(function(room) {
					roomsLd.push( {
						"@type": "Room",
						"accommodationCategory":"Room",
						"description": room.description,
						"name": room.roomName,
						"image": (room.roomPicturesArray.length > 0) ? room.roomPicturesArray[0].link : ''
					})
				});

				homeData['threeD_tour'] = document['3d_tours'],
				homeData['hero_banner'] = document.hero_banner,
				homeData['amenities_background_color'] = document.amenities_background_color,
				homeData['side_form_background_color'] = document.amenities_background_color,
				homeData['housemates'] = document.housemates,
				homeData['map'] = document.map,
				homeData['room_image'] = document.room_image,
				homeData['rooms_background_color'] = document.rooms_background_color,
				homeData['similar_homes'] = document.similar_homes
				return {
					slices: document.body,
					homeDetails: homeData,

					//SEO
					meta_title: homeData.name,
					meta_description: (homeData.description && homeData.description != null) ?
						homeData.description.length > 170 ?
							homeData.description.substring(0, 167) + '...' :
							homeData.description : '',
					meta_image: meta_image,
					meta_site_name: process.env.COMPANY_NAME,
					meta_url: process.env.baseUrl+'/findahome/'+ params.uid,
					structuredData: {
						"@context": "http://schema.org/",
						"@type": "Apartment",
						"accommodationCategory": "Apartment",
						"address": homeData.address + ' ' + homeData.postalCode + ' '+ homeData.cityName,
						"description": homeData.description,
						"image": meta_image,
						"name": homeData.name,
						"numberOfRooms": homeData.totalBedrooms,
						"url": process.env.baseUrl + '/findahome/' + params.uid,
						"geo": {
							"@type": "GeoCoordinates",
							"latitude": homeData.mapLocation._latitude,
							"longitude": homeData.mapLocation._longitude
						},
						"amenityFeature": amenitiesFeatures,
					},
					roomStructureData: {
						"@context": "http://schema.org/",
						"@graph": roomsLd
					},
					banner: {
						hero_image: document.hero_image,
						title: document.page_title,
						tagline: document.page_description
					}
				}
			} catch (e) {
				// Returns error page
				console.log('Error', e)
				error({ statusCode: 404, message: 'Page not found' })
			}
	},
	async fetch () {
		const similarAppartments = await this.$axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
			"neighborhoodId": this.homeDetails.neighborhoodId,
			"cityId": this.homeDetails.cityId,
			"operatorId": this.homeDetails.operatorId
		},{
			headers: {
				Authorization: 'Bearer '+process.env.COLIV_HQ_KEY
			}
		})
		var _this = this;
		_this.homeDetails.picturesArray.filter(function(item, index) {
			var list = [];
			Object.keys(item).map(function(key) {
				if(key.includes("versions")) {
					_this.homeDetails.picturesArray[index].versions = item[key].sort((a, b) => (a.versionsName < b.versionsName) ? 1 : -1)
				}
			});
		});

		// Similar homes
		if (this.homeDetails.similar_homes) {
			let homeList = [];
			let curHomeId = this.$route.params.uid
				similarAppartments.data.data.forEach(function(appartment, index) {
					if(appartment.homeId != undefined && appartment.homeId != curHomeId) {
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
							description: (appartment.description != null && appartment.description.length > 100) ? appartment.description.substring(0, 100) + '...' : appartment.description,
							startingPrice: startingPrice,
							priceCurrency: priceCurrency,
							availability: appartment.availability,
							roomType: roomType,
							totalBedrooms: appartment.totalBedrooms
						})
					}
				});
			this.homeLists = homeList;
		}

		if(this.homeLists != undefined && this.homeLists.length > 0) {
			this.slices = [{
				slice_type: 'building_cards',
				slice_devider: true,
				items: this.homeLists,
				primary: {
					title: [
						{
							spans: [],
							text:"Similar homes",
							type:"heading2",
						}
					],
					slice_section: 'similar_cards'
				}
			}, ...this.slices]
		}
		
		// Spacer slice
		this.slices = [{
			slice_type: 'spacer',
			slice_label: null,
			items: [],
			primary: {
				pixels:50
			}
		}, ...this.slices]

		// Map slice
		if (_this.homeDetails.map) {
			this.slices = [{
				primary:{
					home: {
						latitude: this.homeDetails.mapLocation._latitude,
						longitude: this.homeDetails.mapLocation._longitude
					},
					marker: {
						url: "/mapMarker.png"
					},
					map_title: [
						{
							spans: [],
							text:"Location",
							type:"heading2"
						}
					]
				},
				slice_type: 'map',
				slice_devider: true,
				slice_label: null,
				items: [],
			}, ...this.slices]
		}
		
		// Spacer slice
		this.slices = [{
			slice_type: 'spacer',
			slice_label: null,
			items: [],
			primary: {
				pixels:50
			}
		}, ...this.slices]

		// Embed slice
		if (this.homeDetails.threeD_tour) {
			this.slices = [{
				slice_type: 'embed_section',
				slice_devider: true,
				slice_label: null,
				items: [],
				primary: {
					embed: {
						embed_url: this.homeDetails['3DtourLink'],
						height: 480,
						html: '<iframe width="640" height="480" frameborder="0" allowfullscreen src="https://my.matterport.com/show/?brand=0&amp;m=' + this.homeDetails['3DtourLink'].split('?m=').pop() + '" ></iframe>',
						width: 640
					},
					embed_html: []
				}
			}, ...this.slices]
		}

		// Spacer slice
		this.slices = [{
			slice_type: 'spacer',
			slice_label: null,
			items: [],
			primary: {
				pixels:50
			}
		}, ...this.slices]

		// Room mates slice
		if(this.homeDetails.housemates && this.homeDetails.housematesArray != undefined &&  this.homeDetails.housematesArray.length > 0) {
			this.slices = [{
				isBuildingPage:"Yes",
				slice_type: 'image_gallery',
				slice_label: 'avatars',
				slice_devider: true,
				items: this.homeDetails.housematesArray,
				primary: {
					gallery_title: [
						{
							spans: [],
							text:"Housemates",
							type:"heading2"
						}
					]
				}
			}, ...this.slices]
		}

		// Spacer slice
		this.slices = [{
			slice_type: 'spacer',
			slice_label: null,
			items: [],
			primary: {
				pixels:50
			}
		}, ...this.slices]

		// Amenities slice
		if(this.homeDetails.amenitiesArray != undefined && this.homeDetails.amenitiesArray.length > 0) {
			this.slices = [{
				slice_type: 'image_gallery',
				slice_label: 'icons',
				slice_devider: true,
				background: this.homeDetails.amenities_background_color,
				items: this.homeDetails.amenitiesArray,
				primary: {
					gallery_title: [
						{
							spans: [],
							text:"Amenities",
							type:"heading2"
						}
					]
				}
			}, ...this.slices]
		}
	
		// Spacer slice
		this.slices = [{
			slice_type: 'spacer',
			slice_label: null,
			items: [],
			primary: {
				pixels:50
			}
		}, ...this.slices]

		// Rooms slice
		if(this.homeDetails.roomsArray != undefined && this.homeDetails.roomsArray.length > 0) {
			this.slices = [{
				primary:{
					title: [{
						spans: [],
						text:"Select Your Room",
						type:"heading2"
					}]
				},
				slice_type: 'rooms',
				slice_devider: true,
				room_image: this.homeDetails.room_image,
				background: this.homeDetails.rooms_background_color,
				slice_label: null,
				items: this.homeDetails.roomsArray,
			}, ...this.slices]
		}
		
		// Spacer slice
				this.slices = [{
					slice_type: 'spacer',
					slice_label: null,
					items: [],
					primary: {
						pixels:50
					}
				}, ...this.slices]

				
		// Home details slice
		this.slices = [{
			slice_type: 'form',
			slice_label: 'homedetails',
			homeID: this.$route.params.uid,
			OperatorID: this.homeDetails.operatorId,
			neighborhoodId: this.homeDetails.neighborhoodId,
			buildingId: this.homeDetails.buildingId,
			homeName: this.homeDetails.name,
			cityName: this.homeDetails.cityName,
			cityID: this.homeDetails.cityId,
			sideFormBackgroundColor: this.homeDetails.side_form_background_color
		}, ...this.slices]
	},
	fetchOnServer: false
}
</script>
<style>
h3 {
	font-size: 32px;
}
.nb-main img {
	width: 60px;
    vertical-align: middle;
} 
.nb-main .nb-label {
	display: inline-block;
    vertical-align: middle;
	font-size: 25px;
    color: #000;
}

.icon_ {
	font-size: 25px;
}

/* Slider Bottom */
.home-detail .home-detail-slider .home-detail-title h1 {
	font-weight: bold;
    font-size: 38px;
}
.home-detail .home-detail-slider .home-detail-slider-content {
	z-index: 99;
	position: relative;
	margin-bottom: 50px;
}
.icons-details .icon-wrap svg{
	color: rgb(114, 191, 68);
}
.home-detail .home-detail-slider .home-detail-slider-content .home-detail-topics {
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 20px;
    min-height: 70px;
}
.home-detail .home-detail-slider .home-detail-slider-content .home-detail-topics .topic {
    background-color: #feefef;
    border: 1px solid #ef5357;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    min-width: 80px;
    margin-top: 5px;
    text-align: center;
}
.home-detail .home-detail-slider .home-detail-title > :first-child {
	margin-bottom: 0px;
	color: #222;
}
.home-detail .home-detail-slider .icons-details p {
	margin-bottom: 0;
	margin-right: 5px;
}
.home-detail .home-detail-slider .icons-details .icon {
	background: #f5f5f5;
    border-radius: 5px;
    padding: 5px 5px 0px 10px;
}
.home-detail .home-detail-slider .icons-details .icon ,
.home-detail .home-detail-slider .icons-details .desc {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
}
.home-detail .home-detail-slider .icons-details .icon-3 .desc {
	display: block;
}
.home-detail .home-detail-slider .icons-details .desc {
	margin-left: 10px;
}
.home-detail .home-detail-slider .icons-details  {
	/* margin-top: 25px; */
}
.home-detail .home-detail-slider .build-desc p {
	margin-bottom: 0;
    margin-top: 30px;
}
.home-detail .home-detail-slider .icons-details .icon:nth-child(n+5) {
	margin-top: 15px;
}
.home-detail .home-detail-slider .slider-item .slider-img {
    overflow: hidden;
    width: 100%;
    display: block;
}
.home-detail .home-detail-slider-content .build-desc a {
	font-size: 16px;
}
/* Slider section */
.home-detail .home-detail-slider .VueCarousel-navigation-button {
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
.home-detail .home-detail-slider .VueCarousel-navigation-button .angle-left {
	position: relative;
}
.home-detail .home-detail-slider .VueCarousel-navigation-button .cust-icon:before,
.home-detail .home-detail-slider .VueCarousel-navigation-button .cust-icon:after {
	content: '';
    position: absolute;
    height: 13px;
    width: 75px;
    background-color: #72bf44;
}
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-prev .cust-icon.angle-left:before {
    transform: rotate(-60deg);
	-webkit-transform: rotate(-60deg);
    -moz-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
    -ms-transform: rotate(-60deg);
    transform: rotate(-60deg);
}
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-prev .cust-icon.angle-left:after {
    transform: rotate(60deg);
	-webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);
    top: 59px;
}
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-next .cust-icon.angle-right:before {
	right: 10px;
	left: auto;
	transform: rotate(60deg);
	-webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -o-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    transform: rotate(60deg);

}
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-next .cust-icon.angle-right:after {
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
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-prev {
    left: 15px;
    right: auto;
}
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-next {
    right: 15px;
    left: auto;
}
.home-detail .home-detail-slider .VueCarousel-navigation-button .fa {
   color: rgba(255,255,255,1);

}
.home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-prev, .home-detail .home-detail-slider .VueCarousel-navigation-button.VueCarousel-navigation-next {
	padding: 0px 18px!important;
}
.VueCarousel-pagination {
	position: relative;
    top: -120px;
}
/* 05/06/2020 - DAB */
.home-detail .room-wrapper .room-detail .feature ul li {
	width: 100%;
}
@media(min-width: 992px){
	.home-detail .inner-content-wrapper {
		padding-right: 150px;
	}
	.home-detail .find-home-outer .inner-content-wrapper {
    	padding-right: 0;
	}
}
@media(max-width: 1399px){
	.home-detail .inner-content-wrapper {
		padding-right: 230px;
	}
}
@media(max-width: 1199px){
	.home-detail .inner-content-wrapper {
		padding-right: 260px;
	}
	.home-detail .find-home-outer .inner-content-wrapper {
    	padding-right: 0;
	}
}
/* Slider section */
@media(max-width:1024px){
	.home-detail .inner-content-wrapper {
		margin: 0 auto;
	}
}
@media(max-width:991px){
	.home-detail .embedslice-cms {
		text-align: center;
	}
	.home-detail .find-home-outer .form {
		margin: 0 15px;
	}
	.home-detail .inner-content-wrapper {
		padding-right: 300px;
	}
	.home-detail .image-gallery.content-section .gallery-item {
		-ms-flex: 0 0 50%;
	    flex: 0 0 50%;
	    max-width: 50%;
	}
	.home-detail .room-wrapper {
		max-width: 480px;
	}
}
@media(max-width:767px) {
	 .VueCarousel-navigation-button.VueCarousel-navigation-next, .VueCarousel-navigation-button.VueCarousel-navigation-prev {
	    display: none;
	}
  	.home-detail .inner-content-wrapper {
		padding-right: 0;
	}
	.home-detail .image-gallery.content-section .gallery-item {
		-ms-flex: 0 0 33.33%;
	    flex: 0 0 33.33%;
	    max-width: 33.33%;
	}
	.home-detail .find-home-outer .form {
		width: 100%;
		margin: 0;
	}
	.home-detail .room-wrapper {
    	margin: 0 auto;
	}
}
@media(max-width:640px){
	.home-detail .embedslice-cms iframe {
		width: 500px;
	}
}
@media(max-width:575px) {
	.home-detail .image-gallery.content-section .gallery-item {
		-ms-flex: 0 0 50%;
	    flex: 0 0 50%;
	    max-width: 50%;
	}
	.home-detail .embedslice-cms iframe {
		width: 290px;
	}
}
@media(max-width:480px) {
	.home-detail .image-gallery.content-section .gallery-item {
		-ms-flex: 0 0 100%;
	    flex: 0 0 100%;
	    max-width: 100%;
	}
}
</style>
