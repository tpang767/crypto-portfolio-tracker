<template>
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
      <v-card>
            <v-card-title>
                  <h4>{{ title }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense v-for="stat in stats" :key="stat.field">
                  <v-list-tile>
                        <v-list-tile-content>{{stat.label}}</v-list-tile-content>
                        <v-list-tile-content class="align-end">{{ stat.value }}</v-list-tile-content>
                  </v-list-tile>
            </v-list>
      </v-card>
      </v-flex>
</template>
<script>
export default {
      name: 'StatList',
      props: ['title','stats'] 
}
</script>

<style>

</style>
