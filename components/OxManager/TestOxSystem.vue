<template>
<div class="p-4">
    <h2 class="text-xl font-bold text-yellow-600">{{form.name}}</h2><br>
    <form @submit.prevent="calculate()" >
   <v-text-field @change="calDate()" required type="date" dense outlined class="p-2" label="วัน/เดือน/ปี" v-model="form.fatten_date"></v-text-field>
    <v-text-field required type="number" dense outlined class="p-2" label="จำนวนวัน" v-model="form.count"></v-text-field>
    <v-text-field required type="number" outlined dense class="p-2"  label="น้ำหนักเริ่มขุน (กิโลกรัม)" v-model="form.weight" />
    <v-text-field required type="number" outlined dense class="p-2"   label="น้ำหนักสิ้นสุดการขุน (กิโลกรัม)" v-model="form.weight_end" />
    <v-text-field required type="number" outlined dense class="p-2"  label="ปริมาณอาหารทั้งหมดที่ใช้เลี้ยง (กิโลกรัม)" v-model="form.food" />  
    <v-btn class="w-full"  type="submit" color="success">คำนวณ</v-btn>
    </form>
 
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title primary-title>
                <h2 class="text-xl text-blue-400 font-bold">คำนวณประสิทธิภาพการผลิต</h2>
            </v-card-title>
            <v-card-text v-if="dialog">
                <div class="p-4"> 
                    <v-text-field v-model="data.ADG" outlined  label="การเจริญเติบโตเฉลี่ยต่อวัน (ADG)"></v-text-field>
                    <v-text-field v-model="data.FCR" outlined  label="การเปลี่ยนอาหารเป็นเนื้อ (FCR)" ></v-text-field> 
                    <v-text-field v-model="data.FI" outlined  label="อัตราการกินได้ต่อวัน (FI)"></v-text-field> 
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
    async created() {
        this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId}`)
        await this.calDate();
    }


   async calDate(){
         var a = moment( );
        var b = moment(this.form.fatten_date ); 
        var diffInDays = a.diff(b, 'days'); // 1 day
        this.form.count = diffInDays 
    }

    async calculate() {
        
        this.data = {
            ADG : ((this.form.weight_end - this.form.weight) / this.form.count).toFixed(2),
            FCR : (this.form.food / (this.form.weight_end - this.form.weight) ).toFixed(2),
            FI : (this.form.food / (this.form.count) ).toFixed(2),
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
