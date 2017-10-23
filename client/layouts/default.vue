<template>
  <v-app light>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" color="primary"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-show="false"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import mainMenu from '@/components/main-menu.vue';
import { mapActions, mapState } from 'vuex'; // eslint-disable-line import/no-extraneous-dependencies

export default {
  name: 'default-layout',

  components: { mainMenu },

  computed: {
    ...mapState('auth', ['user']),
  },

  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      logout: 'auth/logout',
    }),
  },

  async created() {
    try {
      if (this.user) await this.authenticate();
    } catch (e) {
      this.logout();
      throw e;
    }
  },
  data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [
          { to: '/', title: 'Dashboard', icon: 'dashboard' }
        ],
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: 'Linda'
      }
    }
};
</script>

<style>
main {
  box-sizing: border-box;
  padding: 1rem 2rem;
}
</style>
