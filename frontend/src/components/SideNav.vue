<template>
      <v-navigation-drawer permanent fixed clipped app>
            <v-layout row>
                  <v-flex xs12>
                        <v-card>
                              <v-toolbar>
                                    <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
                                    <v-toolbar-title></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                          <!--<v-icon>search</v-icon>-->
                                    </v-btn>
                              </v-toolbar>
                              <v-subheader>Navigate</v-subheader>
                              <v-list dense>
                                    <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
                                          <v-list-tile-action>
                                                <!--<v-icon v-if="item.icon">star</v-icon>-->
                                          </v-list-tile-action>
                                          <v-list-tile-content>
                                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                          </v-list-tile-content>
                                    </v-list-tile>
                              </v-list>
                        </v-card>
                  </v-flex>
            </v-layout>
            <v-divider></v-divider>

            <v-layout row>
                  <v-flex xs12>
                        <v-card>
                              <v-subheader>Actions</v-subheader>
                              <v-list dense>
                                    <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
                                          <v-list-tile-action>
                                                <!--<v-icon v-if="item.icon">star</v-icon>-->
                                          </v-list-tile-action>
                                          <v-list-tile-content>
                                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                          </v-list-tile-content>
                                    </v-list-tile>
                              </v-list>
                              <v-divider></v-divider>
                        </v-card>
                  </v-flex>
            </v-layout>
      </v-navigation-drawer>
</template>

<script>
export default {
      name: "SideNav",
      data () {
            return {
                  items: [
                        { title: 'Account', avatar: '/static/doc-images/lists/2.jpg' },
                        { icon: true, title: 'Portfolio', avatar: '/static/doc-images/lists/1.jpg' },
                        { title: 'Add Holding', avatar: '/static/doc-images/lists/3.jpg' }
                        // { title: 'Cindy Baker', avatar: '/static/doc-images/lists/4.jpg' },
                  ]
            }
      }
}
</script>

<style>

</style>
