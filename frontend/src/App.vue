<template>
    <v-app id="app">
    <!--<side-nav>

    </side-nav>-->
      <v-toolbar app color="blue-grey darken-3" flat absolute dark dense clipped-left>
        <span class="title">DigiDash&nbsp;
        </span>
      </v-toolbar>
      <v-content>
        <router-view>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
          </v-layout>
        </v-container>
        </router-view>
      </v-content>
    </v-app>
</template>

<script>
import SideNav from './components/SideNav'
export default {
  name: 'app',
  components: {
    SideNav
  },
  data () {
    return {
    }
  }
}
</script>

<style>
main.content{
  background-color: #fafafa;
}
</style>
