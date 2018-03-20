<template>
      <div>
            <div class="xs-4">
                  <stat-list :stats='stats' title="Portfolio Summary">

                  </stat-list>
            </div>
            <notification-dialog :notification="notification" @close='close'></notification-dialog>

            <v-btn color="primary" dark class="mb-2" @click="openForm('add')">New Holding</v-btn>

            <action-form :action="action" @close="close" @saveAction="saveAction">
            </action-form>

            <v-data-table :headers="headers" :items="holdings" hide-actions class="elevation-1">
                  <template slot="items" slot-scope="props">
                        <td>{{ props.item.coinName }}</td>
                        <td class="text-xs-right">{{ props.item.symbol }}</td>
                        <td class="text-xs-right">{{ props.item.amount }}</td>
                        <td class="text-xs-right">{{ props.item.price }}</td>
                        <td class="text-xs-right">{{ props.item.marketValue }}</td>
                        <td class="justify-center layout px-0">
                              <v-btn icon class="mx-0" @click="openForm('edit', props.item)">
                                    <v-icon color="green">edit</v-icon>
                              </v-btn>
                              <v-btn icon class="mx-0" @click="deleteHolding(props.item)">
                                    <v-icon color="pink">delete</v-icon>
                              </v-btn>
                        </td>
                  </template>
            </v-data-table>
      </div>
</template>

<script>
import PortfolioService from '../../service/portfolio'
import NotificationDialog from '../shared/NotificationDialog'
import ActionForm from './ActionForm'
import StatList from './StatList'

const headers = [
      { text: 'Name (Cryptocurrency)', align: 'left', value: 'coinName' },
      { text: 'Symbol', value: 'symbol' },
      { text: 'Amount (holding)', value: 'amount' },
      { text: 'Price (USD)', value: 'price' },
      { text: 'MarketValue (USD)', value: 'marketValue' },
      { text: 'Actions', value: 'name', sortable: false }
]
const currency = (num) => `$${num.toFixed(2)}`
export default {
      name: "HoldingList",
      components: {
            NotificationDialog,
            ActionForm,
            StatList
      },
      data: () => ({
            headers: [],
            holdings: [],
            name: '',
            totalValue: 0,
            totalCoins: 0,
            lastUpdate: '',
            notification: {
                  text: '',
                  active: false
            },
            action: {
                  active: false,
                  type: '',
                  holding: {}
            }
      }),
      created () {
            this.initialize()
      },
      computed: {
            stats() {
                  const stats = [
                        {field: 'totalValue', label: 'Total Value', value: currency(this.totalValue)},
                        {field: 'totalCoins', label: 'Total Coins', value: this.totalCoins}
                  ]
                  return stats
            }
      },
      methods: {
            async initialize () {
                  this.headers = headers
                  this.fetchPortfolio()
            },
            async fetchPortfolio() {
                  const portfolio = await PortfolioService.getPortfolio()
                  for (var field in portfolio) {
                        this.setData(field, portfolio[field])
                  }
            },
            async getAllHoldings () {
                  const holdings = await PortfolioService.getHoldings()
                  this.setData('holdings', holdings)
            },
            async deleteHolding (item) {
                  const deleted = await PortfolioService.deleteHolding({
                        symbol: item.symbol
                  })
                  if (deleted) {
                        const message = 'holding succesfully deleted'
                        this.notify(message)
                        this.getAllHoldings()
                  }
            },
            async saveAction(payload) {
                  let action;
                  let message;
                  
                  switch (payload.action) {
                        case 'edit': {
                              action = await PortfolioService.updateHolding(payload)
                              message = 'holding successfully updated'
                              break;
                        }
                        case 'add': {
                              action = await PortfolioService.addHolding(payload)
                              message = 'holding successfully added'
                        }
                  }

                  if (action) {
                        await this.getAllHoldings()
                        this.close('action')
                        this.notify(message)
                  }
            },
            openForm(type, holding) {
                  this.action = { active: true, type: type, holding: holding }
            },
            close(el) {
                  this[el].active = false
            },
            notify(message) {
                  this.notification.text = message
                  this.notification.active = true                  
            },
            setData (field, value) {
                  this[field] = value
            }
      }

}
</script>

<style>

</style>
