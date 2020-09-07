<template>
    <div class="inner-content-wrapper" >
        <div class="cms-main-wrap building-cms">
            <div v-if="!hideFilter" class="building-filter row form-cms-build">
                <div class="col-sm-12 col-lg-2 input-serach-main">
                    <div class="filter-item">

                        <div class="item-wrap">
                            <b-button variant="outline-primary" @click="openFilterbox('city')">
                                <b-icon-geo-alt :style="{'color': divider_and_button_color}"></b-icon-geo-alt> {{ resFilter.city}},<br/>
                                 {{ resFilter.area.join(', ') }}
                            </b-button>
                        </div>
                        <div v-show="filterBox.city" class="box row" :style="background">
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text
                                            :style="{'background-color': divider_and_button_color,
                                                'border-color': divider_and_button_color}" >
                                            CITY
                                        </b-input-group-text>
                                    </template>
                                    <b-form-input list="city-list-id" autocomplete="off" 
                                    class="form-inputs"
                                    required
                                    v-model="searchFilter.city"
                                    :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color}"
                                    @change="cityChange()"></b-form-input>

                                        <datalist id="city-list-id">
                                            <option v-for="(city, index) in cities" :key="index">{{ city }}</option>
                                        </datalist>
                                </b-input-group>
                            </b-form-group>
                                <!-- <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group prepend="AREA" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <b-form-input list="area-list-id" autocomplete="off" 
                                        class="form-inputs"
                                        placeholder="Required Field"
                                        required
                                        v-model="searchFilter.area"></b-form-input>
                                            <datalist id="area-list-id">
                                                <option v-for="(area, index) in areas" :key="index">{{ area }}</option>
                                            </datalist>
                                    </b-input-group>
                                </b-form-group> -->
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 neighbourhood-check">
                                <b-input-group class="neighbour mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text
                                            :style="{'background-color': divider_and_button_color,
                                                'border-color': divider_and_button_color}" >
                                            AREA
                                        </b-input-group-text>
                                    </template>
                                    <b-form-checkbox-group
                                        id="neighbour"
                                        class="ml-3 form-inputs"
                                        v-model="searchFilter.area"
                                        :options="areas"
                                        :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color}"
                                        name="flavour-1"
                                    ></b-form-checkbox-group>
                                </b-input-group>
                            </b-form-group>
                            <div class="col-sm-12 text-center submit-btn">
                                <b-button
                                    variant="primary"
                                    id="city-filter"
                                    @click="searchResult('city', $event)"
                                    :style="{'background-color': divider_and_button_color}">UPDATE</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-2 input-serach-main">
                    <div class="filter-item">
                        <div class="item-wrap">
                            <b-button variant="outline-primary" @click="openFilterbox('sos')">
                                <b-icon-calendar :style="{'color': divider_and_button_color}"></b-icon-calendar> 
                                <span>{{ resFilter.sos }}</span>
                            </b-button>
                        </div>
                        <div v-show="filterBox.sos" class="box row" :style="background">
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0 big-label">
                                    <template v-slot:prepend>
                                        <b-input-group-text
                                            :style="{'background-color': divider_and_button_color,
                                                'border-color': divider_and_button_color}" >
                                            START OF STAY
                                        </b-input-group-text>
                                    </template>
                                    <b-form-select
                                        id="los"
                                        v-model="searchFilter.sos"
                                        :options="sosOptions"
                                        class="form-inputs"
                                        :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color}"
                                        required></b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <div class="col-sm-12 text-center submit-btn">
                                <b-button
                                    variant="primary"
                                    @click="searchResult('sos', $event)"
                                    :style="{'background-color': divider_and_button_color}">UPDATE</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-2 input-serach-main">
                    <div class="filter-item">
                        <div class="item-wrap">
                            <b-button variant="outline-primary" @click="openFilterbox('price')">
                                <b-icon-credit-card :style="{'color': divider_and_button_color}"></b-icon-credit-card> {{ (resFilter.price !=null) ? '$'+resFilter.price+'/month' : ' Any Price' }}
                            </b-button>
                        </div>
                        <div v-show="filterBox.price" class="box row" :style="background">
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text
                                            :style="{'background-color': divider_and_button_color,
                                                'border-color': divider_and_button_color}" >
                                            BUDGET
                                        </b-input-group-text>
                                    </template>
                                    <!-- <b-form-select id="budget" v-model="form.budget" :options="budgetOptions" class="form-inputs"></b-form-select> -->
                                    <b-form-spinbutton
                                        class="form-inputs"
                                        id="sb-days"
                                        v-model="searchFilter.price"
                                        :formatter-fn="curFormatter"
                                        :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color}"
                                        min="0"
                                        max="5000"
                                        step="100"
                                        required
                                        ></b-form-spinbutton>
                                </b-input-group>
                            </b-form-group>
                            <div class="col-sm-12 text-center submit-btn">
                                <b-button
                                    variant="primary"
                                    @click="searchResult('price', $event)"
                                    :style="{'background-color': divider_and_button_color}">UPDATE</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-2 input-serach-main">
                    <div class="filter-item">
                        <div class="item-wrap">
                            <b-button variant="outline-primary" @click="openFilterbox('roomType')">
                                <b-icon-check :style="{'color': divider_and_button_color}"></b-icon-check> {{ resFilter.roomType }}
                            </b-button>
                        </div>
                        <div v-show="filterBox.roomType" class="box row" :style="background">
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0 big-label">
                                    <template v-slot:prepend>
                                        <b-input-group-text
                                            :style="{'background-color': divider_and_button_color,
                                                'border-color': divider_and_button_color}" >
                                            ROOM TYPE
                                        </b-input-group-text>
                                    </template>
                                    <b-form-select
                                        id="room_type"
                                        v-model="searchFilter.roomType"
                                        :options="roomTypeOptions"
                                        class="form-inputs"
                                        :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color}"
                                        required></b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <div class="col-sm-12 text-center submit-btn">
                                <b-button
                                    variant="primary"
                                    @click="searchResult('roomType', $event)"
                                    :style="{'background-color': divider_and_button_color}">UPDATE</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-lg-2 input-serach-main">
                    <div class="filter-item  sort-filter">
                        <div class="item-wrap">
                            <b-button variant="outline-primary" @click="openFilterbox('sortBy')" :style="background">
                                <b-icon-filter-left :style="{'color': divider_and_button_color}"></b-icon-filter-left> 
                                <div>Sort by </div>
                                <div class="sort-label" :style="{color: '#fffffff'}">{{ resFilter.sortBy }}</div>
                            </b-button>
                        </div>
                        <div v-show="filterBox.sortBy" class="box row" :style="background">
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                <b-input-group
                                    class="input-group mb-2 mr-sm-2 mb-sm-0 big-label">
                                    <template v-slot:prepend>
                                        <b-input-group-text
                                            :style="{'background-color': divider_and_button_color,
                                                'border-color': divider_and_button_color}" >
                                            SORT BY
                                        </b-input-group-text>
                                    </template>
                                    <b-form-select
                                        id="room_type"
                                        v-model="searchFilter.sortBy"
                                        :options="sortByOptions"
                                        class="form-inputs"
                                        :style="{'border-color': divider_and_button_color, 'color': divider_and_button_color}"></b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <div class="col-sm-12 text-center submit-btn">
                                <b-button variant="primary" @click="sortResult('sortBy', $event)" :style="{'background-color': divider_and_button_color}">UPDATE</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="slice != undefined" class="section-main-title">
                <prismic-rich-text :field="slice.primary.title" class="cms-title"/>
            </div>
            <div class="building-card row">
                <div v-for="item in newHomeLists" :key="item.homeID" class="card-main col-lg-4 col-sm-6 col-xs-12">
                    <div class="content-wrap">
                        <n-link :to="'/findahome/'+item.homeID" class="card-link">

                            <img v-if="item.banner.url == ''" src="~/assets/img/noImageAvailable.png" :alt="item.banner.altText" >
                            <img v-else :data-src="item.banner.url" class="lazyload"  :alt="item.banner.altText" >
                            <div class="desc-box">
                                <div class="desc">
                                    {{ item.cityName }}, {{ (item.neighborhoodName != undefined) ? item.neighborhoodName : ''  }}
                                </div>
                                <div class="name"> {{ item.name }} </div>
                                <!-- <div class="title"> {{ item.neighborhoodName }} </div> 
                                <div class="address">
                                    <p>{{ item.address }}</p>
                                </div> -->
                                <div class="desc detail-desc">
                                    <!-- <p>{{ item.description | strippedContent }}</p> -->
                                    <p><span v-html="item.description"></span></p>
                                </div>
                                <div class="building-bottom-content">
                                    <div class="price">
                                        <p>Starting from {{ item.priceCurrency }}{{ Number(item.startingPrice).toLocaleString() }}/mo</p>
                                    </div>
                                    <div v-if="item.availability != null" class="room-available-today">
                                        <p v-if=" item.availability != 'Fully booked'">{{ item.availability }}</p>
                                    </div>
                                    <div v-else class="room-available-today">
                                        <p>Not available</p>
                                    </div>
                                </div>
                            </div>
                        </n-link>
                    </div>
                </div> 
            </div> 
        </div>
    </div> 
</template>

<script>
import lazysizes from 'lazysizes';
import Multiselect from 'vue-multiselect'
import axios from 'axios';
export default {
    name: 'building-cards',
    components: {
        Multiselect
    },
    props: ['slice', 'homeLists', 'homeListsCopy', 'hideFilter', 'defaultFilter', 'divider_and_button_color'],
    data () {
        return {
            value: [],
            options: [
                { name: 'Vue.js', language: 'JavaScript' },
                { name: 'Adonis', language: 'JavaScript' },
                { name: 'Rails', language: 'Ruby' },
                { name: 'Sinatra', language: 'Ruby' },
                { name: 'Laravel', language: 'PHP' },
                { name: 'Phoenix', language: 'Elixir' }
            ],
            //newHomeLists: [],
            newHomeLists: this.homeLists,
            cities: [],
            areas: ['Any Area'],
            cityArea: {},
            resFilter: {
                city: 'Any City',
                area: ['Any Area'],
                sos: 'Any',
                price: null,
                roomType: 'Any Type',
                sortBy: 'Price'
            },
            searchFilter: {
                city: '',
                area: ['Any Area'],
                sos: 'Any',
                price: null,
                roomType: 'Any Type',
                sortBy: 'Price'
            },
            sosOptions: [
                { text: 'Please select', value: null}, 
                { text: 'Any', value: 'Any'},
                { text: 'Immediatly', value: 'Immediatly'},
                { text: 'Within a month', value: 'Within a month'},
                { text: 'In 2-3 months', value: 'In 2-3 months'},
                { text: 'More than 3 months from now', value: 'More than 3 months from now'}
            ],
            roomTypeOptions: [
                { text: 'Any Type', value: 'Any Type'}, 
                { text: 'Whole apartment', value: 'Whole apartment'},
                { text: 'Master (private bathroom)', value: 'Master (private bathroom)'},
                { text: 'Common (shared bathroom)', value: 'Common (shared bathroom)'},
                { text: 'Bed (shared bedroom)', value: 'Bed (shared bedroom)'}
            ],
            sortByOptions: [
                { text: 'Availability', value: 'Availability'},
                { text: 'Price', value: 'Price'}
            ],
            filterBox: {
                city: false,
                sos: false,
                price: false,
                roomType: false,
                sortBy: false
            }
        }
    },
    computed: {
        background () {
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.divider_and_button_color)) { 
                  
                // Getting the content after '#',
                let ret = this.divider_and_button_color.slice(1); 
                // Splitting each character 
                ret = ret.split(''); 
                  
                // Checking if the length is 3 
                // then make that 6 
                if(ret.length == 3) { 
                    var ar = []; 
                    ar.push(ret[0]);  
                    ar.push(ret[0]); 
                    ar.push(ret[1]); 
                    ar.push(ret[1]); 
                    ar.push(ret[2]); 
                    ar.push(ret[2]); 
                    ret = ar; 
                } 
                  
                // Starts with '0x'(in hexadecimal) 
                ret = '0x'+ ret.join(''); 
                  
                // Converting the first 2 characters 
                // from hexadecimal to r value 
                var r = (ret>>16)&255; 
                  
                // Converting the second 2 characters 
                // to hexadecimal to g value 
                var g = (ret>>8)&255; 
                  
                // Converting the last 2 characters 
                // to hexadecimal to b value 
                var b = ret&255; 
                  
                // Appending all of them to make 
                // the RGBA value 
                
                let color = 'rgba('+[r, g, b].join(',')+',' + 0.5 + ')';
                return {
                  'background-color': color,
                  'border-color': this.divider_and_button_color,
                  'color': '#ffffff'
                }
            } else {
                return {}
            }
        }
    },
    filters: {
        strippedContent: function(string) {
            if(string != null) {
                return string.replace(/<\/?[^>]+>/ig, " ");                
            }
            return string;
        }
    },
    methods: {
        cityChange() {
            if(!this.cities.includes(this.searchFilter.city)) {
                this.searchFilter.city = ''
                this.searchFilter.area = ['Any Area']
            } else {
                this.areas = this.cityArea[this.searchFilter.city] || ['Any Area']
            }
        },
        curFormatter(value) {
            return '$' + value + '/month'
        },
        openFilterbox(boxType) {            
            for (var key in this.filterBox) {
                if (this.filterBox.hasOwnProperty(key)) {
                     if(key == boxType) {
                        this.filterBox[key] = !this.filterBox[key]
                    } else {
                        this.filterBox[key] = false
                    }
                }
            }
        },
        sortResult(boxType, event) {
            event.preventDefault()
            this.openFilterbox(boxType)
            this.resFilter[boxType] = this.searchFilter[boxType]
            if(this.resFilter['sortBy'] == 'Availability') {
                this.newHomeLists.sort((a, b) => (a.availability > b.availability) ? 1 : -1)
            } else {
                this.newHomeLists.sort((a, b) => (a.startingPrice > b.startingPrice) ? 1 : -1)
            }
        },
        searchResult(boxType, event) {
            event.preventDefault()
            this.openFilterbox(boxType)
            if(boxType == 'city') {
                this.resFilter[boxType] = this.searchFilter[boxType]
                this.resFilter['area'] = this.searchFilter['area']
            } else {
                this.resFilter[boxType] = this.searchFilter[boxType]
            }
            this.newHomeLists = this.homeListsCopy;

            // City filter
            if(this.resFilter['city'] != '' && this.resFilter['city'] != 'Any City') {
                this.newHomeLists = this.newHomeLists.filter((home) => {  
                    if(home.cityName.toLowerCase() == this.resFilter['city'].toLowerCase()) {
                        return home;
                    }
                });
            } else {
                this.resFilter['city'] = 'Any City'
            }

            // Area filter
            if(this.resFilter['area'].length > 0 && (!this.resFilter['area'].includes('Any Area'))) {
                this.newHomeLists = this.newHomeLists.filter((home) => {  
                    if(this.resFilter['area'].includes(home.neighborhoodName)) {
                        return home;
                    }
                });
            } else {
                this.resFilter['area'] = ['Any Area']
            }

            // Start of stay filter
            if(this.resFilter['sos'] != '' && this.resFilter['sos'] != 'Any') {
                if(this.resFilter['sos'] == 'Immediatly') {
                    this.newHomeLists = this.newHomeLists.filter((home) => {
                        if(home.availability == 'Available' || home.availability =='At least a room available') {
                            return home;
                        }
                    });
                } else if(this.resFilter['sos'] == 'Within a month') {
                    this.newHomeLists = this.newHomeLists.filter((home) => {
                        if(home.availability == 'Available' || home.availability =='At least a room available' || home.availability == 'Available soon') {
                            return home;
                        }
                    });
                } else if(this.resFilter['sos'] == 'In 2-3 months' || this.resFilter['sos'] == 'More than 3 months from now') { 
                    this.newHomeLists = this.newHomeLists.filter((home) => {
                        return home;
                    });
                }
            }

            // Price filter
            if(this.resFilter['price'] != null && this.resFilter['price'] != 0 && this.resFilter['price'] != 'Any Price') {
                this.newHomeLists = this.newHomeLists.filter((home) => {  
                    if(home.startingPrice <= this.resFilter['price']) {
                        return home;
                    }
                });
            } else {
                this.resFilter['price'] = null
            } 
            
            // Room type filter
            if(this.resFilter['roomType'] != '' && this.resFilter['roomType'] != 'Any Type') {
                this.newHomeLists = this.newHomeLists.filter((home) => {  
                    if(home.roomType.includes(this.resFilter['roomType'])) {
                        return home;
                    }
                });
            } else {
                this.resFilter['roomType'] = 'Any Type'
            } 
        },
        setArea(selCity) {
            console.log('selCity', selCity)
            this.area = this.cityArea[selCity]    
        },
        getCties() {
            axios.get(process.env.proxyUrl+'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+this.searchFilter.city+'&types=(cities)&key='+process.env.mapKey).then((response) => {
                this.cities = [];
                this.cityLatLong = [];
                for (let value of Object.values(response.data.predictions)) {
                    this.cities.push(value.terms[0].value)
                }
            });
        }
    },
    watch:{
        homeLists(){
            this.newHomeLists = this.homeLists
        }
    },
    mounted() {
        if(this.defaultFilter != undefined) {
            $('#city-filter').trigger('click'); 
        }
    },
    beforeMount() {
        if(this.defaultFilter != undefined) {
            this.searchFilter.city = this.defaultFilter.city
            this.openFilterbox('city')
        }
        axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes',{},{
			headers: {
				Authorization: 'Bearer '+process.env.COLIV_HQ_KEY
			}
		}).then((response) => {
            this.cities.push('Any City')
            response.data.data.forEach( (cittarr) => { 
                this.cities.push(cittarr.city)
                this.cityArea[cittarr.city] = ['Any Area', ...cittarr.hood.map(a => a.name)];
                if(this.defaultFilter != undefined) {
                    this.areas = this.cityArea[this.defaultFilter.city]
                    this.cities = [this.defaultFilter.city]
                }
            });
        });
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import "@/assets/css/filterform.css";
.form-cms-build >>> .custom-control-label {
    color: #8BC34A !important;
}
.form-cms-build >>> .custom-checkbox .custom-control-label::before {
    background-color: #8BC34A;
    border: none;
    box-shadow: none;
}
.custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #8BC34A;
    background-color: #8BC34A;
}
.filter-item #neighbour {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #77BF45;
    margin-left: 0!important;
    background-color: #fff;
    padding: 10px;
    text-align: left;
}
.section-main-title .cms-title >>> :first-child {
    color: #222222;
    margin-bottom: 40px;
    text-align: left;
}
.building-cms {
    text-align: center;
    position: relative;
}
.building-cms .building-card .name   {
    font-size: 18px;
    color: #000;
    font-weight: 600;
    text-transform: capitalize;
    text-decoration: none;
    margin: 5px 0;
    display: block;
    min-height: 56px;
}
.building-cms  .left-content {
    position: relative;
    background-color: #fff;
    z-index: 9;
}
.building-cms .building-card .title >>> :first-child ,
.building-cms .building-card .desc >>> :first-child ,
.building-cms .building-card .price >>> :first-child ,
.building-cms .building-card .address >>> :first-child {
    color: #000;
    margin-bottom: 0;
    line-height: normal;
}
.building-cms .building-card .price >>> :first-child,
.building-cms .building-card .title >>> :first-child {
    margin-top: 6px;
}
.building-cms .building-card .desc >>> :first-child {
    margin-top: 20px;
}
.building-cms .building-card .room-available-today >>> :first-child {
    background-color: #feefef;
    border: 1px solid #ef5357;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
}
.building-card .card-main {
    position: relative;
    margin-bottom: 65px;
}
.building-card .card-main .building-bottom-content .room-available-today {
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 30px;
}
.building-bottom-content .price >>> p { 
    font-weight: bold;
}
.building-card .card-main .building-bottom-content .price {
    left: 0;
    right: 0;
    bottom: 30px;
}
.building-cms .building-card .content-wrap {
    margin-bottom: 50px!important;
}
.building-cms .building-card .content-wrap .desc {
    min-height: 51px;
}
.building-cms .building-card .content-wrap .desc-box {
    transition: 0.3s;
    padding: 20px 30px;
    border-top: none;
    margin-top: -10px;
}
.building-card .card-main .card-link {
    display: block;
    -webkit-box-shadow: 0px 0px 7px 1px rgba(0,0,0,.2);
    -moz-box-shadow: 0px 0px 7px 1px rgba(0,0,0,.2);
    box-shadow: 0px 0px 7px 1px rgba(0,0,0,.2);
}
@media (max-width: 767px) {
    .building-cms .building-card .col-lg-6.col-md-12 {
        flex: 0 0 50%;
        max-width: 50%;
    } 
    .building-card  {
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
    }
    .build-page .building-card {
        padding-top: 0;
    }
}
@media (max-width: 575px) {
    .building-cms .building-card .col-lg-6.col-md-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }   
    .section-main-title .cms-title >>> :first-child {
        font-size: 24px;
    }
}
/****** building-filter *****/
.building-filter {
    margin-bottom: 20px;
}
.building-filter .box.row {
    width: 300px;
    padding: 20px 0px;
    background-color: rgb(231, 239, 226);
    border-radius: 0;
    margin: 10px 5px;
    position: absolute;
    top: 100%;
    left: 0px;
    z-index: 9;
    border: 1px solid #77bf45;
}
.filter-item .btn-outline-primary {
    border: none;
    color: #777777;
    font-size: 15px;
    width: 100%;
    position: relative;
    text-align: left;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
     -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    word-break: break-word;
    padding: 0;
}
.filter-item .btn-outline-primary svg {
    color: #77BF45;
    margin-right: 5px;
}
.filter-item .btn-outline-primary.focus, .btn-outline-primary:focus {
    box-shadow: none;
}
.filter-item .btn-outline-primary:not(:disabled):not(.disabled).active, 
.filter-item .btn-outline-primary:not(:disabled):not(.disabled):active, 
.filter-item .show>.btn-outline-primary.dropdown-toggle,
.filter-item .btn-outline-primary:hover {
    background: none;
    border-color: #77BF45;
    box-shadow: none;
    color: #777777;
}
/****** building-filter *****/
/* 22/05/20 - DAB */
.building-cms .form-cms-build .input-serach-main {
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    max-width: 20%;
}
.form-cms-build .input-serach-main .sort-filter .btn-outline-primary {
    background-color: rgb(231, 239, 226);
    border-radius: 5px;
    border: 1px solid #77bf45;
    text-align: left;
    padding: 12px 6px;

}
.filter-item.sort-filter .btn-outline-primary {
    display: block;
}
.filter-item.sort-filter .btn-outline-primary svg {
    position: absolute;
    right: 5px;
}
.filter-item.sort-filter .btn-outline-primary .sort-label {
    color: #222222;
}
.form-cms-build {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
}
.form-cms-build .filter-item {
    height: 100%;
    position: relative;
}
.filter-item .item-wrap {
    position: relative;
    height: 100%;
}
.filter-item .item-wrap .btn-outline-primary{
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
}
@media (max-width: 1299px) {
    .building-filter .sort-filter .box.row {
        left: auto;
        right: 10px;
    }
}
@media (max-width: 1199px) {
    .form-cms-build {
        padding: 0;
    }
}
@media (max-width: 991px) {
    .building-filter .box.row {
        width: 260px;
    }
}
@media (max-width: 997px) {
    .building-cms .building-card .content-wrap .detail-desc {
        min-height: 68px;
    }
}
/**** R: MobileCard START */
@media (min-width: 711px) and (max-width: 991px) { 
    .building-card .card-main {
        max-width: 330px;
        margin: 0 auto;
    }
}
/**** R: MobileCard END */
@media (max-width: 767px) {
    .building-cms .form-cms-build .input-serach-main {
        flex: 0 0 33.33%;
        max-width: 33.33%;
    }
    .building-cms .form-cms-build .input-serach-main:nth-child(n+3) {
        margin-top: 10px;
    }   
    .building-filter .sort-filter .box.row {
        left: 0;
        right: auto;
    }
    .building-filter .input-serach-main:nth-child(3) .box.row {
        right: 10px;
        left: auto;
    }
}
@media (max-width: 575px) {
    .building-cms .form-cms-build .input-serach-main {
        flex: 0 0 50%;
        max-width: 50%;
    }
    .building-filter .input-serach-main:nth-child(3) .box.row {
        left: 0;
        right: auto;
    }
    .building-filter .input-serach-main:nth-child(even) .box.row {
        right: 10px;
        left: auto;
    }
    .building-filter .sort-filter .box.row { 
        margin: 0;
        width: 100%;
    }
    .building-cms .form-cms-build .input-serach-main:nth-child(n+3) {
        margin-top: 20px;
    }
    /**** R: MobileCard START */
    .building-card .card-main {
        max-width: 330px;
        margin: 0 auto;
    }
    /**** R: MobileCard START */
}
@media (max-width: 400px) {
    .building-cms .form-cms-build .input-serach-main {
        flex: 0 0 100%;
        max-width: 100%;
    }
    .building-cms .form-cms-build .input-serach-main:nth-child(n+2) {
        margin-top: 20px;
    }
    .building-filter .box.row {
        margin-left: 0;
        margin-right: 0;
        left: 0!important;
        right: auto!important;
    }
}
</style>
