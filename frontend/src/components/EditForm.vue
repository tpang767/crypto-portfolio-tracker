<template>
      <v-card>
            <v-card-text>
                  <v-container fluid>
 <v-layout row>
                              <v-flex xs12>
                                    <v-btn block color="indigo" outline>Add Holding</v-btn>
                              </v-flex>
                        </v-layout>
                        <v-layout row>
                              <v-flex xs12>

                              </v-flex>
                        </v-layout>
                        <v-layout row>
                              <v-flex xs12>
                                    <v-form >
                                          <v-select v-bind:items="items" label="Select Coin" :item-value="items.fullName">{{items.fullName}}</v-select>
                                    </v-form>
                              </v-flex>
                        </v-layout>

                        <v-layout row>
                              <v-flex xs12>
                                    <v-form >
                                          <v-text-field name="input-2-3" label="Enter Amount" class="input-group--focused" single-line></v-text-field>
                                    </v-form>
                              </v-flex>
                        </v-layout>

                       
                  </v-container>
            </v-card-text>
      </v-card>
</template>

<script>
export default {
      name: "EditForm",
      props: ['items']
}
</script>

<style>

</style>
