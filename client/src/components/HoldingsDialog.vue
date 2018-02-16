<template>
      <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Holding</v-btn>

            <v-card>
                  <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                        <v-container grid-list-md>
                              <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                          <v-select v-model="editedItem.coinName" :items="coinList" overflow :label="" :value="editedItem.coinName">
                                          </v-select>
                                          <v-text-field label="Name"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                          <v-text-field label="Amount" v-model="editedItem.amount"></v-text-field>
                                    </v-flex>
                              </v-layout>
                        </v-container>
                  </v-card-text>
                  <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                  </v-card-actions>
            </v-card>
      </v-dialog>
</template>

<script>

export default {
      name: 'HoldingsDialog',
      props: ['holding', 'mode'],
      data: () => ({
            coinList: []
      }),
      created () {
            this.initalize()
      },
      computed: {
            formTitle: () => {
                  return this.mode === 'edit' ? 'Edit Holding' : "New Holding"
            }
      },

      methods: {
            initalize () {
                  const coinList = await DataService.getCoinList()
                  this.setCoinList(coinList)
            },
            setCoinList (coinList) {
                  this.coinList = coinList
            }
      }
}
</script>

<style>

</style>

