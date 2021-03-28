<template>
<div>
    <v-card-title class="m-1" primary-title>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
        <h2 class="ml-2 text-xl font-bold text-blue-400">การเงิน</h2>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = true" rounded color="primary">สร้าง</v-btn>
    </v-card-title>
    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}การจัดการการเงิน</span>
                <v-spacer></v-spacer>
                <v-btn @click="(form = {})&&(dialog=false)" color="error" fab small>x</v-btn>
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="(form.id)? updateData() : saveData()">
                    <v-text-field label="วันที่" type="date" v-model="form.date" prepend-inner-icon="mdi-calendar" />
                    <v-text-field label="ชื่อ" v-model="form.name" prepend-inner-icon="mdi-card-account-details-star-outline" />
                    <v-select :items="[
                        {'text': 'รายรับ' , value:true} ,
                        {'text': 'รายจ่าย' , value:false}   
                    ]" label="ประเภท รายรับ-รายจ่าย" item-text="text" item-value="value" v-model="form.type" prepend-inner-icon="mdi-calendar" />
                    <v-text-field label="จำนวนเงิน" type="number" v-model="form.value" prepend-inner-icon="mdi-calendar" />
                    <v-btn type='submit' block rounded large color='success'>บันทึก</v-btn>
                    <v-btn class="w-full mt-4" dark v-if="form.id" @click="removeData()" color='red' rounded large>ลบ</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-toolbar color="transparent" flat>
        <v-text-field class="pt-4 p-2" label="เลือกวันที่" type="date" v-model="date"></v-text-field>
        <v-btn class="p-1" @click="getEnv()" color="success" rounded>ค้นหา</v-btn>
    </v-toolbar>

    
    <div class="p-4">
        <v-row>
            <v-col>
                <div class="rounded-xl shadow-2xl border-b-4 border-green-500 p-4">
                    <span class="font-bold text-green-600">รายรับ : </span>
                    <v-spacer></v-spacer>
                    <span class="font-bold ">{{data.income}}</span>
                </div>
            </v-col>
            <v-col>
                <div class="rounded-xl shadow-2xl border-b-4 border-red-500 p-4">
                    <span class="font-bold text-red-600">รายจ่าย : </span>
                    <v-spacer></v-spacer>
                    <span class="font-bold">{{data.outcome}}</span>
                </div>
            </v-col>
            <v-col>
                <div class="rounded-xl shadow-2xl border-b-4 border-green-500 p-4">
                    <span class="font-bold text-purple-600">กำไร : </span>
                    <v-spacer></v-spacer>
                    <span class="font-bold">{{data.sum}}</span>
                </div>
            </v-col>
        </v-row>
    </div>
    <p class="p-4 font-bold text-xl">รายการรายรับรายจ่าย</p>
    <div v-if="response" @click="(form = list)&&(dialog=true)" v-for="list,i in lists" :key="i">
        <Core-Menu :name="list.date" :text="(list.type)? '+ รายรับ' : '- รายจ่าย' "
         :icon="(list.type)? '/money-bag (1).png' : '/payment-method.png'  "></Core-Menu>
    </div>
    <!-- <pre>{{data}}</pre> -->
    <!-- <pre>{{lists}}</pre> -->

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
import _ from 'lodash'
@Component({

    components: {},
})
export default class MyComponent extends Vue {
    lists: any = []
    dialog: boolean = false
    form: any = {}
    date: any = ''
    user: any = {}
    response: boolean = false;

    data: any = {};

    async getEnv() {
        this.response = false;
        this.lists = await Core.getHttp(`/api/v1/farmer/income/?user=${this.user.id}&date=${this.date}`)
        await this.generateData()
        this.response = true;
    }

    async generateData() {
        let income = _.sumBy(_.filter(this.lists, { type: true }), 'value')
        let outcome = _.sumBy(_.filter(this.lists, { type: false }), 'value')

        this.data = {
            'income': income,
            'outcome': outcome,
            'sum': income - outcome
        }

    }

    async created() {
        this.user = await Auth.getUser();
        await this.getEnv();
    }

    async saveData() {
        this.form.user = this.user.id
        let save = await Core.postHttp(`/api/v1/farmer/income/`, this.form)
        if (save.id) {
            alert('บันทึกข้อมูลสำเร็จแล้ว')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async updateData() {
        let save = await Core.putHttp(`/api/v1/farmer/income/${this.form.id}/`, this.form)
        if (save.id) {
            alert('บันทึกข้อมูลสำเร็จแล้ว')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async removeData() {
        let check = confirm('คุณแน่ใจใช่ไหม?')
        if (check) {
            await Core.deleteHttp(`/api/v1/farmer/income/${this.form.id}/`)
            alert('success')
            await this.getEnv();
            this.dialog = false;
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
