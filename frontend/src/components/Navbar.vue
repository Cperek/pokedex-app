<script lang="ts">
import { store } from '@/store/store';
import IconLogo from './icons/IconLogo.vue'
export default
{
  data() {
    return {
      store: store
    }
    },
    components:{
      IconLogo
    },
    methods: {
      logout() {
      if(this.$route.name !== 'login')
      {
        store.dispatch('setToken',null).then(() => {
          store.dispatch('setUser', null).then(() => {
              this.$router.push({
              name: 'login'
            });  
          });
        });

      }
    },
  }
}

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


      <v-chip
      class="ma-2"
      color="light-blue-darken-3"
      variant="outlined"
      v-if="store.state.userLoggedIn" 
      >
      {{ store.state.user.username }}
      <v-icon end icon="mdi-account-outline"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>        
              Log out
              <v-icon end >mdi-export</v-icon>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-chip>

      <v-chip
      class="ma-2"
      to="/login"
      color="light-blue-darken-3"
      variant="outlined"
      v-if="!store.state.userLoggedIn" 
      >
      Sign in
      </v-chip>
      
    </v-toolbar>
    </div>
</template>

<style scoped>
    .logo{
        font-size:155px;
        margin-left: 1rem;
    }

    .v-chip.v-chip--size-default
    {
      padding: 0 25px;
    }

</style>