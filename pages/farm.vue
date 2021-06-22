<template>
<div>
    <v-toolbar flat>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
    </v-toolbar>
    <v-container grid-list-xs>
        <form @submit.prevent="saveData()" v-if="response">
            <v-text-field required dense class="p-2" disabled label="ชื่อผู้ใช้" v-model="form.username" prepend-inner-icon="mdi-face" />
            <!--      <v-text-field dense class="p-2" label="คำนำหน้า" v-model="form.prefix"  />-->
            <v-text-field required dense class="p-2" label="ชื่อ" v-model="form.first_name" prepend-inner-icon="mdi-card-account-details-outline" />
            <v-text-field required dense class="p-2" label="สกุล" v-model="form.last_name" prepend-inner-icon="mdi-card-account-details-outline" />

            <v-select required dense class="p-2" :items="['ชาย','หญิง']" label="เพศ" v-model="form.gender" prepend-inner-icon="mdi-gender-male-female" />

            <v-text-field required dense class="p-2" type="number" label="เลขบัตรประชาชน" v-model="form.personal_id" :rules="rulesIDcard" counter maxlength="13" prepend-inner-icon="mdi-card-account-details-star-outline" />
            <v-text-field required dense class="p-2" type="number" label="เบอร์โทรศัพท์" v-model="form.tel" :rules="rules" counter maxlength="10"  prepend-inner-icon="mdi-cellphone" />
            <v-text-field required dense class="p-2" label="ชื่อฟาร์ม" v-model="form.name_farm" prepend-inner-icon="mdi-barn" />
            <v-text-field required dense class="p-2" label="ที่อยู่" v-model="form.address" prepend-inner-icon="mdi-home" />
            <v-text-field required dense class="p-2" label="หมู่บ้าน" v-model="form.swine" prepend-inner-icon="mdi-home-group" />

            <v-text-field required dense class="p-2" label="พิกัด" v-model="form.location" prepend-inner-icon="mdi-google-maps" />
            <v-text-field required dense class="p-2" :readonly="(CityFrom)?true:false" v-model="CityFrom" @click="openCityDialog" label="จังหวัด อำเภอ ตำบล" prepend-inner-icon="mdi-map-search-outline"></v-text-field>
            <v-text-field required dense class="p-2" type="number" label="รหัสไปรษณีย์" v-model="form.zipcode" prepend-inner-icon="mdi-post-outline" />

            <v-select required dense class="p-2" :items="groups" item-text="name" item-value="id" label="กลุ่ม" v-model="form.farm_group" prepend-inner-icon="mdi-account-group" />

            <v-btn type='submit' rounded block large color='success'>บันทึก</v-btn>
        </form>
    </v-container>
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from "nuxt-property-decorator"
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
import { City } from "@/vuexes/city";
@Component({

    components: {},
})
export default class Farm extends Vue {

    form: any = null
    groups: any = null
    response: boolean = false;

    rules:any = [
        (v:string) => !!v || 'กรอกเบอร์โทรศัพท์มือถือ 10 หลัก',
        (v:string) => ( v && v.length >= 10 ) || 'กรุณากรอกเบอร์โทรศัพท์มือถือ 10 หลัก',
        (v:string) => ( v && v.length <= 10 ) || 'เบอร์โทรศัพท์มือถือเกิน 10 หลัก',
    ]

    rulesIDcard:any = [
        (v:string) => !!v || 'กรอกเลขบัตรประชาชน 13 หลัก',
        (v:string) => ( v && v.length >= 13 ) || 'กรุณากรอกเลขบัตรประชาชน 13 หลัก',
        (v:string) => ( v && v.length <= 13 ) || 'เลขบัตรประชาชนเกิน 13 หลัก',
    ] 

    async getEnv() {
        this.form = await Auth.getUser();
        await this.setCity();
        this.groups = await Core.getHttp(`/api/v1/tool/group/`)
    }

    async created() {
        await this.getEnv();
        this.response = true;
    }

    get user() {
        return Auth.user;
    }

    async saveData() {
        this.form.geo = City.currentGeo ?.id
        this.form.province = City.currentProvince ?.id
        this.form.amphur = City.currentAmphur ?.id
        this.form.district = City.currentDistrict ?.id
        let user = await Core.putHttp(`/api/v1/farmer/userprofile/${this.form.id}/`, this.form)
        if (user.id) {
            await this.getEnv();
            alert('บันทึกข้อมูลสำเร็จ')
        }
    }

    async setCity() {
        City.currentGeo = await Core.getHttp(`/api/v1/location/geography/${this.form.geo}/`)
        City.currentProvince = await Core.getHttp(`/api/v1/location/province/${this.form.province}/`)
        City.currentAmphur = await Core.getHttp(`/api/v1/location/amphur/${this.form.amphur}/`)
        City.currentDistrict = await Core.getHttp(`/api/v1/location/district/${this.form.district}/`)
        await City.setShowName()
    }
    async openCityDialog() {
        City.dialogCityState = true
    }
    get CityFrom() {
        return City.showName
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
