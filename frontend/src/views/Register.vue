
<template>
  <div class="Register" >
    
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="650"
      rounded="lg"
    >
      <v-card-title class="h1 mb-3">Register</v-card-title>

      <v-text-field 
      class="mb-3"
      v-model="username" 
      type="input"  
      clearable 
      label="Username" 
      variant="underlined"
      density="compact"
      hint="Set your username to log in with"
      prepend-inner-icon="mdi-email-outline"
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
      <v-text-field 
      label="Re-Password" 
      v-model="repassword"  
      clearable 
      prepend-inner-icon="mdi-lock-outline"
      hint="Repeat your password for confirmation"
      :append-inner-icon="visible_repass ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible_repass ? 'text' : 'password'"
      density="compact"
      variant="underlined"
      @click:append-inner="visible_repass = !visible_repass"
      ></v-text-field>

      <br>

      <v-btn block class="mb-8" color="teal-darken-1" size="large" variant="tonal" @click="register">register</v-btn>
    
      <v-card-text class="text-center">
        <router-link to="/login">Log in <v-icon icon="mdi-chevron-right"></v-icon></router-link>        
      </v-card-text>
      
    </v-card>
  </div>
</template>


<script lang="ts">
import UserAuthentication from '@/services/UserAuthentication'
export default{
  data() {
    return {
      username: '',
      password: '',
      repassword: '',
      visible_pass: false,
      visible_repass: false,
    }
  },
  methods: {
    async register (){
    const response = await UserAuthentication.methods.register({
        username: this.username,
        password: this.password,
        repassword: this.repassword
    })
    console.log(response.data);
    }
  }
}
</script>

<style scoped>
.h1{
  width: 270px!important;
  font-size: 34px!important;
  text-align: center;
}
</style>