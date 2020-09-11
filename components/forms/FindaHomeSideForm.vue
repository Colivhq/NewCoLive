<template>
        <div class="find-home-outer" v-if="showModal">
            <b-modal id="sideform" v-model="showModal"  :hideFooter="true"  @hide="hideModal">
                <div class="inner-content-wrapper home-details">
                    <div class="main-part form-cms-build">
                        <b-form @submit="onSubmit">
                            <div class="row">
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:prepend>
                                            <b-input-group-text
                                                :style="{'background-color': sideFormBackgroundColor,
                                                    'border-color': sideFormBackgroundColor}" >
                                                FIRST<br/>NAME
                                            </b-input-group-text>
                                        </template>
                                        <b-form-input
                                            id="first_name"
                                            v-model="form.firstName"
                                            placeholder="Required Field"
                                            type="text"
                                            class="form-inputs"
                                            required
                                            :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                         <template v-slot:prepend>
                                            <b-input-group-text 
                                                :style="{'background-color': sideFormBackgroundColor,
                                                    'border-color': sideFormBackgroundColor}" >
                                               LAST <br>NAME
                                            </b-input-group-text>
                                        </template>
                                        <b-form-input
                                            id="last_name"
                                            placeholder="Required Field"
                                            v-model="form.lastName"
                                            type="text"
                                            class="form-inputs"
                                            :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                            required
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <template v-slot:prepend>
                                            <b-input-group-text 
                                                :style="{'background-color': sideFormBackgroundColor,
                                                    'border-color': sideFormBackgroundColor}" >
                                               PHONE
                                            </b-input-group-text>
                                        </template>
                                        <b-form-input
                                            id="phone_number"
                                            v-model="form.phone"
                                            type="text"
                                            class="form-inputs"
                                            :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <b-input-group-text 
                                            :style="{'background-color': sideFormBackgroundColor,
                                                'border-color': sideFormBackgroundColor}" >
                                            EMAIL
                                        </b-input-group-text>
                                        <b-form-input
                                            id="email"
                                            v-model="form.email"
                                            type="email"
                                            class="form-inputs"
                                            placeholder="Required Field"
                                            :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                            required
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <b-input-group-text 
                                            :style="{'background-color': sideFormBackgroundColor,
                                                'border-color': sideFormBackgroundColor}" >
                                            START<br/>OF STAY
                                        </b-input-group-text>
                                        <b-form-select id="los" v-model="form.sos" :options="sosOptions" class="form-inputs" required :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"></b-form-select>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <b-input-group-text 
                                            :style="{'background-color': sideFormBackgroundColor,
                                                'border-color': sideFormBackgroundColor}" >
                                            LENGTH<br/>OF STAY
                                        </b-input-group-text>
                                        <b-form-select id="los" v-model="form.los" :options="losOptions" class="form-inputs" required :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"></b-form-select>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <b-input-group-text 
                                            :style="{'background-color': sideFormBackgroundColor,
                                                'border-color': sideFormBackgroundColor}" >
                                            AGE<br/>GROUP
                                        </b-input-group-text>
                                        <b-form-select id="age_group" v-model="form.ageGroup" :options="ageGroupOptions" class="form-inputs" required :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"></b-form-select>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-lg-12 col-md-12 col-sm-12">
                                    <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <b-input-group-text 
                                            :style="{'background-color': sideFormBackgroundColor,
                                                'border-color': sideFormBackgroundColor}" >
                                            JOB
                                        </b-input-group-text>
                                        <b-form-input
                                            id="job_function"
                                            v-model="form.job"
                                            placeholder="Required Field"
                                            class="form-inputs"
                                            type="text"
                                            :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                            required
                                        ></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                                <b-form-group class="col-sm-12 update-check">
                                    <b-form-checkbox
                                        id="marketing_update"
                                        v-model="form.status"
                                        :checked="form.status"
                                        name="marketing_update"
                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        >
                                        I would like to receive marketing updates from ColivHQ.
                                    </b-form-checkbox>
                                </b-form-group>
                                <div class="col-sm-12 text-center submit-btn">
                                    <b-button type="submit" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}" :disabled="form.isActive" class="pt-2 pb-2" variant="default">SUBMIT</b-button>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </div>
            </b-modal>
        </div>
        <div class="find-home-outer" v-else>
            <div class="inner-content-wrapper side-form home-details">
                <div class="main-part form-cms-build">
                    <b-form @submit="onSubmit">
                        <div class="row">
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                         <b-input-group-text
                                            :style="{'background-color': sideFormBackgroundColor,
                                                'border-color': sideFormBackgroundColor}" >
                                            FIRST<br/>NAME
                                        </b-input-group-text>
                                    </template>
                                    
                                    <b-form-input
                                        id="first_name"
                                        v-model="form.firstName"
                                        placeholder="Required Field"
                                        type="text"
                                        class="form-inputs"
                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        required
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2"
                                        :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            LAST<br/> NAME
                                        </b-input-group-text>
                                    </template>
                                    <b-form-input
                                        id="last_name"
                                        placeholder="Required Field"
                                        v-model="form.lastName"
                                        type="text"
                                        class="form-inputs"
                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        required
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            PHONE
                                        </b-input-group-text>
                                    </template>
                                    <b-form-input
                                        id="phone_number"
                                        v-model="form.phone"
                                        type="text"
                                        class="form-inputs"
                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            EMAIL
                                        </b-input-group-text>
                                    </template>
                                    <b-form-input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        class="form-inputs"
                                        placeholder="Required Field"
                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        required
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            START OF STAY
                                        </b-input-group-text>
                                    </template>
                                    <b-form-select id="los" v-model="form.sos" :options="sosOptions" class="form-inputs" required :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"></b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            LENGTH OF STAY
                                        </b-input-group-text>
                                    </template>
                                    <b-form-select id="los" v-model="form.los" :options="losOptions" class="form-inputs" required :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"></b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            AGE GROUP
                                        </b-input-group-text>
                                    </template>
                                    <b-form-select id="age_group" v-model="form.ageGroup" :options="ageGroupOptions" class="form-inputs" required :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"></b-form-select>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-lg-12 col-md-12 col-sm-12 mx-auto">
                                <b-input-group class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <template v-slot:prepend>
                                        <b-input-group-text class="text-wrap px-2" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}">
                                            JOB
                                        </b-input-group-text>
                                    </template>
                                    <b-form-input
                                        id="job_function"
                                        v-model="form.job"
                                        placeholder="Required Field"
                                        class="form-inputs"
                                        type="text"
                                        :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                        required
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group class="col-sm-12 update-check mx-auto">
                                <b-form-checkbox
                                    id="marketing_update"
                                    v-model="form.status"
                                    :checked="form.status"
                                    name="marketing_update"
                                    :style="{'border-color': sideFormBackgroundColor, '--sideFormBackgroundColor': sideFormBackgroundColor}"
                                    >
                                    I would like to receive marketing updates from ColivHQ.
                                </b-form-checkbox>
                            </b-form-group>
                            <div class="col-sm-12 text-center submit-btn">
                                <b-button type="submit" :style="{'background-color': sideFormBackgroundColor, 'border-color': sideFormBackgroundColor}" :disabled="form.isActive" class="pt-2 pb-2" variant="default">SUBMIT</b-button>
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
    name: 'finda-home-side-form',
    props: ['slice'],
    data() {
        return {
            sideFormBackgroundColor: this.slice.sideFormBackgroundColor,
            form: {
                city: '',
                area: null,
                firstName: '',
                lastName: '',
                phone:'',
                email: '',
                sos: null,
                los: null,
                job: '',
                ageGroup: null,
                status: true,
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
            ]
        }
    },
    computed: {
        // Open OR Hide modal
        showModal: function () {
            return this.$store.state.openModal
        }
    },
    methods: {
        hideModal() {
            this.$store.commit('SET_MODAL_FLAG', false);
            this.$store.commit('SET_ROOM_ID', '');
            this.resetForm();
        },
        resetForm() {
            this.form = {
                ageGroup: null,
                email: '',
                firstName: '',
                job: '',
                lastName: '',
                phone:'',
                city: '',
                sos: null,
                status: true,
                los: null,
                area: null,
                isActive: false
            }
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.form.isActive = true;                
            var leadSource = location.href
            axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiFormSubmit', {
                ageGroup: this.form.ageGroup,
                emailAddress: this.form.email,
                firstName: this.form.firstName,
                jobTitle: this.form.job,
                lastName: this.form.lastName,                    
                phone: this.form.phone,
                prefCityName: this.form.city,
                operatorId: this.slice.OperatorID,
                whatsApp: this.form.phone,
                prefStayStartTimeframe: this.form.sos,
                marketingUpdate: this.form.status,
                prefCommitLen: this.form.los,
                prefRoomType: this.form.roomType,
                source: "ColivHQ form",
                sourceDetails: leadSource,
                prefCityName: this.slice.cityName,
                prefCityID: this.slice.cityID,
                prefNeighbourhoodIds: [this.slice.neighborhoodId],
                prefBuildingIds: [this.slice.buildingId],
                prefHomeIds: [this.slice.homeID],
                prefRoomIds: (this.$store.state.roomId != '' ) ? [this.$store.state.roomId] : '',
                uid: process.env.firebaseID,
            },{
                headers: {
                    Authorization: 'Bearer '+process.env.COLIV_HQ_KEY
                }
            }).then((response) => {
                if(response.data.status == 1) {
                    this.$bvToast.toast('Thank you for reaching out. We will get back to you shortly.', {
                        title: 'Success',
                        variant: 'success',
                        autoHideDelay: 2000
                    })
                } else {
                    this.$bvToast.toast(response.data.message, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 5000
                    })
                }
                this.hideModal();
                this.$store.commit('SET_MODAL_FLAG', false);
                this.$store.commit('SET_ROOM_ID', '');
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
</script>
<style>
@import "@/assets/css/form.css";
#sideform header {
    border: none;
    padding-bottom: 0;
    margin: unset;
}
.home-details .form-cms-build {
    padding: 30px;
}
.input-group .input-group-text {
    width: 75px;
    text-align: left;
}
.home-details .form-cms-build .submit-btn button {
  max-width: 100px;
}
.home-details .form-cms-build .form-group:nth-child(even) {
    padding-left: 15px;
}
.side-form {
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
    .side-form {
        margin: 0 15px;
    }
}
@media(max-width:997px) {
    .find-home-cms #neighbour .custom-control-inline.custom-checkbox {
        width: 45%;
    }
}
@media (min-width: 992px) {
    .home-details .form-cms-build .form-group:nth-child(odd) {
        padding-right: 15px;
    }
}
@media (min-width: 768px) {
    .side-form{
        position: fixed;
        right: 15px;
        left: auto;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%); 
        -o-transform: translateY(-50%); 
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 300px;
        margin: 0;
    }
}
@media (min-width: 1680px) {
    .side-form{
        right: 60px;
    } 
}
@media(max-width:1199px) {
    .find-home-outer .side-form {
        width: 250px;
    }
}
@media(max-width:767px) {
    .find-home-outer .side-form {
        padding: 0 0px 30px 0px;
    }

}
@media(max-width:460px){
    .find-home-cms #neighbour .custom-control-inline.custom-checkbox {
        width: 50%;
        padding-left: 15px;
    }

    .find-home-outer .side-form {
        width: 100%;
    }

    .find-home-outer .side-form .form-group {
        max-width: 333px;
    }
}
</style>
