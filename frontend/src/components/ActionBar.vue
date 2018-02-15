<template>
    <v-layout row class="pt-4 pb-4 ">
    <v-flex xs4>
        <h3 class="text-xs-center pl-2" v-html="stat.field"></h3>
    </v-flex>
    <v-flex xs8>
      <h1 class="text-xs-center">{{ stat.prefix }}{{stat.value}}</h1>
    </v-flex>
  </v-layout>
</template>

<script>
export default {

}
</script>

<style>

</style>
