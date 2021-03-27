<template>
<div>
    <v-toolbar flat>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
        <h2 class="ml-2 text-xl font-bold text-blue-400">รายการโคขุนที่จำหน่าย</h2>
        <!-- <v-spacer></v-spacer>
        <v-btn @click="$router.push('/ox/create')" rounded color="primary">สร้าง</v-btn> -->
    </v-toolbar>

    <div v-for="ox,index in oxen" :key="index"  @click="(form = ox)&& (dialog =true)">
        <Core-Menu icon="/017-cow.png" :name="ox.name" :text="convertDate(ox.updated_at)"></Core-Menu>
    </div>

    <v-bottom-sheet v-model="dialog">
        <v-sheet class="text-center" height="250px">
            <v-btn large class="mt-6" text color="primary" >
                <span class="text-xl font-bold">การจัดการ</span>
            </v-btn>
            <div class="py-3 flex flex-col w-full p-4">
                 <v-btn color="primary" outlined rounded  class="m-2" @click="$router.replace( {name:'ox-sell',params: {id: form.id}} )"  >ดูข้อมูลโค</v-btn>
                 <v-btn color="red" outlined rounded class="m-2" @click="updateData()"  >ยกเลิกการจำหน่าย</v-btn>
                 <v-btn color="red" dark rounded class="m-2" @click="deleteData()" >ลบโคขุนนี้</v-btn>
            </div>
        </v-sheet>
    </v-bottom-sheet>

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
import { Web } from '@/vuexes/web'
@Component({

    components: {},
})
export default class Farm extends Vue {

    oxen: any = null
    form:any = {}
    dialog:boolean = false
     

    async getOxen() {
        this.oxen = await Core.getHttp(`/api/v1/ox/ox/?&status=ขาย&user=${Auth.user.id}`)
    }

    async updateData() {
        let check = confirm('คุณแน่ใจใช่ไหม')
        if (check) {
            alert('บันทึกข้อมูลสำเร็จ')
            let data = await Core.putHttp(`/api/v1/ox/ox/${this.form.id}/`, { "status": "อยู่ในฟาร์ม" })
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

    async created() {
        await this.getOxen();
    }

    get user() {
        return Auth.user;
    }

    convertDate(date: any) {
        return Web.convertDate(date);
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
