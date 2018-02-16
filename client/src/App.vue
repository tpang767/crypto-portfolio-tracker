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
import AppNav from './components/AppNav'
import AppFooter from './components/AppFooter'
import AppSide from './components/AppSide'
// import HoldingList from '@/components/HoldingList'
// import { EventBus } from './'

export default {
  name: 'app',
  components: {
    AppNav,
    AppSide,
    AppFooter
    // SideNav,
    // HoldingList
  }
}
</script>

<style>

</style>
