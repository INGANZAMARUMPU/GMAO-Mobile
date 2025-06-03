<script>
// import loading from './components/loading.vue'
import Login from './components/Login.vue';
import { StatusBar, Style } from '@capacitor/status-bar'
export default {
  components: {
     Login
  },
  mounted() {
    let user = JSON.parse(window.localStorage.getItem('user'))
    if (!!user) {
      this.$store.state.user = user
    }
    if (window.Capacitor?.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false })
      StatusBar.setStyle({ style: Style.Dark })
      StatusBar.setBackgroundColor({ color: '#014268' })
    }
  }


}
</script>

<template>
  <!-- <loading v-if="this.$store.state.is_loading" /> -->
  <router-view v-if="this.$store.state.user" />
  <Login v-else />
</template>

<style></style>
