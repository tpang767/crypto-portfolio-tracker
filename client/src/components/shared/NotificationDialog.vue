<template>
      <v-dialog v-model="notification.active" lazy max-width="500px">
            <v-card>
                  <v-card-title>
                        <span class="headline">{{notification.text}}</span>
                  </v-card-title>
                  <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
                  </v-card-actions>
            </v-card>
      </v-dialog>
</template>

<script>
export default {
      name: 'NotificationDialog',
      props: ['notification'],
      methods: {
            close () {
                  this.$emit('close', 'notification')
            },
      }
}
</script>

<style>

</style>
