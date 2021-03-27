<template>
  <div>
    <form @submit.prevent="saveData()" v-if="response">



      <v-text-field disabled label="ชื่อผู้ใช้" v-model="form.username"  />
<!--      <v-text-field label="คำนำหน้า" v-model="form.prefix"  />-->
      <v-text-field label="ชื่อ" v-model="form.first_name"  />
      <v-text-field label="สกุล" v-model="form.last_name"  />
      <v-text-field label="email" v-model="form.email"  />

      <v-text-field type="datetime-local"  label="เข้าร่วมเมื่อ" v-model="form.date_joined"  />

      <v-select :items="['ชาย','หญิง']" label="gender" v-model="form.gender"  />

      <v-text-field label="รหัสบัตร" v-model="form.personal_id"  />
      <v-text-field label="tel" v-model="form.tel"  />
      <v-text-field label="name_farm" v-model="form.name_farm"  />
      <v-text-field label="address" v-model="form.address"  />
      <v-text-field label="swine" v-model="form.swine"  />


      <v-text-field label="location" v-model="form.location"  />
      <v-text-field required :readonly="(CityFrom)?true:false" solo v-model="CityFrom" @click="openCityDialog" label="จังหวัด อำเภอ ตำบล"></v-text-field>
      <v-text-field label="zipcode" v-model="form.zipcode"  />

      <v-select :items="groups" item-text="name" item-value="id" label="farm_group_id" v-model="form.farm_group"  />

      <v-btn type='submit' large color='success' >บันทึก</v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
import {City} from "@/vuexes/city";
@Component({

  components: { },
})
export default class Farm extends Vue {

  form:any = null
  groups:any = null
  response:boolean = false;



  async getEnv(){
    this.form = await Auth.getUser();
    await this.setCity();
    this.groups = await Core.getHttp(`/api/v1/tool/group/`)
  }




  async created() {
    await this.getEnv();
    this.response = true;
  }

  get user(){
    return Auth.user;
  }

  async saveData(){
    this.form.geo = City.currentGeo?.id
    this.form.province = City.currentProvince?.id
    this.form.amphur = City.currentAmphur?.id
    this.form.district = City.currentDistrict?.id
    let user = await Core.putHttp(`/api/v1/farmer/userprofile/${this.form.id}/`,this.form)
    if(user.id){
      await this.getEnv();
    }
  }

  async setCity() {
    City.currentGeo = await Core.getHttp(`/api/v1/location/geography/${this.form.geo}/`)
    City.currentProvince = await Core.getHttp(`/api/v1/location/province/${this.form.province}/`)
    City.currentAmphur = await Core.getHttp(`/api/v1/location/amphur/${this.form.amphur}/`)
    City.currentDistrict = await Core.getHttp(`/api/v1/location/district/${this.form.district}/`)
    await City.setShowName()
  }
  async openCityDialog(){
    City.dialogCityState = true
  }
  get CityFrom(){
    return City.showName
  }


}
</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}
</style>
