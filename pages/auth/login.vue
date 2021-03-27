<template>
  <div>
    <div class="h-screen flex justify-center items-center p-2">
      <v-card class="w-full md:w-1/2">
        <v-card-title>
          เข้าสู่ระบบ
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="login()">
            <v-text-field required v-model="form.username" outlined label="ชื่อผู้ใช้ หรือ เบอร์โทรศัพท์"></v-text-field>
            <v-text-field required v-model="form.password" type="password" outlined label="รหัสผ่าน"></v-text-field>
            <v-btn large color="success" class="w-full" type="submit">เข้าสู่ระบบ</v-btn>
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
</style>
