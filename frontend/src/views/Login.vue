
<template>
  <v-layout column flex class="justify-center pb-4">
  <v-flex sm-6 offset-sm-3>
  <div class="Login" >
    
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="650"
      rounded="lg"
    >
      <v-card-title class="h1 mb-3">Sign In</v-card-title>

      <v-text-field 
      class="mb-3"
      v-model="username" 
      type="input"  
      clearable 
      label="Username" 
      variant="underlined"
      density="compact"
      hint="Set your username to log in with"
      prepend-inner-icon="mdi-account"
      >
      </v-text-field>

      <v-text-field 
      class="mb-3"
      label="Password" 
      v-model="password"  
      clearable 
      prepend-inner-icon="mdi-lock-outline"
      hint="Set your password to log in with"
      :append-inner-icon="visible_pass ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible_pass ? 'text' : 'password'"
      density="compact"
      variant="underlined"
      @click:append-inner="visible_pass = !visible_pass"
      ></v-text-field>

      <br>

      <v-btn block class="mb-8" color="amber-accent-3" size="large" variant="outlined" @click="login">Login</v-btn>
    
      <v-card-text class="text-center">
        <router-link to="/register">Not having account yet? Register<v-icon icon="mdi-chevron-right"></v-icon></router-link>        
      </v-card-text>
      
    </v-card>
    </div>
    </v-flex>
  </v-layout> 
</template>


<script lang="ts">
import UserAuthentication from '@/services/UserAuthentication'
export default{
  data() {
    return {
      username: '',
      password: '',
      visible_pass: false,
    }
  },
  methods: {
    async login (){
    const response = await UserAuthentication.methods.login({
        username: this.username,
        password: this.password,
    })
    console.log(response.data);
    }
  }
}
</script>

<style scoped>
.h1{
  width: 270px!important;
  font-size: 28px!important;
  text-align: left;
  padding-left: 1.2rem;
  border-left: 6px solid rgb(255, 196, 0);
  border-radius: 2px;
  margin-bottom: 2rem!important;
}
</style>