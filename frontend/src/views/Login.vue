
<template>
  <v-layout column flex class="justify-center pb-4">
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
      :loading="loading"
      :disabled="loading"
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
      :loading="loading"
      :disabled="loading"
      @click:append-inner="visible_pass = !visible_pass"
      ></v-text-field>

      <br>

      <v-btn :loading="loading" block class="mb-8" color="amber-accent-3" size="large" variant="outlined" @click="login">Login</v-btn>
    
      <v-card-text class="text-center">
        <router-link to="/register">Not having account yet? Register<v-icon icon="mdi-chevron-right"></v-icon></router-link>        
      </v-card-text>
      
    </v-card>
    </div>

    <transition>
      <div v-if="alertShow">
      <v-alert 
        closable
        :text="alertText"
        v-model="alertShow"
        density="compact"
        :type="alertType ? 'success' : 'error'" 
        variant="tonal" 
        class="sm-2 alert_left"
        >
        </v-alert>
        </div>
      </transition>

  </v-layout> 
</template>


<script lang="ts">
import UserAuthentication from '@/services/UserAuthentication'
import { AxiosError } from 'axios'
export default{
  data() {
    return {
      username: '',
      password: '',
      visible_pass: false,
      alertText: '',
      alertShow: false,
      alertType: true,
      Interval: 0,
      loading: false,
    }
  },
  methods: {
      async login (){
        this.loading = true;
        try{
          const response = await UserAuthentication.methods.login({
          username: this.username,
          password: this.password,
          })
          this.alertText = "Logged in successfully"
          this.alertType = true;
          this.alertShow = true;
        }catch(error)
        {
          if (error instanceof AxiosError) {
            this.alertText = error.response?.data.error;
            this.alertType = false;
            this.alertShow = true;
            this.loading = false;
          }
        }
        finally
        {
          clearInterval(this.Interval);
          this.Interval = setInterval(() => {
          this.alertShow = false;
          }, 55000);
        }
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

.alert_left
{
  position: absolute;
  right: 0;
  bottom: 0;
  max-width: 30%;
}

.v-leave-active {
  transition: opacity 2s ease-out;
}

.v-enter-active {
  transition: opacity 0.5s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>