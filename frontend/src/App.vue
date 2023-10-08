<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

</script>
<template>
  <v-app>
    <v-container fluid>
    <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </v-container>
  </v-app>
</template>

<style>
#app {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.container
{
  margin-top: 80px;
}
.v-container
{
  padding: 0!important;
}
</style>
