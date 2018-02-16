<template>
      <v-layout justify-center>
            <v-flex xs12>
                  <!--<v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                              <v-toolbar-title>Login form</v-toolbar-title>
                              <v-spacer></v-spacer>
                              <v-tooltip bottom>
                                    <v-btn icon large :href="source" target="_blank" slot="activator">
                                          <v-icon large>code</v-icon>
                                    </v-btn>
                                    <span>Source</span>
                              </v-tooltip>
                        </v-toolbar>
                        <v-card-text>
                              <v-form>
                                    <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                                    <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                              </v-form>
                        </v-card-text>
                        <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="primary">Login</v-btn>
                        </v-card-actions>
                  </v-card>-->
                  <HoldingList/>
            </v-flex>
      </v-layout>      
</template>

<script>
import HoldingList from '../components/HoldingList'
import {EventBus} from '../eventBus'
import DataService from '../service/portfolio'

export default {
      name: "DashBoardPage",
      components: {
            HoldingList
      },
      created() {
            // this.initialize()
      },
      methods: {
            // emitHoldings(holdings) {
            //       EventBus.$emit('holdings', holdings)
            // }
      }
}
</script>

<style>

</style>
