<template>
  <!--<v-card-title>
      <h4>Portfolio</h4>
      <v-spacer></v-spacer>
      <v-btn icon >
      <v-icon dark>refresh</v-icon>
    </v-btn>
    </v-card-title>-->
      <v-data-table :headers="headers" disable-initial-sort="false" :loading="loading" bordered :items="items" hide-actions>
            <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ props.item.symbol }}</td>
                  <td class="text-xs-right">{{ props.item.coinName }}</td>
                  <td class="text-xs-right">{{ props.item.amount }}</td>
                  <td class="text-xs-right">{{ props.item.price }}</td>
                  <td class="text-xs-right">{{ props.item.marketValue }}</td>
            </template>
      </v-data-table>
</template>

<script>
export default {
      name: "Holdings",
      props: ['items', 'loading'],
      data () {
            return {
                  headers: [
                        { text: 'Symbol', class:"strong", value: 'symbol'},
                        { text: 'Name', value: 'coinName' },
                        { text: 'Amount', value: 'amount' },
                        { text: 'Price', value: 'price' },
                        { text: 'MarketValue', value: 'marketValue'}
                  ]
                
            }
      }

}
</script>
<style>
 .full-height .flex{
    display: flex;
 }

  .full-height .flex > .card{
    flex: 1 1 auto;
  }
</style>   