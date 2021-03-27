<template>
<div>
    <v-container >
        <form @submit.prevent="saveData()">
            <v-text-field class="p-2" label="ชื่อโค" v-model="form.name" />
            <v-text-field dense class="p-2" label="เบอร์หู" v-model="form.ear_number" />
            <v-text-field dense class="p-2" label="หมายเลข NID" v-model="form.nid_number" />
            <v-text-field dense class="p-2" label="หมายเลขไมโครชิป" v-model="form.chip_number" />
            <v-text-field dense class="p-2" label="ระดับสายเลือด" v-model="form.blood" />

            <v-select dense class="p-2" :items="choices.gene" item-text="name" item-value="id" label="พันธุ์" v-model="form.gene" />

            <v-select dense class="p-2" :items="choices.gender" item-text="name" item-value="id" label="เพศ" v-model="form.gender" />
            <v-text-field dense class="p-2" label="เพศอื่นๆ" v-model="form.gender_ect" />

            <v-select dense class="p-2" :items="choices.origin" item-text="name" item-value="id" label="แหล่งที่มา" v-model="form.origin" />
            <v-select dense class="p-2" :items="choices.tooth" item-text="name" item-value="id" label="ฟัน" v-model="form.tooth" />

            <v-text-field dense class="p-2" type="date" label="วันเกิด" v-model="form.birth_date" />
            <v-text-field dense class="p-2" type="number" label="จำนวน(ซี่)" v-model="form.tooth_count" />
            <v-text-field dense class="p-2" type="number" label="อายุ" v-model="form.age_age" />
            <v-text-field dense class="p-2" type="number" label="เดือน" v-model="form.age_month" />
            <v-text-field dense class="p-2" label="อายุจากการทำนาย" v-model="form.age_predict" />

            <v-text-field dense class="p-2" type="date" label="วันที่เข้าขุน" v-model="form.fatten_date" />
            <v-text-field dense class="p-2" type="number" label="รอบอก (เซนติเมตร)" v-model="form.breast" />
            <v-text-field dense class="p-2" type="number" label="ความสูง (เซนติเมตร)" v-model="form.height" />
            <v-text-field dense class="p-2" type="number" label="ความยาวลำตัว (เซนติเมตร)" v-model="form.long" />
            <v-text-field dense class="p-2" type="number" label="น้ำหนักเข้าขุน (กิโลกรัม)" v-model="form.weight" />
            <v-text-field dense class="p-2" type="date" label="วัน/เดือน/ปีที่ซื้อ" v-model="form.buy_date" />
            <v-text-field dense class="p-2" type="number" label="ราคา" v-model="form.price" /> 
            <v-select dense class="p-2" :items="choices.bsc" item-text="name" item-value="id" label="ประเมินคะแนนสภาพร่างกาย (BCS)" v-model="form.bsc" />

            <v-btn class="w-full" large type='submit' rounded block   color='success'>บันทึก</v-btn>

            <v-btn text  rounded color="red" dark class="mt-4 w-full" @click="deleteData()" >ลบโคขุนนี้</v-btn>
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
@Component({

    components: {},
})
export default class Farm extends Vue {

    currentId: any = this.$route.params.id;
    form: any = {}
    choices: any = {}

    async getEnv() {

        this.choices = {
            gene: await Core.getHttp('/api/v1/tool/gene/'),
            gender: await Core.getHttp('/api/v1/tool/gender/'),
            tooth: await Core.getHttp('/api/v1/tool/tooth/'),
            origin: await Core.getHttp('/api/v1/tool/origin/'),
            bsc: await Core.getHttp('/api/v1/tool/bsc/'),
        }
    }

    async getOxen() {
        this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId}`)
    }

    async created() {
        await this.getEnv();
        await this.getOxen();
    }

    get user() {
        return Auth.user;
    }

    async saveData() {
        this.form.user = this.user.id
        let ox = await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, this.form) 
        if(ox.id){
            alert('บันทึกข้อมูลสำเร็จ')
              await this.getEnv();
              await this.getOxen();
        }
    }

     async deleteData(){
         let check = confirm('คุณแน่ใจใช่ไหม')
        if (check) {
            alert('ลบข้อมูลแล้ว');
            let data = await Core.deleteHttp(`/api/v1/ox/ox/${this.form.id}/`)
            await this.$router.go(-1)
        }
    }


}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
