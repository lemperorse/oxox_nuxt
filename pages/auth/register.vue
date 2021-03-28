<template>
  <div class="h-screen flex justify-center items-center p-2">
      <v-card class="w-full md:w-1/2">
        <v-card-title>
          ลงทะเบียนเข้าใช้งาน
        </v-card-title>
        <v-card-text>
             <div v-if="errorReg">
                        <div v-if="errorReg.username">
                            <v-alert dense v-for="err,index in errorReg.username" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
                        <div v-if="errorReg.email">
                            <v-alert dense v-for="err,index in errorReg.email" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
                        <div v-if="errorReg.password">
                            <v-alert dense v-for="err,index in errorReg.password" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
                        <div v-if="errorReg.password_confirm">
                            <v-alert dense v-for="err,index in errorReg.password_confirm" :key="index" type="error">
                                {{err}}
                            </v-alert>
                        </div>
             </div>
          <form @submit.prevent="registerData()">
            <v-checkbox v-model="useTel" label="ใช้เบอร์โทรศัพท์ลงทะเบียน"></v-checkbox>
            <v-text-field type="number" required v-model="formReg.tel" outlined label="เบอร์โทรศัพท์"></v-text-field>
            <v-text-field v-if="!useTel" required v-model="formReg.username" outlined label="ชื่อผู้ใช้"></v-text-field>
             <v-text-field type="password" required v-model="formReg.password" outlined label="รหัสผ่าน"></v-text-field>
              <v-text-field type="password" required v-model="formReg.password_confirm" outlined label="ยืนยันรหัสผ่าน"></v-text-field>
            <v-text-field required v-model="formReg.personal_id" type="number" outlined label="เลขบัตรประจำตัวประชาชน"></v-text-field>
            
            <v-btn v-if="formReg.password == formReg.password_confirm && formReg.password != ''" large color="success" class="w-full" type="submit">สมัครสมาชิก</v-btn>
          </form>
        </v-card-text>

      </v-card>



  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import {Auth} from '@/vuexes/auth'
  import {Core} from '@/vuexes/core' 
declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		layout?: string
	}
}

@Component({
  
	layout: 'root', 
 
})
export default class Root extends Vue {
errorReg: any = null
    useTel:boolean = true
    formReg:any = {}
     async registerData(){
        if(this.useTel){
            this.formReg.username = this.formReg.tel
        }
      let user = await Core.postHttp(`/accounts/register/`,this.formReg)
      if(user.id){
          alert('สมัครสมาชิกสำเร็จแล้ว');
          await this.$router.replace('/auth/login')
      }else{
            alert('ไม่สามารถสมัครสมาชิกได้ กรุณาตรวจสอบข้อมูลการสมัครให้ถูกต้อง')
            this.errorReg = user
      }
      
    }

}
</script>

<style  >

</style>
