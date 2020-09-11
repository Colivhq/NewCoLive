import Vuex from 'vuex'
import axios from 'axios'

const mainStore = () => {
    return new Vuex.Store({
        state: {
			menu: {},
			roomId: '',
			openModal: false,
			homeList: [],
			headerLogo: null
        },
        mutations: {
            SET_MENU(state, menu) {
				state.menu = menu
			},
			SET_ROOM_ID(state, roomId) {
				state.roomId = roomId
			},
			SET_MODAL_FLAG(state, openModal) {
				state.openModal = openModal
			},
			SET_ERROR(state, error) {
				state.menu = error
			},
			setHomeLists(state, homes) {
                state.homeList = homes
			},
			setHeaderLogo(state, payload) {
				state.headerLogo = payload
			}
        },
        actions: {
            async fetchMenu({ commit }) {
				try {
					const menu = (await this.$prismic.api.getSingle('menu')).data
					console.log('menu', menu)
					commit('SET_MENU', menu)
				} catch (e) {
					const error = 'Please create a menu document'
					commit('SET_ERROR', e);
				}
			},
			async fetchAuthor ({},payload) {
				try {
					let resp = await this.$prismic.api.query(this.$prismic.predicates.at('document.id', payload))
					return resp
				} catch (error) {
					commit('SET_ERROR', error);
				}
			}
			/* fetchHomelist({ commit }, payload) {
				// return new Promise((resolve, reject) => {
					return this.$axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
						//"operatorId": "HaF6mb19L6AzWVavPr5t",
						"neighborhoodId": "",
						"cityId": (payload != undefined && payload.cityId != undefined) ? payload.cityId : ""
					},{
						headers: {
							Authorization: 'Bearer '+process.env.bearer
						}
					}).then((appartments) => {
						let homeList = [];
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
										description: (appartment.description != null && appartment.description.length > 100) ? appartment.description.substring(0, 100) + '...' : appartment.description,
										startingPrice: startingPrice,
										priceCurrency: priceCurrency,
										availability: appartment.availability,
										roomType: roomType,
										totalBedrooms: appartment.totalBedrooms,
										mapLocation: appartment.mapLocation
									})
								}
							});
							commit('setHomeLists', homeList)
							//resolve(appartments)
						}
					}).catch(error => {
						console.log(error)
						// request failed 
						//reject(error) // return error to calling function
					})
				//})				
			}, */
		},
		getters: {
			getHomeList(state) {
				return state.homeList;
			},
		}
    })
}

export default mainStore;