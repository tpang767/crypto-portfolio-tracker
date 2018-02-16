<template>
  <v-select
          :items="coinList"
          overflow
          label="Select"
          target="#dropdown-example"
        >
</v-select>
</template>

<script>
import {EventBus} from '../eventBus'
import DataService from '../service/portfolio'

export default {
      name: "CoinSelector",
      created() {
            this.initalize()                
      },
      data: () => ({
            coinList: []
      }),
      methods: {
            initalize() {
                  const coinList = await DataService.getCoinList()
                  this.setCoinList(coinList)
            },
            setCoinList(coinList) {
                  this.coinList = coinList
            }
      }
}
</script>

<style>

</style>
