<template>
      <div>

            <v-dialog v-model="alertDialog.active" lazy max-width="500px">
                  <v-card>
                        <v-card-title>
                              <span class="headline">{{alertDialog.message}}</span>
                        </v-card-title>
                        <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" flat @click="exitMessage">Close</v-btn>
                        </v-card-actions>
                  </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" lazy max-width="400px">
                  <v-btn color="primary" dark slot="activator" class="mb-2" @click="getCoinList">New Holding</v-btn>
                  <v-card>
                        <v-card-title>
                              <span class="headline">New Holding</span>
                        </v-card-title>
                        <v-card-text>
                              <v-container grid-list-md>
                                    <v-layout wrap>
                                          <v-flex xs12>
                                                <v-form>
                                                      <v-select label="Select" :items="coinList" required v-model="coinSelection.symbol" item-text="fullName" item-value="symbol" :loading="coinListLoading">
                                                      </v-select>
                                                      <v-text-field label="Amount" v-model="coinSelection.amount" required></v-text-field>
                                                </v-form>
                                          </v-flex>
                                    </v-layout>
                              </v-container>
                        </v-card-text>
                        <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                              <v-btn color="blue darken-1" flat @click="addHolding">Save</v-btn>
                        </v-card-actions>
                  </v-card>
            </v-dialog>

            <v-dialog v-model="editDialog" lazy max-width="400px">
                  <v-card>
                        <v-card-title>
                              <span class="headline">Edit Holding</span>
                        </v-card-title>
                        <v-card-text>
                              <v-container grid-list-md>
                                    <v-layout wrap>
                                          <v-flex xs12>
                                                <v-form>
                                                      <v-text-field label="Name" v-model="coinSelection.symbol" required></v-text-field>
                                                      <v-text-field label="Amount" v-model="coinSelection.amount" required></v-text-field>
                                                </v-form>
                                          </v-flex>
                                    </v-layout>
                              </v-container>
                        </v-card-text>
                        <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                              <v-btn color="blue darken-1" flat @click="editHolding">Save</v-btn>
                        </v-card-actions>
                  </v-card>
            </v-dialog>

            <v-data-table :headers="headers" :items="holdings" hide-actions class="elevation-1">
                  <template slot="items" slot-scope="props">
                        <td>{{ props.item.coinName }}</td>
                        <td class="text-xs-right">{{ props.item.symbol }}</td>

                        <td class="text-xs-right">
                              <v-edit-dialog :return-value.sync="props.item.amount" large lazy persistent>
                                    <div>{{ props.item.amount }}</div>
                                    <div slot="input" class="mt-3 title">Update Amount</div>
                                    <v-text-field slot="input" label="Edit" v-model="props.item.amount" single-line counter autofocus></v-text-field>
                              </v-edit-dialog>
                        </td>
                        <td class="text-xs-right">{{ props.item.price }}</td>
                        <td class="text-xs-right">{{ props.item.marketValue }}</td>
                        <td class="justify-center layout px-0">
                              <v-btn icon class="mx-0" @click="editHolding(props.item)">
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
import { EventBus } from '../eventBus'
import PortfolioService from '../service/portfolio'
import HoldingsDialog from './HoldingsDialog'
const createMessage = (vals, message) => {
      return vals + ' ' + message
}
export default {
      name: "HoldingList",
      components: {
            HoldingsDialog
      },
      created () {
            this.initialize()
      },
      data: () => ({
            holdings: [],
            coinList: [],
            coinListLoading: false,
            coinSelection: {
                  symbol: '',
                  amount: ''
            },
            defaultSelection: {
                  symbol: '',
                  amount: ''
            },
            alertDialog: {
                  active: false,
                  message: 'Item Deleted'
            },
            dialog: false,
            headers: [
                  {
                        text: 'Name (Cryptocurrency)',
                        align: 'left',
                        value: 'coinName'
                  },
                  { text: 'Symbol', value: 'symbol' },
                  { text: 'Amount (holding)', value: 'amount' },
                  { text: 'Price (USD)', value: 'price' },
                  { text: 'MarketValue (USD)', value: 'marketValue' },
                  { text: 'Actions', value: 'name', sortable: false }
            ],
            editedIndex: -1

      }),
      methods: {
            async initialize () {
                  this.getAllHoldings()
            },
            async getCoinList () {
                  this.coinListLoading = true
                  const coinList = await PortfolioService.getCoinList()
                  this.setData('coinList', coinList)
                  this.coinListLoading = false
                  return
            },
            async getAllHoldings () {
                  const holdings = await PortfolioService.getHoldings()
                  console.log(holdings)
                  this.setData('holdings', holdings)
            },
            async addHolding () {
                  const holding = Object.assign({}, this.coinSelection)
                  const newHolding = await PortfolioService.addHolding(holding)

                  if (newHolding) {
                        await this.getAllHoldings()
                        this.close()
                        const message = createMessage(holding.symbol,'succesfully added')
                        this.showMessage(message)
                  }
            },
            async deleteHolding (item) {
                  const index = this.holdings.indexOf(item)
                  confirm('Are you sure you want to delete this item?')
                  const holding = Object.assign({}, {
                        symbol: item.symbol
                  })
                  const deleted = await PortfolioService.deleteHolding(holding)
                  
                  if (deleted) {
                        const message = createMessage(item.symbol,'succesfully deleted')
                        this.showMessage(message)
                        this.getAllHoldings()
                  }
            },
            async editHolding (editItem) {
                  const edit = Object.assign({}, {
                        symbol: editItem.symbol,
                        holdingId: editItem._id,
                        amount: editItem.amount
                  })
                  const holding = Object.assign({}, {
                        symbol: item.symbol
                  })
                  const coin = this.holdings[index]

                  const update = await PortfolioService.updateHolding(payload)
                  if(update) {
                        const message = createMessage(coin.symbol,`amount updated to: ${coin.amount}`)
                        this.showMessage(message)
                        this.getAllHoldings()                        
                  }
                  return coin.amount
            },
            editItem (item) {
                  Promise.resolve(this.getCoinSelection())
                  this.editedIndex = this.holdings.indexOf(item)
                  this.editedItem = Object.assign({}, {
                        coinName: item.coinName,
                        symbol: item.symbol
                  })
                  // this.editedItem.fullName = createMessage(`${item.coinName}` + ' ' + `(${item.symbol})`
                  this.dialog = true
            },
            showMessage(message) {
                  this.alertDialog.message = message
                  this.alertDialog.active = true
            },
            exitMessage() {
                  this.alertDialog.active = false
            },
            close () {
                  this.dialog = false
                  setTimeout(() => {
                        this.coinSelection = Object.assign({}, this.defaultSelection)
                        // this.editedIndex = -1
                  }, 300)
            },
            save () {
                  if (this.editedIndex > -1) {
                        Object.assign(this.holdings[this.editedIndex], this.editedItem)
                  } else {
                        this.holdings.push(this.editedItem)
                  }
                  this.close()
            },
            setData (field, value) {
                  this[field] = value
            }
      },
      computed: {

      },
      watch: {
            alertDialog (val) {
                  val.active || this.close()
            },
            dialog (val) {
                  val || this.close()
            }
      }
}
</script>

<style>

</style>
