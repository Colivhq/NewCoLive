<template>
    <div class="find-home-outer" v-bind:style="{ 'background': 'url(' + banner.hero_image.url + ')', 'height': '100%', 'backgroundPosition': 'center', 'backgroundRepeat': 'no-repeat', 'backgroundSize': 'cover' }">
        <!-- <div class="bg-image-outer">
            <picture>
                <source :srcset="banner.hero_image.phone" media="(max-width: 750px)">
                <source :srcset="banner.hero_image.tablet" media="(max-width: 991px)">
                <img :src="banner.hero_image.url">
            </picture>
        </div> -->
        <div class="inner-content-wrapper form">
            <div class="main-part form-cms-build">
                <p class="title"><prismic-rich-text v-if="banner.title" :field="banner.title"/></p>
                <prismic-rich-text :field="banner.tagline" v-if="banner.tagline" class="description"/>
                <b-form @submit="onSubmit">
                    <div class="row">
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="FIRST NAME" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input
                                    id="first_name"
                                    v-model="form.firstName"
                                    placeholder="Required Field"
                                    type="text"
                                    class="form-inputs"
                                    required
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="LAST NAME" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input
                                    id="last_name"
                                    placeholder="Required Field"
                                    v-model="form.lastName"
                                    type="text"
                                    class="form-inputs"
                                    required
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="PHONE" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input
                                    id="phone_number"
                                    v-model="form.phone"
                                    type="text"
                                    class="form-inputs"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="EMAIL" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    class="form-inputs"
                                    placeholder="Required Field"
                                    required
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="CITY" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input list="city-list-id" v-on:input="getCties()" autocomplete="off" 
                                class="form-inputs"
                                placeholder="Required Field"
                                required
                                v-model="form.city"></b-form-input>

                                    <datalist id="city-list-id">
                                        <option v-for="(city, index) in cities" :key="index">{{ city }}</option>
                                    </datalist>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="AREA" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input
                                    id="area"
                                    v-model="form.area"
                                    type="text"
                                    class="form-inputs"
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="JOB" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input
                                    id="job_function"
                                    v-model="form.job"
                                    placeholder="Required Field"
                                    class="form-inputs"
                                    type="text"
                                    required
                                ></b-form-input>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="AGE GROUP" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-select id="age_group" v-model="form.ageGroup" :options="ageGroupOptions" class="form-inputs" required></b-form-select>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="BUDGET" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <!-- <b-form-select id="budget" v-model="form.budget" :options="budgetOptions" class="form-inputs"></b-form-select> -->
                                <b-form-spinbutton
                                    class="form-inputs"
                                    id="sb-days"
                                    v-model="form.budget"
                                    :formatter-fn="curFormatter"
                                    min="500"
                                    max="5000"
                                    step="100"
                                    required
                                    ></b-form-spinbutton>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend-html="ROOM TYPE" class="input-group mb-2 mr-sm-2 mb-sm-0 big-label">
                            <b-form-select id="room_type" v-model="form.roomType" :options="roomTypeOptions" class="form-inputs" required></b-form-select>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="START OF STAY" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-select id="los" v-model="form.sos" :options="sosOptions" class="form-inputs" required></b-form-select>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group class="col-lg-6 col-md-12 col-sm-12">
                            <b-input-group prepend="LENGTH OF STAY" class="input-group mb-2 mr-sm-2 mb-sm-0">
                                <b-form-select id="los" v-model="form.los" :options="losOptions" class="form-inputs" required></b-form-select>
                            </b-input-group>
                        </b-form-group>
                        
                        <b-form-group class="col-sm-12 update-check">
                            <b-form-checkbox
                                id="marketing_update"
                                v-model="form.status"
                                :checked="form.status"
                                name="marketing_update"
                                >
                                I would like to receive marketing updates from ColivHQ.
                            </b-form-checkbox>
                        </b-form-group>
                        <div class="col-sm-12 text-center submit-btn">
                            <b-button type="submit" :disabled="form.isActive" class="pt-3 pb-3 pl-5 pr-5" variant="primary">SUBMIT</b-button>
                        </div>
                    </div>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {  
    name: 'finda-home-form',
    props: ['banner'],
    data() {
        return {
            cities: [],
            form: {
                city: '',
                area: null,
                firstName: '',
                lastName: '',
                phone:'',
                email: '',
                budget: null,
                sos: null,
                los: null,
                job: '',
                ageGroup: null,
                status: true,
                roomType: null,
                isActive: false
            },
            ageGroupOptions: [
                { text: 'Select an option', value: null}, 
                { text: '18-22', value: '18-22'},
                { text: '23-27', value: '23-27'},
                { text: '28-32', value: '28-32'},
                { text: '33-37', value: '33-37'},
                { text: '38+', value: '38+'}
            ],
            cityOptions: [
                { text: 'Singapore', value: 'Singapore'},
                { text: 'Melbourne', value: 'Melbourne'}
            ],
            nobOptions: [
                { text: 'Select an option', value: null}, 
                { text: '1', value: '1'},
                { text: '2-4', value: '2-4'},
                { text: '5+', value: '5+'}
            ],
            sosOptions: [
                { text: 'Please select', value: null}, 
                { text: 'Immediately', value: 'Immediately'},
                { text: 'Within a month', value: 'Within a month'},
                { text: 'In 2-3 months', value: 'In 2-3 months'},
                { text: 'More than 3 months from now', value: 'More than 3 months from now'}
            ],
            losOptions: [
                { text: 'Please select', value: null}, 
                { text: 'Less than 1 month', value: 'Less than 1 month'},
                { text: '1-3 months', value: '1-3 months'},
                { text: '3-6 months', value: '3-6 months'},
                { text: '6-12 months', value: '6-12 months'},
                { text: '12 months or more', value: '12 months or more'}
            ],
            roomTypeOptions: [
                { text: 'Please select', value: null}, 
                { text: 'Whole apartment', value: 'Whole apartment'},
                { text: 'Master (private bathroom)', value: 'Master (private bathroom)'},
                { text: 'Common (shared bathroom)', value: 'Common (shared bathroom)'},
                { text: 'Bed (shared bedroom)', value: 'Bed (shared bedroom)'}
            ],
        }
    },
    methods: {
        getCties() {
            axios.get(process.env.proxyUrl+'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+this.form.city+'&types=(cities)&key='+process.env.mapKey).then((response) => {
                this.cities = [];
                this.cityLatLong = [];
                for (let value of Object.values(response.data.predictions)) {
                    this.cities.push(value.terms[0].value)
                }
            });
        },
        curFormatter(value) {
            return '$' + value + '/month'
        },
        onSubmit(evt) {
            evt.preventDefault();
            if(this.form.budget == null) {
                this.$bvToast.toast('Please provide valid budget', {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelay: 5000
                })
            } else {
                this.form.isActive = true;                
                var leadSource = location.href
                axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiFormSubmit', {
                    ageGroup: this.form.ageGroup,
                    emailAddress: this.form.email,
                    firstName: this.form.firstName,
                    jobTitle: this.form.job,
                    lastName: this.form.lastName,                    
                    phone: this.form.phone,
                    prefBudget: this.form.budget,
                    prefCityName: this.form.city,
                    prefNeighbourhoodNames: [this.form.area],
                    prefCommitLen: this.form.los,
                    prefStayStartTimeframe: this.form.sos,
                    prefRoomType: this.form.roomType,
                    source: "ColivHQ form",
                    sourceDetails: leadSource,
                    uid: process.env.firebaseID,
                    whatsApp: this.form.phone,
                    marketingUpdate: this.form.status
                },{
                    headers: {
                        Authorization: 'Bearer '+process.env.COLIV_HQ_KEY
                    }
                }).then((response) => {
                    console.log('response', response);
                    if(response.data.status == 1) {
                        this.$bvToast.toast('Thank you for reaching out. We will get back to you shortly.', {
                            title: 'Success',
                            variant: 'success',
                            autoHideDelay: 2000
                        })
                        setTimeout( () => this.$router.push({ path: '/'}), 2000);
                    } else {
                        this.$bvToast.toast(response.data.message, {
                            title: 'Error',
                            variant: 'danger',
                            autoHideDelay: 5000
                        })
                        this.form.isActive = false;
                    }
                })
                .catch((error) => {
                    this.$bvToast.toast('Something went wrong. Please try again.'+error, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 5000
                    })
                    this.form.isActive = false;
                })
            }
        }
    }
}
</script>
<style>
@import "@/assets/css/form.css";
.form {
    padding: 110px 0px 30px 0px;
}
#neighbour .custom-control {
    padding-left: 1rem;
}
.neighbourhood-check {
    padding-right: 15px !important;
}
.find-home-cms #neighbour {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #f55e61;
    margin-left: 0!important;
    background-color: #fff;
}
/* .find-home-outer .bg-image-outer {
    position: relative;
}
.find-home-outer .bg-image-outer  img {
    width: 100%;
}
.find-home-outer .inner-content-wrapper.form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    margin: 20px 0;
} */
.find-home-outer {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
@media(min-width:998px) {
    .find-home-cms #neighbour .custom-control-inline.custom-checkbox {
        width: 20%;
    }
}
@media(max-width:1024px) {
    .form {
        margin: 0 15px;
    }
}
@media(max-width:997px) {
    .find-home-cms #neighbour .custom-control-inline.custom-checkbox {
        width: 45%;
    }
}
@media(max-width:460px){
    .find-home-cms #neighbour .custom-control-inline.custom-checkbox {
        width: 50%;
        padding-left: 15px;
    }
}
</style>
