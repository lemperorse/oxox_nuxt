<template>
<div class="p-4">
    <!-- <h2 class="text-xl font-bold text-yellow-600">{{form.name}}</h2><br> -->
    <form @submit.prevent="calculate()">
        <v-text-field @change="calDate()" required type="date" dense class="p-2" label="วัน/เดือน/ปี" v-model="form.fatten_date" prepend-inner-icon="mdi-calendar"></v-text-field>
        <v-text-field required type="number" dense class="p-2" label="จำนวนวัน" v-model="form.count" prepend-inner-icon="mdi-calendar-clock"></v-text-field>
        <v-text-field required type="number" dense class="p-2" label="น้ำหนักเริ่มขุน (กิโลกรัม)" v-model="form.weight" prepend-inner-icon="mdi-scale" />
        <v-text-field required type="number" dense class="p-2" label="น้ำหนักสิ้นสุดการขุน (กิโลกรัม)" v-model="form.weight_end" prepend-inner-icon="mdi-scale-balance" />
        <v-text-field required type="number" dense class="p-2" label="ปริมาณอาหารทั้งหมดที่ใช้เลี้ยง (กิโลกรัม)" v-model="form.food" prepend-inner-icon="mdi-food" />
        <v-text-field required type="number" dense class="p-2" label="ราคาอาหารต่อกิโลกรรม (บาท)" v-model="form.food_kg_price" prepend-inner-icon="mdi-food" />
        <v-btn class="w-full" rounded large type="submit" color="success">คำนวณ</v-btn>
    </form>

    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title primary-title>
                <p class="text-xl text-blue-400 font-bold mt-4">คำนวณประสิทธิภาพการผลิต</p>
                <v-spacer></v-spacer>
                <v-btn @click="(form = {})&&(dialog=false)" color="error" fab small>x</v-btn>
            </v-card-title>
            <v-card-text v-if="dialog">
                <div class="p-4">
                    <v-text-field v-model="data.ADG" label="การเจริญเติบโตเฉลี่ยต่อวัน (ADG)" prepend-inner-icon="mdi-pan-vertical"></v-text-field>
                    <v-text-field v-model="data.FCR" label="การเปลี่ยนอาหารเป็นเนื้อ (FCR)" prepend-inner-icon="mdi-food-drumstick-outline"></v-text-field>
                    <v-text-field v-model="data.FI" label="อัตราการกินได้ต่อวัน (FI)" prepend-inner-icon="mdi-rice"></v-text-field> 
                    <v-text-field v-model="data.FE" label="ประสิทธิภาพการใช้อาหาร (FE)" prepend-inner-icon="mdi-rice"></v-text-field> 
                    <v-text-field v-model="data.FCG" label="ต้นทุนการผลิตเนื้อ (FCG)" prepend-inner-icon="mdi-rice"></v-text-field> 
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
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
import moment from 'moment'
@Component({

    components: {},
})
export default class MyComponent extends Vue {

    text: string = 'hello world'
    currentId: any = this.$route.params.id;
    chooseKg: any = 0.4

    data: any = {}
    dialog: boolean = false;

    form: any = {}
    async getEnv() {
        this.currentId = this.$route.params.id;
        // this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId }`)
    }
    async getOxen() {
        this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId}/`)
    }
    async created() {
        // this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId}`)
        await this.getEnv();
        await this.getOxen();
        await this.calDate();
    }

    async calDate() {
        var a = moment();
        var b = moment(this.form.fatten_date);
        var diffInDays = a.diff(b, 'days'); // 1 day
        this.form.count = diffInDays
    }

    async calculate() {
        let ADG = ((this.form.weight_end - this.form.weight) / this.form.count)
        let FCR = (this.form.food / (this.form.weight_end - this.form.weight))
        let FI = (this.form.food / (this.form.count) ) 
        let FE =  FI/ADG
        let FCG = FCR * Number(this.form.food_kg_price) 

        this.data = {
            ADG: ADG.toFixed(2),
            FCR: FCR.toFixed(2),
            FI : FI.toFixed(2),
            FE : FE.toFixed(2),
            FCG : FCG.toFixed(2)
        }
        this.dialog = true;

    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
