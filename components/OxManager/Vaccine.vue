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
            <Core-Menu :name="convertDate(list.date)" icon="syringe.png" text="ข้อมูลการทำวัคซีน"></Core-Menu>
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

                    <v-text-field @change="getNotificate()" type="date" label="วัน/เดือน/ปีที่ทำ"  v-model="form.date" prepend-inner-icon="mdi-calendar" />
                  <v-text-field  disabled type="date" label="วัน/เดือน/ปีที่ครบกำหนด"  v-model="form.date_notificate" prepend-inner-icon="mdi-calendar" />
                    <v-select :items="choices.maker" item-text="name" item-value="id" label="ผู้ทำ" v-model="form.maker" prepend-inner-icon="mdi-human-male" />

                    <v-text-field v-if="form.maker == 3" label="ผู้ทำ อื่นๆ" v-model="form.maker_ect" prepend-inner-icon="mdi-human-male-female" />

                    <v-select @change="getNotificate()" :items="choices.items" item-text="name" item-value="id" label="ชนิดวัคซีน" v-model="form.vaccine" prepend-inner-icon="mdi-needle" />

                    <v-text-field v-if="form.vaccine == 4" label="ชนิดวัคซีนอื่นๆ" v-model="form.vaccine_ect" prepend-inner-icon="mdi-needle" />

                    <v-text-field type="date" label="วัน/เดือน/ปีที่ผลิต" v-model="form.date_origin" prepend-inner-icon="mdi-calendar-check-outline" />
                    <v-text-field type="date" label="วัน/เดือน/ปีที่หมดอายุ" v-model="form.date_expire" prepend-inner-icon="mdi-calendar-clock" />

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
import moment from 'moment'
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

  async getNotificate(){
      this.dialog = false;
      if(this.form.vaccine && this.form.date){
        let vaccine = await _.find(this.choices.items,{id:this.form.vaccine})
        var date = new Date(this.form.date);
        date.setDate(date.getDate() + vaccine.count_date);
        this.form.date_notificate = moment(date).format(moment.HTML5_FMT.DATE);
      //  alert(this.form.date_notificate);
      }
    this.dialog = true;
  }

}
</script>
