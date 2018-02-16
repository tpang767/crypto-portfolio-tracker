<template>
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
</template>

<script>
export default {
      name: 'MessageDialog'
}
</script>

<style>

</style>
