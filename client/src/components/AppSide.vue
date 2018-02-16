<template>
      <v-navigation-drawer clipped fixed permanent app>
      <v-list dense v-for="navItem in navItems" :key="navItem.name">
        <v-list-tile :to="{path: navItem.path}">
          <v-list-tile-action>
            <v-icon>{{navItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{navItem.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
      name:"AppSide",
      data: () => ({
            i:0,
            navItems: [
                  {
                        icon: 'dashboard',
                        title: 'Home',
                        path: '/',
                        name: 'home'
                  },
                  {
                        icon: 'dashboard',
                        title: 'Dashboard',
                        path: '/dashboard',
                        name: 'dashboard'
                  }
            ]
      })
}
</script>

<style>

</style>
