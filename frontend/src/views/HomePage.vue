<template>
      <v-container fluid grid-list-md>
            <v-layout row wrap>
                  <v-flex xs3>
                        <v-card height="100%">
                              <v-card-text style="">
                                    <stat-summary :stat="accountInfo"></stat-summary>
                              </v-card-text>
                        </v-card>
                        <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs3>
                        <v-card height="100%">
                              <v-card-text style="">
                                    <stat-summary :stat="totalReturn"></stat-summary>
                              </v-card-text>
                        </v-card>
                        <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs3>
                        <v-card height="100%">
                              <v-card-text style="">
                                    <stat-summary :stat="totalValue"></stat-summary>
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex xs3>
                        <v-card height="100%">
                              <v-card-text style="">
                                    <stat-summary :stat="totalCoins"></stat-summary>
                              </v-card-text>
                        </v-card>
                  </v-flex>
            </v-layout>

            <v-layout row>
                  <v-flex xs3>
                        <v-card height='100%'>
                              <v-card-text class="px-0" style="">
                              </v-card-text>
                              <edit-form :items="coinProfiles"></edit-form>
                        </v-card>
                  </v-flex>
                  <v-flex xs12>
                        <v-card height='100%'>
                              <holdings :items="holdings" :loading="isLoading">
                              </holdings>
                        </v-card>
                  </v-flex>
            </v-layout>
      </v-container>
</template>
<script>
import Holdings from '../components/Holdings'
import DataService from '../service/api'
import StatSummary from '../components/StatSummary'
import EditForm from '../components/EditForm'

export default {
      name: "HomePage",
      components: {
            Holdings,
            EditForm,
            StatSummary
      },
      data () {
            return {
                  // isLoading: true,
                  accountInfo: { field: 'Portfolio', value: '' },
                  totalCoins: { field: 'Total Coins', value: 0 },
                  totalReturn: { field: 'Total Return', value: '625%' },
                  totalValue: { field: 'Total Value', value: 0, prefix: '$' },
                  lastUpdate: { field: 'Last Update', value: '' },
                  holdings: [],
                  coinProfiles: []
            }
      },
      created () {
            this.fetchAllData()
      },
      methods: {
            fetchAllData () {
                  this.fetchPortfolioData()
                  this.fetchProfiles()
            },
            fetchProfiles () {
                  DataService.fetchProfiles().then(response => {
                        console.log(response.data)
                        this.setArray('coinProfiles', response.data)
                  })
            },
            fetchPortfolioData () {
                  DataService.fetchPortfolio().then(response => {
                        console.log(response.data)
                        this.updatePortfolio(response.data)
                  })
            },
            updatePortfolio (data) {
                  function titleCase (string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                  }
                  this.totalCoins.value = data.totalCoins
                  this.accountInfo.value = titleCase(data.name)
                  this.totalValue.value = Math.round(data.totalValue)
                  this.lastUpdate.value = data.lastUpdate
                  this.updateHoldings(data.holdings)
            },
            updateHoldings (data) {
                  Promise.resolve(data.reduce((sum, holding) => {
                        this.holdings.push({
                              'symbol': holding.symbol,
                              'coinName': holding.coinName,
                              'amount': holding.amount,
                              'price': '$' + holding.price,
                              'marketValue': '$' + holding.marketValue.toFixed(2)
                        })
                        return sum
                  }, 0))
                  // .then(() => {
                  //       const empty = 15 - data.length
                  //       const insertBlankRows = (num) => {
                  //             return new Promise((resolve, reject) => {
                  //                   try {
                  //                         while (num > 0) {
                  //                               this.holdings.push({})
                  //                               num--
                  //                         }
                  //                         resolve()

                  //                   } catch (err) {
                  //                         reject(err)
                  //                   }

                  //             })
                  //       }
                  //       insertBlankRows(empty)
                  // })
            },
            setArray (dataField, dataArr) {
                  Promise.resolve(dataArr.reduce((prev, data) => {
                        this[dataField].push({
                              text: data.fullName
                        })
                        return data
                  }))
                  return
            }
      }
}
</script>

<style scoped>
html,
body {
      background-color: white;
}
</style>
