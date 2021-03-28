<template>
  <div class="bg">
    <div class="h-screen flex justify-center items-center p-2">
      <v-card class="w-full md:w-1/2 rounded-xl elevation-8">
        <v-card-title>
          <p class="text-xl font-bold text-green-600">เข้าสู่ระบบ</p>
          <br>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="login()">
            <v-text-field required v-model="form.username" filled label="ชื่อผู้ใช้ หรือ เบอร์โทรศัพท์" rounded></v-text-field>
            <v-text-field required v-model="form.password" type="password" filled label="รหัสผ่าน" rounded></v-text-field>
            <v-btn large color="success" class="w-full" type="submit" rounded>เข้าสู่ระบบ</v-btn>
            <br><br>
            <v-btn text   @click="$router.push('/auth/register')" large   color="primary" class="w-full font-bold"  >สมัครสมาชิก</v-btn>
          </form>
        </v-card-text>

      </v-card>
    </div>
  </div>
</template>

<script  >
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'

export default {
  layout: 'root',
  data: () => ({
    form:{}
  }),
  methods: {
    async login(){
      let user = await Auth.login(this.form);
    }
  }
}


</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}

.bg{
  background-image: url("https://images.pexels.com/photos/5867858/pexels-photo-5867858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
