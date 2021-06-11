<template>
<div>
    <!-- {{currentId}} -->
    <v-toolbar class="m-1" flat color="transparent">
        การจำหน่าย
        <v-spacer></v-spacer>
        <v-btn v-if="lists.length < 1" @click="dialog=true" rounded color="primary">เพิ่ม</v-btn>
    </v-toolbar>

    <div>
        <div @click="(form = list) && (dialog = true)" v-for="list,index in lists" :key="index">
            <Core-Menu :name="convertDate(list.created_at)" icon="money-bag (1).png" text="ประวัติการจำหน่าย"></Core-Menu>
        </div>
    </div>

    <v-dialog v-model="dialog" fullscreen>
        <v-card>
            <v-card-title>
                <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}การจำหน่าย</span>
                <v-spacer></v-spacer>
                <v-btn @click="(form = {}) && (dialog = false)" small fab color="error">X</v-btn>
            </v-card-title>
            <v-card-text v-if="dialog">
                <form @submit.prevent="(form.id)?updateData():saveData()">

                    <v-text-field type="date" label="วัน/เดือน/ปีที่จำหน่าย" v-model="form.date" prepend-inner-icon="mdi-calendar" />
                    <v-text-field type="number" label="สรุปจำนวนวันที่เลี้ยง" v-model="form.date_count" prepend-inner-icon="mdi-calendar-edit" />
                    <v-text-field type="number" label="น้ำหนักที่จำหน่าย (กิโลกรัม)" v-model="form.weight" prepend-inner-icon="mdi-scale" />

                    <v-select :items="choices.sell_to" item-text="name" item-value="id" label="ช่องทางการจำหน่าย" v-model="form.sell_to" prepend-inner-icon="mdi-shopping" />
                    <v-text-field v-if="form.sell_to == 4" label="ช่องทางการจำหน่ายอื่นๆ" v-model="form.sell_to_ect" prepend-inner-icon="mdi-shopping-search" />

                    <v-select :items="choices.sell_type" item-text="name" item-value="id" label="ลักษณะการจำหน่าย" v-model="form.sell_type" prepend-inner-icon="mdi-charity" />
                    <v-text-field v-if="form.sell_type == 3" label="ขายตามราคาน้ำหนักซาก" v-model="form.sell_type_ect_weight" prepend-inner-icon="mdi-scale-balance" />
                    <v-text-field v-if="form.sell_type == 3" label="เปอร์เซ็นต์เกรดซากระบุ" v-model="form.sell_type_ect_grade" prepend-inner-icon="mdi-sack-percent" />

                    <v-btn class="w-full" type='submit' rounded large color='success'>บันทึก</v-btn>
                    <v-btn class="w-full mt-4" dark v-if="form.id" @click="removeData()" color='red' rounded large>ลบ</v-btn>
                </form>
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
import _ from 'lodash'
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
import { Web } from '@/vuexes/web'
const api = '/api/v1/ox_manager'
const tool = '/api/v1/tool'
@Component({

    components: {},
})

export default class Food extends Vue {

    currentId: any = this.$route.params.id;
    response: boolean = true;
    dialog: boolean = false;
    lists: any = [];
    form: any = {}
    choices: any = {}

    async getEnv() {

        this.choices = {
            sell_to: await Core.getHttp(tool + `/sellto/`),
            sell_type: await Core.getHttp(tool + `/selltype/`)
        }
        this.lists = await Core.getHttp(`${api}/sell/?ox=${this.currentId}`)
        this.response = true;

    }

    async saveData() {
        this.form.ox = this.currentId
        let store = await Core.postHttp(`${api}/sell/`, this.form)
        if (store.id) {
            await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, { status: "ขาย" })
            alert("บันทึกข้อมูลสำเร็จแล้ว");
            await this.getEnv();
            this.form = {};
            this.dialog = false;
        }
    }
    async updateData() {
        this.form.ox = this.currentId
        let store = await Core.putHttp(`${api}/sell/${this.form.id}/`, this.form)
        if (store.id) {
            await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, { status: "ขาย" })
            alert("บันทึกข้อมูลสำเร็จแล้ว");
            await this.getEnv();
            this.form = {};
            this.dialog = false;
        }
    }

    async removeData() {
        let check = confirm('คุณแน่ใจใช่ไหม')
        if (check) {
            await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, { status: "" })
            await Core.deleteHttp(`${api}/sell/${this.form.id}/`)
            alert("ลบข้อมูลสำเร็จแล้ว");
            await this.getEnv();
            this.form = {};
            this.dialog = false;
        }
    }

    async created() {
        await this.getEnv();
    }

    convertDate(date:any){
        return Web.convertDate(date);
    }

}
</script>
