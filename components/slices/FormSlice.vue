<template>
    <div>
        <template v-if="slice.slice_label == 'findyourhome'">
            <finda-home-form :banner="banner" />
        </template>
        <template v-else-if="slice.slice_label == 'homedetails'">
            <finda-home-side-form :slice="slice" />
        </template>
    </div>
</template>

<script>
const FindaHomeForm = () => import("../forms/FindaHomeForm.vue");
const FindaHomeSideForm = () => import("../forms/FindaHomeSideForm.vue");
export default {
	props: ['slice', 'banner'],
	name: 'form-slice',
	components: {
		FindaHomeForm,
		FindaHomeSideForm
	}
}
</script>

<style>
</style>
