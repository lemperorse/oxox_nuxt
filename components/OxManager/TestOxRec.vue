<template>
<div class="p-4">
    <h2 class="text-xl font-bold text-yellow-600">{{form.name}}</h2><br>
    <v-text-field dense outlined class="p-2" label="อายุ (ปี)" v-model="form.age_age"></v-text-field>
    <v-text-field dense outlined class="p-2" label="อายุ (เดือน)" v-model="form.age_month"></v-text-field>
    <v-text-field outlined dense class="p-2" type="number" label="น้ำหนักเข้าขุน (กิโลกรัม)" v-model="form.weight" />
    <v-select v-model="chooseKg" dense outlined :items=[0.4,0.6,0.8,1.0] label="ปริมาณอาหารที่ให้"></v-select>
    <v-btn class="w-full" @click="calculate()" color="success">คำนวณ</v-btn>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title primary-title>
                <h2 class="text-xl text-blue-400 font-bold">คำแนะนำ</h2>
            </v-card-title>
            <v-card-text v-if="dialog">
                <div class="p-4">

                    <v-text-field v-model="chooseKg" outlined  label="ปริมาณอาหารที่ให้"></v-text-field>
                    <v-text-field v-model="data.g" outlined  label="โปรตีน (%)" ></v-text-field> 
                    <v-text-field v-model="data.kg" outlined  label="พลังงาน (kcal/kg)"></v-text-field>
                    <v-text-field v-model="data.cal" outlined  label="แคลเซี่ยม (%)"></v-text-field>
                    <v-text-field v-model="data.fos" outlined  label="ฟอสฟอรัส (%)"></v-text-field>
                    

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
    }

    async calculate() {
        let rang = _.find(this.ranges, (data) => {
            return (this.form.weight >= data.weight) && (this.form.weight <= data.weight_max) && (data.kg == this.chooseKg)
        })
        this.data = rang;
        this.dialog = true;
        console.log(rang);
    }

    ranges: any = [{
            "weight": "150",
            "weight_max": "199",
            "kg": "0.4",
            "mcal": "4.17",
            "g": "428",
            "cal": "16",
            "fos": "9"
        },
        {
            "weight": "150",
            "weight_max": "199",
            "kg": "0.6",
            "mcal": "4.66",
            "g": "503",
            "cal": "21",
            "fos": "11"
        },
        {
            "weight": "150",
            "weight_max": "199",
            "kg": "0.8",
            "mcal": "5.17",
            "g": "575",
            "cal": "27",
            "fos": "12"
        },
        {
            "weight": "150",
            "weight_max": "199",
            "kg": "1",
            "mcal": "5.69",
            "g": "642",
            "cal": "32",
            "fos": "14"
        },
        {
            "weight": "200",
            "weight_max": "299",
            "kg": "0.4",
            "mcal": "5.18",
            "g": "482",
            "cal": "17",
            "fos": "10"
        },
        {
            "weight": "200",
            "weight_max": "299",
            "kg": "0.6",
            "mcal": "5.79",
            "g": "554",
            "cal": "21",
            "fos": "12"
        },
        {
            "weight": "200",
            "weight_max": "299",
            "kg": "0.8",
            "mcal": "6.42",
            "g": "621",
            "cal": "26",
            "fos": "13"
        },
        {
            "weight": "200",
            "weight_max": "299",
            "kg": "1",
            "mcal": "7.06",
            "g": "682",
            "cal": "31",
            "fos": "15"
        },
        {
            "weight": "300",
            "weight_max": "399",
            "kg": "0.4",
            "mcal": "7.02",
            "g": "580",
            "cal": "18",
            "fos": "13"
        },
        {
            "weight": "300",
            "weight_max": "399",
            "kg": "0.6",
            "mcal": "7.84",
            "g": "646",
            "cal": "22",
            "fos": "14"
        },
        {
            "weight": "300",
            "weight_max": "399",
            "kg": "0.8",
            "mcal": "8.69",
            "g": "704",
            "cal": "25",
            "fos": "15"
        },
        {
            "weight": "300",
            "weight_max": "399",
            "kg": "1",
            "mcal": "9.57",
            "g": "755",
            "cal": "29",
            "fos": "16"
        },
        {
            "weight": "400",
            "weight_max": "449",
            "kg": "0.4",
            "mcal": "8.71",
            "g": "668",
            "cal": "19",
            "fos": "16"
        },
        {
            "weight": "400",
            "weight_max": "449",
            "kg": "0.6",
            "mcal": "9.73",
            "g": "728",
            "cal": "22",
            "fos": "17"
        },
        {
            "weight": "400",
            "weight_max": "449",
            "kg": "0.8",
            "mcal": "10.79",
            "g": "780",
            "cal": "25",
            "fos": "17"
        },
        {
            "weight": "400",
            "weight_max": "449",
            "kg": "1",
            "mcal": "11.87",
            "g": "821",
            "cal": "27",
            "fos": "18"
        },
        {
            "weight": "450",
            "weight_max": "1000",
            "kg": "0.4",
            "mcal": "9.51",
            "g": "710",
            "cal": "20",
            "fos": "17"
        },
        {
            "weight": "450",
            "weight_max": "1000",
            "kg": "0.6",
            "mcal": "10.63",
            "g": "767",
            "cal": "22",
            "fos": "18"
        },
        {
            "weight": "450",
            "weight_max": "1000",
            "kg": "0.8",
            "mcal": "11.78",
            "g": "815",
            "cal": "24",
            "fos": "19"
        },
        {
            "weight": "450",
            "weight_max": "1000",
            "kg": "1",
            "mcal": "12.96",
            "g": "852",
            "cal": "26",
            "fos": "19"
        }
    ]

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
