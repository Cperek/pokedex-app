<script setup lang="ts">
import { store } from '@/store/store';
import IconLogo from './icons/IconLogo.vue'

</script>

<template>
    <div>
        <v-toolbar
        :elevation="8"
        dark
        prominent
        fixed
        color="grey-lighten-5"
        >

      <v-icon class="logo">
        <IconLogo/>
      </v-icon>
      

      <v-spacer></v-spacer>

      <v-btn v-if="store.state.userLoggedIn" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>

      <v-btn to="/login" v-if="!store.state.userLoggedIn" size="large">
        Sign In
      </v-btn>
      
    </v-toolbar>
    </div>
</template>

<style scoped>
    .logo{
        font-size:155px;
        margin-left: 1rem;
    }
</style>