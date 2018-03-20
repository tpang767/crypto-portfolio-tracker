<template>
      <v-layout justify-center>
            <v-flex xs12>
                  <HoldingList/>
            </v-flex>
      </v-layout>      
</template>

<script>
import HoldingList from '../components/holdings/HoldingList'
import DataService from '../service/portfolio'

export default {
      name: "DashBoardPage",
      components: {
            HoldingList
      }
}
</script>

<style>

</style>
