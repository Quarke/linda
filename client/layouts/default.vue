<template>
  <v-app
    id="inspire"
  >
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" :to="item.to">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="green" dense fixed clipped-left app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <nuxt/>
        </v-layout>
      </v-container>
    </v-content>

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
          { to: '/', title: 'Dashboard', icon: 'dashboard' },
          { to: '/schedule', title: 'Schedule Maker', icon: 'class'}
        ],
        miniVariant: true,
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
