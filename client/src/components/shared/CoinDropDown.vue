<template>
      <v-select 
            label="Select" 
            :items="coinList" 
            required v-model="selected" 
            item-text="fullName" 
            :loading="isLoading">
      </v-select>
</template>

<script>
import DataService from '../../service/portfolio'

export default {
      name: "CoinDropDown",
      data: () => ({
            isLoading: false,
            selected: {
                  symbol: '',
                  coinName: '',
                  fullName: '',
                  holdingId: ''
            },
            coinList: []
      }),
      mounted() {
            this.isLoading = false
            this.initialize()
      },
      methods: {
            async initialize() {
                  this.isLoading = true
                  const coinList = await DataService.getCoinList()
                  this.setCoinList(coinList)
            },
            setCoinList(coinList) {
                  this.coinList = coinList
                  this.isLoading = false
            }
      },
      watch: {
            selected(val) {
                  this.$emit('coinSelected', val)
            }
      }

}
</script>

<style>

</style>
