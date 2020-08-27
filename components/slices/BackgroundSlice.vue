<template>
  <div class="" :style="style">
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'background-slice',
  data() {
      return {
        style:{
            backgroundColor: this.slice.primary.background_color,
            height: "100px" 
        }
      }
  }
}
</script>