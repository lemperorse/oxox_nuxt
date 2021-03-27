<template>
<div>
    <!-- {{currentId}} -->
    <v-toolbar class="m-1" flat color="transparent">ประวัติการรักษา 
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" rounded color="primary">เพิ่ม</v-btn>
    </v-toolbar>
    <div>
        <div @click="(form = list) && (dialog = true)" v-for="list,index in lists" :key="index">
            <Core-Menu :name="convertDate(list.created_at)" icon="/medical-report.png" text="ประวัติการรักษา"></Core-Menu>
        </div>
    </div>
    <v-dialog v-model="dialog" fullscreen>
        <v-card>
            <v-card-title>
                <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}ประวัติการรักษา</span>
                <v-spacer></v-spacer>
                <v-btn @click="(form = {}) && (dialog = false)" small fab color="error">X</v-btn>
            </v-card-title>
            <v-card-text v-if="dialog">
                <form @submit.prevent="(form.id)?updateData():saveData()">

                    <v-text-field type="date" label="วัน/เดือน/ปีที่สังเกต" v-model="form.date_check" />
                    <v-text-field label="อาการเบื้องต้น" v-model="form.data" />
                    <v-select :items="choices.group" item-text="name" item-value="id" label="กลุ่มอาการ" v-model="form.group" />
                    <v-text-field v-if="form.group==7" label="กลุ่มอาการอื่นๆ" v-model="form.group_ect" />

                    <v-select :items="choices.disease" item-text="name" item-value="id" label="โรค" v-model="form.disease" />
                    <v-text-field v-if="form.disease==4" label="โรคอื่นๆ" v-model="form.disease_ect" />

                    <v-text-field type="date" label="วัน/เดือน/ปีที่รักษา" v-model="form.date_do" />

                    <v-select :items="choices.maker" item-text="name" item-value="id" label="ผู้รักษา" v-model="form.maker" />
                    <v-text-field v-if="form.maker==4" label="ผู้รักษาอื่นๆ" v-model="form.maker_ect" />

                    <v-text-field label="ยาที่รักษา" v-model="form.medicine" />

                    <v-select :items="choices.result" item-text="name" item-value="id" label="ผลการรักษา" v-model="form.result" />
                    <v-text-field v-if="form.result==4" label="ผลการรักษา อื่นๆ" v-model="form.result_ect" />

                    <v-btn type='submit' block rounded large color='success'>บันทึก</v-btn>

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
    lists: any = null;
    form: any = {}
    choices: any = {}

    async getEnv() {

        this.choices = {
            maker: await Core.getHttp(tool + `/healmaker/`),
            disease: await Core.getHttp(tool + `/healdisease/`),
            group: await Core.getHttp(tool + `/healgroup/`),
            result: await Core.getHttp(tool + `/healresult/`),

        }
        this.lists = await Core.getHttp(`${api}/heal/?ox=${this.currentId}`)
        this.response = true;

    }

    async saveData() {
        this.form.ox = this.currentId
        let store = await Core.postHttp(`${api}/heal/`, this.form)
        if (store.id) {
            alert("บันทึกข้อมูลสำเร็จแล้ว");
            await this.getEnv();
            this.form = {};
            this.dialog = false;
        }
    }
    async updateData() {
        this.form.ox = this.currentId
        let store = await Core.putHttp(`${api}/heal/${this.form.id}/`, this.form)
        if (store.id) {
            alert("บันทึกข้อมูลสำเร็จแล้ว");
            await this.getEnv();
            this.form = {};
            this.dialog = false;
        }
    }

    async removeData() {
        let check = confirm('คุณแน่ใจฝช่ไหม')
        if (check) {
            await Core.deleteHttp(`${api}/heal/${this.form.id}/`)
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
