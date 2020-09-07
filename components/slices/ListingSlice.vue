<template>
  <section class="content-page findahome">
    <b-container fluid>
      <b-row>
       <b-col :cols="slice.primary.map ? '7' : 12"  :class="[isList ?  ((!isMap) ? 'col-sm-12':'' ) : 'map-hide']" ref="map-block">
          <div class="showHideButton">
            <button v-show="(showToggleButton && isDisplayMode)" class="btn sticky-toggle-map-button mb-5" @click="showMapOrList()"> 
                <span v-show="isMap">Show List</span>
                <span v-show="isList">Show Map</span>
            </button>
            <button v-show="showToggleButton"  id="sticky-map-button"  class="btn toggle-map-button mb-5" @click="showMapOrList()"> 
                <span v-show="isMap">Show List</span>
                <span v-show="isList">Show Map</span>
            </button>
            </div>
          <building-card-slice
            :home-lists="homeLists"
            :home-lists-copy="homeLists"
            :default-filter="slice.primary"
            :divider_and_button_color="divider_and_button_color"/>
        </b-col>
        <b-col cols="5" :class="[isMap ? ((!isList) ? 'col-sm-12':'' ) : 'map-hide'] +' map-outer'" v-if="slice.primary.map === true" ref="map-block">
          <div class="showHideButton">
            <button v-show="(showToggleButton && isDisplayMode)" class="btn sticky-toggle-map-button mb-5" @click="showMapOrList()"> 
                <span v-show="isMap">Show List</span>
                <span v-show="isList">Show Map</span>
            </button>
            <button v-show="showToggleButton"  id="sticky-map-button"  class="btn toggle-map-button mb-5" @click="showMapOrList()"> 
                <span v-show="isMap">Show List</span>
                <span v-show="isList">Show Map</span>
            </button>
          </div>
          <div class="google-map" :id="mapName"></div>
        </b-col>
      </b-row>
    </b-container>
    <slices-block :slices="slices"/>
		<div class="slider-cms">
			<div v-if="pending" class="loader"></div>
		</div>
	</section>
</template>

<script>
import SlicesBlock from '~/components/SlicesBlock.vue'
import BuildingCardSlice from '~/components/slices/BuildingCardSlice.vue'
import mapJson from '@/custom_types/GoogleMap.json'

function elementInViewport(el) {
    if(el != null) {
        var top = el.offsetTop;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
        }

        return (
            top >= window.pageYOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight)
        );
    }
}

export default {
	name: 'listing-slice',
	layout: 'homepage',
	props: ['slice'],
	components: {
		SlicesBlock,
    BuildingCardSlice,
	},
	data () {
		return {
			homeLists: [],
			pending: true,
      slices: {},
      params: this.$route.params.uid,
      mapName: "location-multi-map",
      markerCoordinates: [],
      map: null,
      bounds: null,
      markerIcon: '',
      mapStyleJson: mapJson,
      markers: [],
      divider_and_button_color: '',
      showToggleButton: false,
      isMap: false,
      isList: true,
      isDisplayMode: true,
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
        { type: 'application/ld+json', json: this.homeListLd },
        { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`}
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
					hid: 'twittercreator',
					name: 'twitter:creator',
					content: this.twitter_handle
				},
				{
					hid: 'twitterimage',
					name: 'twitter:image',
					content: this.twitter_image
				},
			],
		}
  },
  mounted () {
    this.getData()
  },
  fetchOnServer: false,
  methods: {
    async getData () {
      try{
        // Query to get post content
			//const document = (await $prismic.api.getByUID('page', params.uid)).data
        const appartments = await this.$axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
          //"operatorId": "HaF6mb19L6AzWVavPr5t",
          "neighborhoodId": "",
          "cityId": (this.slice != undefined && this.slice.primary.cityid != undefined) ? this.slice.primary.cityid : ""
        },{
          headers: {
            Authorization: 'Bearer '+process.env.COLIV_HQ_KEY
          }
        })
        let homeList = [];
        let homeListLd = [];
        if(appartments) {
          if(appartments.data.data && appartments.data.data.length > 0) {
            appartments.data.data.forEach(function(appartment, index) {
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
                homeID: appartment.homeId ? appartment.homeId : '',
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
                "url": process.env.baseUrl + '/findahome/',
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": appartment.mapLocation._latitude,
                  "longitude": appartment.mapLocation._longitude
                }
              })
            });
            homeList.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
          }
        }
        this.homeLists = homeList
        if (this.slice.primary.map === true) this.setCoordinates()
        this.homeListLd =  {
          "@context": "http://schema.org/",
            "@graph": homeListLd
          },
        this.pending = false
        const document = (await this.$prismic.api.getByUID('page', 'findyourhome')).data
        this.divider_and_button_color = document.divider_and_button_color
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
          seo_description: document.seo_description.length ?  
            (document.seo_description[0].text != '' &&  document.seo_description[0].text.length > 170) ? 
              document.seo_description[0].text.substring(0, 167) + '...' : document.seo_description[0].text
            : '',
          meta_title: (document.meta_title.length) ? document.meta_title[0].text : '',
          meta_description: document.meta_description.length ?
            (document.meta_description[0].text != '' &&  document.meta_description[0].text.length > 170) ?
                document.meta_description[0].text.substring(0, 167) + '...' : document.meta_description[0].text
            : '',
          meta_image: (document.meta_image.url) ? document.meta_image.url : '',
          meta_url: process.env.baseUrl+'/findahome',
          meta_site_name: (document.meta_site_name.length) ? document.meta_site_name[0].text : '',
          twitter_handle: (document.twitter_handle) ? document.twitter_handle : '',
          twitter_title: (document.twitter_title.length) ? document.twitter_title[0].text : '',
          twitter_description: (document.twitter_description.length) ? document.twitter_description[0].text : '',
          twitter_image: (document.meta_image.url) ? document.meta_image.url : '',
        }
      } catch (e) {
        console.log('Error', e)
        // Returns error page
        error({ statusCode: 404, message: 'Page not found' })
      }
    },
    showMapOrList() {
        this.isMap = !this.isMap
        this.isList = !this.isList
        if(this.isMap) {
            this.toggleMapButton = 'List'
            this.setZoom();
        } else {
            this.toggleMapButton = 'Map'
        }
        this.scrollToMap('map-block')
    },
    setCoordinates() {
      if (this.slice.primary.map && this.homeLists.length) {
        let buildings = JSON.parse(JSON.stringify(this.homeLists))
        for (let item of buildings) {
            let link = ''
            this.markerCoordinates.push({
              latitude: item.mapLocation._latitude,
                longitude: item.mapLocation._longitude,
                name: item.name
            })
        }
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCentre = this.markerCoordinates[0]
        const options = {
          center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
          fullscreenControl: false,
          zoom: 12
        }
        this.map = new google.maps.Map(element, options);
        var styledMapType = new google.maps.StyledMapType(this.mapStyleJson, {name: 'Styled Map'});
        this.map.mapTypes.set('styled_map', styledMapType);
        this.map.setMapTypeId('styled_map');
        var infowindow = new google.maps.InfoWindow();
        this.markerCoordinates.forEach((coord) => {
          if (typeof coord.latitude != 'undefined' && typeof coord.longitude != 'undefined') {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                animation: google.maps.Animation.DROP,
                url: coord.link,
                icon: this.markerIcon
            });
            marker.addListener('mouseover', function() {
              infowindow.setContent(coord.name);
                infowindow.open(this.map, marker);
            });
            marker.addListener('mouseout', function() {
                infowindow.close(this.map, marker);
            });
            marker.addListener('click', function() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                window.location.href = marker.url;
            });
            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
            }
        });
      }
    },
    handleResize() {
      if(this.currentWidth != window.innerWidth) {
        if(window.innerWidth < 768) {
            if(this.isMap == true && this.isList == true) {
                this.isList = false
                this.showMapOrList()
            }
            this.showToggleButton = true;
        } else {
            this.isMap = true;
            this.isList = true;
            this.showToggleButton = false;
        }
        this.setZoom()
        this.currentWidth = window.innerWidth;
      }
    },
    setZoom() {
        if(window.innerWidth < 768) {
            if(this.map != null) {
                this.map.setZoom(12);
            }
        } else {
            if(this.map != null) {
                this.map.setZoom(14);
            }
        }
    },
    handleScroll() {
        const el = document.getElementById('sticky-map-button');
        if(elementInViewport(el)) {
            this.isDisplayMode = false;
        } else {
            this.isDisplayMode = true;
        }
    },
    scrollToMap(refName) {
        var element = this.$refs[refName];
        element.scrollIntoView({ behavior: 'smooth' });
    }
  },
  created () {
      if (process.browser) {
        window.addEventListener('resize', this.handleResize)
        document.addEventListener('scroll', this.handleScroll)
      }
  },
  beforeMount () {
    this.handleResize();
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
.toggle-map-button {
    min-width: 225px;
    color: #fff;
    background-color: #f55e61;
    border-color: #f55e61;
}
.sticky-toggle-map-button {
    min-width: 225px;
    color: #fff;
    background-color: #f55e61;
    border-color: #f55e61;
}
.map-hide {
    display: none;
}
.showHideButton {
  text-align: center;
}
.map-outer {
	position: fixed;
    top: 0;
    left: auto;
    height: 100%;
    width: 100%;
    right: 0;
}

.map-outer .google-map {
  height: 100%;
}
@media (max-width: 767px) {
  .sticky-toggle-map-button {
    min-width: inherit;
    display: block;
    width: 100%;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    border-radius: 0;
    z-index: 2;
  }
  .sticky-toggle-map-button.btn.focus, .sticky-toggle-map-button.btn:focus {
      box-shadow: none;
  }
  .map-outer {
      position: relative;
      height: 250px;
      width: 100%;
      z-index: 9;
      overflow-x: scroll;
  }
}
</style>