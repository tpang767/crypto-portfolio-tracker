<template>
  <v-layout row>
    <v-flex xs4>
        <h3 class="text-xs-center" >{{stat.field}}</h3>
    </v-flex>
    <v-flex xs8>
       <h1 class="text-xs-center">{{ stat.prefix }}{{stat.value}}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "StatSummary",
  props: ['stat']
}
</script>
<style scoped>

</style>