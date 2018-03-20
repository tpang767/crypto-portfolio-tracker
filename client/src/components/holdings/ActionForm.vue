<template>
      <v-dialog v-model="action.active" lazy max-width="400px">
            <v-card>
                  <v-card-title>
                        <span class="headline">{{action.title}}</span>
                  </v-card-title>
                  <v-card-text>
                        <v-container grid-list-md>
                              <v-layout wrap>
                                    <v-flex xs12>
                                          <slot name="form">
                                                <v-form>
                                                      <template v-if="this.action.type !== 'edit'">
                                                            <coin-drop-down @coinSelected="select" v-model="coin"></coin-drop-down>
                                                            <v-text-field label="Amount" v-model="amount" required></v-text-field>
                                                      </template>

                                                      <template v-else>
                                                            <v-text-field label="Name" disabled v-model="fullName"></v-text-field>
                                                            <v-text-field label="Amount" v-model="amount" required></v-text-field>
                                                      </template>
                                                </v-form>
                                          </slot>
                                    </v-flex>
                              </v-layout>
                        </v-container>
                  </v-card-text>
                  <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="saveAction">Save</v-btn>
                  </v-card-actions>
            </v-card>
      </v-dialog>
</template>

<script>
import CoinDropDown from '../shared/CoinDropDown'

export default {
      name: "ActionForm",
      components: { 
            CoinDropDown 
      },
      props: ['action'],
      data: () => ({
            coin: '',
            amount: null
      }),
      computed: {
            editMode() {
                  return this.action.type === 'edit'
            },
            editItem() {
                  return this.action.holding
            },
            fullName() {
                  const holding = this.action.holding
                  return `${holding.coinName}` + ' ' + `(${holding.symbol})` 
            }
      },
      methods: {
            select(selection) {
                  this.coin = selection
            },
            close() {
                  this.$emit('close', 'action')
            },
            saveAction () {
                  let payload;
                  if(this.editMode) {
                        this.$emit('saveAction', {
                              action:'edit',
                              fullName: this.fullName,
                              symbol: this.editItem.symbol,
                              holdingId: this.editItem._id,
                              amount: this.amount             
                        })
                  }

                  else {
                        this.$emit('saveAction', {
                              action:'add',
                              fullName: this.coin.fullName,
                              symbol: this.coin.symbol,
                              amount: this.amount             
                        })
                  }
                  
            }

      }
}
</script>

<style>

</style>
