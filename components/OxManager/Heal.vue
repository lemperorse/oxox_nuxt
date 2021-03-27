<template>
  <div>
    {{currentId}}
    <v-toolbar flat color="transparent">การทำวัคซีน <v-spacer></v-spacer> <v-btn @click="dialog=true">เพิ่ม</v-btn></v-toolbar>


    <div>
      <div @click="(form = list) && (dialog = true)" v-for="list,index in lists" :key="index" >
        <Core-Menu    :name="list.data" ></Core-Menu>
      </div>

    </div>

    <v-dialog v-model="dialog" fullscreen>
      <v-card>
        <v-card-title>
          <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}การทำวัคซีน</span>
          <v-spacer></v-spacer> <v-btn @click="(form = {}) && (dialog = false)">X</v-btn>
        </v-card-title>
        <v-card-text v-if="dialog">
          <form @submit.prevent="(form.id)?updateData():saveData()">

            <v-text-field type="date" label="date_check" v-model="form.date_check"  />
            <v-text-field label="data" v-model="form.data"  />
            <v-select :items="choices.group" item-text="name" item-value="id" label="group_id" v-model="form.group"  />
            <v-text-field v-if="form.group==7" label="group_ect" v-model="form.group_ect"  />

            <v-select :items="choices.disease" item-text="name" item-value="id" label="disease_id" v-model="form.disease"  />
            <v-text-field v-if="form.disease==4"  label="disease_ect" v-model="form.disease_ect"  />


            <v-text-field type="date"  label="date_do" v-model="form.date_do"  />

            <v-select :items="choices.maker" item-text="name" item-value="id" label="maker" v-model="form.maker"  />
            <v-text-field v-if="form.maker==4" label="maker_ect" v-model="form.maker_ect"  />

            <v-text-field label="medicine" v-model="form.medicine"  />

            <v-select :items="choices.result" item-text="name" item-value="id" label="result_id" v-model="form.result"  />
            <v-text-field  v-if="form.result==4" label="result_ect" v-model="form.result_ect"  />






            <v-btn type='submit' large color='success' >บันทึก</v-btn>

            <v-btn class="w-full mt-4" dark  v-if="form.id" @click="removeData()" color='red' >ลบ</v-btn>
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
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
const api = '/api/v1/ox_manager'
const tool = '/api/v1/tool'
@Component({

  components: { },
})

export default class Food extends Vue {

  currentId:any = this.$route.params.id;
  response:boolean = true;
  dialog:boolean = false;
  lists:any = null;
  form:any = {}
  choices:any = {}




  async getEnv(){

    this.choices = {
      maker: await Core.getHttp(tool+`/healmaker/`),
      disease: await Core.getHttp(tool+`/healdisease/`),
      group:await Core.getHttp(tool+`/healgroup/`),
      result:await Core.getHttp(tool+`/healresult/`),


    }
    this.lists = await Core.getHttp(`${api}/heal/?ox=${this.currentId}`)
    this.response = true;

  }

  async saveData(){
    this.form.ox = this.currentId
    let store = await Core.postHttp(`${api}/heal/`,this.form)
    if(store.id){
      alert("บันทึกข้อมูลสำเร็จแล้ว");
      await this.getEnv();
      this.form = {};
      this.dialog = false;
    }
  }
  async updateData(){
    this.form.ox = this.currentId
    let store = await Core.putHttp(`${api}/heal/${this.form.id}/`,this.form)
    if(store.id){
      alert("บันทึกข้อมูลสำเร็จแล้ว");
      await this.getEnv();
      this.form = {};
      this.dialog = false;
    }
  }

  async removeData(){
    let check = confirm('คุณแน่ใจฝช่ไหม')
    if(check){
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





}
</script>


