<template>
  <div :style="{ 'margin-top': slice.primary.pixels + 'px' }"></div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'spacer-slice'
}
</script>

<style>
</style>