<template>
    <section class="inner-content-wrapper">
        <div class="cms-main-wrap">
            <div class="section-main-title" v-if="slice.primary.map_title != undefined">
            <prismic-rich-text :field="slice.primary.map_title" class="cms-title"/>
            </div>
            <div class="google-map" :id="mapName"></div>
        </div>
    </section>
</template>
<script>
    //import mapJson from '@/custom_types/GoogleMap.json'
    export default {
    name: 'google-map',
    props: ['slice'],
    head () {
        return {
            script: [
                { src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_KEY}`}
            ]
        }
    },
    data: function () {
        return {
            mapName: "location-map",
            markerCoordinates: [{
                latitude: this.slice.primary.home.latitude,
                longitude: this.slice.primary.home.longitude
                //latitude: 51.501527,
                //longitude: -0.1921837
            }],
            map: null,
            bounds: null,
            markers: [],
            markerIcon: this.slice.primary.marker.url
            //mapStyleJson: mapJson
        }
    },
    mounted: function () {
        this.bounds = new google.maps.LatLngBounds();
        const element = document.getElementById(this.mapName)
        const mapCentre = this.markerCoordinates[0]
        const options = {
            center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
            fullscreenControl: false
        }
        this.map = new google.maps.Map(element, options);
        var styledMapType = new google.maps.StyledMapType(this.mapStyleJson, {name: 'Styled Map'});
        this.map.mapTypes.set('styled_map', styledMapType);
        this.map.setMapTypeId('styled_map');
        this.markerCoordinates.forEach((coord) => {
            const position = new google.maps.LatLng(coord.latitude, coord.longitude);
            const marker = new google.maps.Marker({ 
                position,
                map: this.map,
                icon: this.markerIcon
            });
            this.markers.push(marker)
            this.map.fitBounds(this.bounds.extend(position))
        });
        this.map.setOptions({ maxZoom: 14 });
    }
};
</script>
<style scoped>
    .google-map {
        width: 100%;
        height: 365px;
        margin: 0 auto;
        background: gray;
    }
    .section-main-title .cms-title >>> :first-child {
        color: #222222;
        margin-bottom: 40px;
        text-align: left;
    }
</style>