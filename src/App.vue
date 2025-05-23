<script>
import { RouterView } from 'vue-router';
import loading from './components/loading.vue'
export default {
  components: {
    loading
  },
}
</script> 

<template>
  <loading v-if="this.$store.state.is_loading"/>
  <router-view/>
</template>

<style>

</style>
