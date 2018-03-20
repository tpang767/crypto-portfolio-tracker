<template>
  <!--<div id="app">-->
  <v-app id="inspire" dark>
    <AppSide/>
    <AppNav/>
    <v-content>
      <v-container fluid fill-height>
            <router-view>
            </router-view>
      </v-container>
    </v-content>
    <AppFooter/>
  </v-app>
  <!--</div>-->
</template>

<script>
import AppNav from './components/partials/AppNav'
import AppFooter from './components/partials/AppFooter'
import AppSide from './components/partials/AppSide'

export default {
  name: 'app',
  components: {
    AppNav,
    AppSide,
    AppFooter
  }
}
</script>

<style>

</style>
