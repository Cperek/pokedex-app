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

      <span
      id="username"
      v-if="store.state.userLoggedIn" 
      v-text="store.state.user.username"
      ></span>
      <v-btn @click="logout" v-if="store.state.userLoggedIn" icon>
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

    #username
    {
      color: #3D7DCA;
      font-size: 18px;
    }

</style>