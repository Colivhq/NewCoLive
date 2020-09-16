<template>
    <div :class="'slices-wrapper ' + [(isHomeDetail != undefined && isHomeDetail === true) ? 'inner-content-wrapper' : '' ]">
        <!-- Slice section template -->
        <template v-if="(isHomeDetail != undefined && isHomeDetail === true)">
            <div class="cust-findhome-wrap">
                <section v-for="(slice, index) in slices" :key="'slice-' + index">
                    <!-- Text slice component -->
                    <template v-if="slice.slice_type === 'text'">
                        <text-slice :slice="slice"/>
                    </template>
                    <!-- Quote slice component -->
                    <template v-else-if="slice.slice_type === 'quote'">
                        <quote-slice :slice="slice"/>
                    </template>
                    <!-- Full Width Image slice component -->
                    <template v-else-if="slice.slice_type === 'full_width_image'">
                        <full-width-image :slice="slice"/>
                    </template>
                    <!-- Image Gallery slice component -->
                    <template v-else-if="slice.slice_type === 'image_gallery'">
                        <image-gallery :slice="slice"/>
                    </template>
                    <!-- Image Highlight slice component -->
                    <template v-else-if="slice.slice_type === 'image_highlight'">
                        <image-highlight :slice="slice"/>
                    </template>
                    <!-- CTA slice component -->
                    <template v-else-if="slice.slice_type === 'cta' || slice.slice_type === 'cta1'">
                        <cta-slice :slice="slice"/>
                    </template>
                    <!-- Smaller CTA slice component -->
                    <template v-else-if="slice.slice_type === 'smaller_cta'">
                        <smallCta-slice :slice="slice" />
                    </template>
                    <!-- Section Spacer -->
                    <template v-else-if="slice.slice_type === 'spacer'">
                        <spacer-slice :slice="slice"/>
                    </template>
                    <!-- Section title with icon -->
                    <template v-else-if="slice.slice_type === 'title'">
                        <title-slice :slice="slice"/>
                    </template>
                    <!-- Section Background slice -->
                    <template v-else-if="slice.slice_type === 'background'">
                        <background-slice :slice="slice"/>
                    </template>
                    <!-- Section Form slice -->
                    <template v-else-if="slice.slice_type === 'form'">
                        <form-slice :slice="slice" :banner="banner"/>
                    </template>
                    <!-- Section Blog Card slice -->
                    <template v-else-if="slice.slice_type === 'blog_cards'">
                        <blog-card-slice :slice="slice"/>
                    </template>            
                    <!-- Section Text-image slice -->
                    <template v-else-if="slice.slice_type === 'text-image'">
                        <text-image-slice :slice="slice"/>
                    </template>
                    <!-- Section Pricing slice -->
                    <template v-else-if="slice.slice_type === 'pricing'">
                        <pricing-slice :slice="slice"/>
                    </template>
                    <!-- Embend slice component -->
                    <template v-else-if="slice.slice_type === 'embed_section'">
                        <embed-slice :slice="slice" />
                    </template>
                    <!-- Bedrooms -->
                    <template v-else-if="slice.slice_type === 'rooms'">
                        <room-slice :slice="slice"/>
                    </template>
                    <!-- Maprooms -->
                    <template v-else-if="slice.slice_type === 'map'">
                        <map-slice :slice="slice"/>
                    </template>
                    <!-- Building cards -->
                    <template v-else-if="slice.slice_type === 'building_cards'">
                        <building-card-slice :slice="slice" :home-lists="slice.items" :home-lists-copy="slice.items" :hide-filter="true"/>
                    </template>
                    <!-- Listing cards -->
                    <template v-else-if="slice.slice_type === 'listing'">
                        <listing-slice :slice="slice"/>
                    </template>
                    <!-- table slice -->
                    <template v-else-if="slice.slice_type === 'table'">
                        <table-slice :slice="slice"/>
                    </template>
                </section>
            </div>    
        </template >            
        <template v-else>
            <section v-for="(slice, index) in slices" :key="'slice-' + index">
                <!-- Text slice component -->
                <template v-if="slice.slice_type === 'text'">
                    <text-slice :slice="slice"/>
                </template>
                <!-- Quote slice component -->
                <template v-else-if="slice.slice_type === 'quote'">
                    <quote-slice :slice="slice"/>
                </template>
                <!-- Full Width Image slice component -->
                <template v-else-if="slice.slice_type === 'full_width_image'">
                    <full-width-image :slice="slice"/>
                </template>
                <!-- Image Gallery slice component -->
                <template v-else-if="slice.slice_type === 'image_gallery'">
                    <image-gallery :slice="slice"/>
                </template>
                <!-- Image Highlight slice component -->
                <template v-else-if="slice.slice_type === 'image_highlight'">
                    <image-highlight :slice="slice"/>
                </template>
                <!-- CTA slice component -->
                <template v-else-if="slice.slice_type === 'cta' || slice.slice_type === 'cta1'">
                    <cta-slice :slice="slice"/>
                </template>
                <!-- Smaller CTA slice component -->
                <template v-else-if="slice.slice_type === 'smaller_cta'">
                    <smallCta-slice :slice="slice" />
                </template>
                <!-- Section Spacer -->
                <template v-else-if="slice.slice_type === 'spacer'">
                    <spacer-slice :slice="slice"/>
                </template>
                <!-- Section title with icon -->
                <template v-else-if="slice.slice_type === 'title'">
                    <title-slice :slice="slice"/>
                </template>
                <!-- Section Background slice -->
                <template v-else-if="slice.slice_type === 'background'">
                    <background-slice :slice="slice"/>
                </template>
                <!-- Section Form slice -->
                <template v-else-if="slice.slice_type === 'form'">
                    <form-slice :slice="slice" :banner="banner"/>
                </template>
                <!-- Section Blog Card slice -->
                <template v-else-if="slice.slice_type === 'blog_cards'">
                    <blog-card-slice :slice="slice"/>
                </template>            
                <!-- Section Text-image slice -->
                <template v-else-if="slice.slice_type === 'text-image'">
                    <text-image-slice :slice="slice"/>
                </template>
                <!-- Section Pricing slice -->
                <template v-else-if="slice.slice_type === 'pricing'">
                    <pricing-slice :slice="slice"/>
                </template>
                <!-- Embend slice component -->
                <template v-else-if="slice.slice_type === 'embed_section'">
                    <embed-slice :slice="slice" />
                </template>
                <!-- Bedrooms -->
                <template v-else-if="slice.slice_type === 'rooms'">
                    <room-slice :slice="slice"/>
                </template>
                <!-- Maprooms -->
                <template v-else-if="slice.slice_type === 'map'">
                    <map-slice :slice="slice"/>
                </template>
                <!-- Building cards -->
                <template v-else-if="slice.slice_type === 'building_cards'">
                    <building-card-slice :slice="slice" :home-lists="slice.items" :home-lists-copy="slice.items" :hide-filter="true"/>
                </template>
                <!-- Listing cards -->
                <template v-else-if="slice.slice_type === 'listing'">
                    <listing-slice :slice="slice"/>
                </template>
                <!-- table slice -->
                <template v-else-if="slice.slice_type === 'table'">
                    <table-slice :slice="slice"/>
                </template>
            </section>
        </template>
    </div>
</template>

<script>
// Imports for all slices
const TextSlice = () => import("./slices/TextSlice.vue");
const QuoteSlice = () => import("./slices/QuoteSlice.vue");
const FullWidthImage = () => import("./slices/FullWidthImage.vue");
const ImageGallery = () => import("./slices/ImageGallery.vue");
const ImageHighlight = () => import("./slices/ImageHighlight.vue");
const CtaSlice = () => import("./slices/CtaSlice.vue");
const SpacerSlice = ()=> import("./slices/SpacerSlice.vue");
const TitleSlice = ()=> import("./slices/TitleSlice.vue");
const SmallCtaSlice = ()=> import("./slices/SmallCtaSlice.vue");
const BackgroundSlice = ()=> import("./slices/BackgroundSlice.vue");
const FormSlice = ()=> import("./slices/FormSlice.vue");
const BlogCardSlice = ()=> import("./slices/BlogCardSlice.vue");
const TextImageSlice = ()=> import("./slices/TextImageSlice.vue");
const PricingSlice = ()=> import("./slices/PricingSlice.vue");
const EmbedSlice = ()=> import("./slices/EmbedSlice.vue");
const RoomSlice = ()=> import("./slices/BedroomsSlice.vue");
const MapSlice = ()=> import("./slices/MapSlice.vue");
const BuildingCardSlice = ()=> import("./slices/BuildingCardSlice.vue");
const ListingSlice = ()=> import("./slices/ListingSlice.vue");
const TableSlice = ()=> import("./slices/TableSlice.vue")

export default {
  props: ['slices', 'banner', 'isHomeDetail'],
  name: 'slices-block',
  components: {
    TextSlice,
    QuoteSlice,
    FullWidthImage,
    ImageGallery,
    ImageHighlight,
    CtaSlice,
    SpacerSlice,
    TitleSlice,
    SmallCtaSlice,
    BackgroundSlice,
    FormSlice,
    BlogCardSlice,
    TextImageSlice,
    PricingSlice,
    EmbedSlice,
    RoomSlice,
    MapSlice,
    BuildingCardSlice, 
    ListingSlice,
    TableSlice
  }
}
</script>