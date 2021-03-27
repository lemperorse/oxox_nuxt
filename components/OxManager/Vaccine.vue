<template>
<div>
    <!-- {{currentId}} -->
    <v-toolbar class="m-1" flat color="transparent">
        การทำวัคซีน
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" rounded color="primary">เพิ่ม</v-btn>
    </v-toolbar>
    <div>
        <div @click="(form = list) && (dialog = true)" v-for="list,index in lists" :key="index"> 
            <Core-Menu :name="convertDate(list.created_at)" icon="/syringe.png" text="ข้อมูลการทำวัคซีน"></Core-Menu>
        </div> 
    </div>
    <v-dialog v-model="dialog" fullscreen>
        <v-card>
            <v-card-title>
                <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}การทำวัคซีน</span>
                <v-spacer></v-spacer>
                <v-btn @click="(form = {}) && (dialog = false)" color="error" fab small>X</v-btn>
            </v-card-title>
            <v-card-text v-if="dialog">
                <form @submit.prevent="(form.id)?updateData():saveData()">

                    <v-text-field type="date" label="วัน/เดือน/ปีที่ทำ" v-model="form.date" />
                    <v-select :items="choices.maker" item-text="name" item-value="id" label="ผู้ทำ" v-model="form.maker" />

                    <v-text-field v-if="form.maker == 3" label="ผู้ทำ อื่นๆ" v-model="form.maker_ect" />

                    <v-select :items="choices.items" item-text="name" item-value="id" label="ชนิดวัคซีน" v-model="form.vaccine" />

                    <v-text-field v-if="form.vaccine == 4" label="ชนิดวัคซีนอื่นๆ" v-model="form.vaccine_ect" />

                    <v-text-field type="date" label="วัน/เดือน/ปีที่ผลิต" v-model="form.date_origin" />
                    <v-text-field type="date" label="วัน/เดือน/ปีที่หมดอายุ" v-model="form.date_expire" />

                    <v-btn class="w-full" type='submit' large color='success' rounded>บันทึก</v-btn>
                    <v-btn class="w-full mt-4" dark v-if="form.id" @click="removeData()" color='red' large rounded>ลบ</v-btn>
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
            maker: await Core.getHttp(tool + `/vaccinemaker/`),
            items: await Core.getHttp(tool + `/vaccines/`)
        }
        this.lists = await Core.getHttp(`${api}/vaccine/?ox=${this.currentId}`)
        this.response = true;

    }

    async saveData() {
        this.form.ox = this.currentId
        let store = await Core.postHttp(`${api}/vaccine/`, this.form)
        if (store.id) {
            alert("บันทึกข้อมูลสำเร็จแล้ว");
            await this.getEnv();
            this.form = {};
            this.dialog = false;
        }
    }
    async updateData() {
        this.form.ox = this.currentId
        let store = await Core.putHttp(`${api}/vaccine/${this.form.id}/`, this.form)
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
            await Core.deleteHttp(`${api}/vaccine/${this.form.id}/`)
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
