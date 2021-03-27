<template>
  <div>
    {{currentId}}
    <v-toolbar flat color="transparent">การทำวัคซีน <v-spacer></v-spacer> <v-btn v-if="lists.length < 1" @click="dialog=true">เพิ่ม</v-btn></v-toolbar>


    <div>
      <div @click="(form = list) && (dialog = true)" v-for="list,index in lists" :key="index" >
        <Core-Menu    :name="list.date" ></Core-Menu>
      </div>

    </div>

    <v-dialog v-model="dialog" fullscreen>
      <v-card>
        <v-card-title>
          <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}การทำวัคซีน</span>
          <v-spacer></v-spacer> <v-btn @click="(form = {}) && (dialog = false)">X</v-btn>
        </v-card-title>
        <v-card-text v-if="dialog">
          <form @submit.prevent="(form.id)?updateData():saveData()" >

              <v-text-field type="date" label="date" v-model="form.date"  />
              <v-text-field type="number"  label="date_count" v-model="form.date_count"  />
              <v-text-field type="number" label="weight" v-model="form.weight"  />

              <v-select :items="choices.sell_to" item-text="name" item-value="id" label="sell_to_id" v-model="form.sell_to"  />
              <v-text-field v-if="form.sell_to == 4" label="sell_to_ect" v-model="form.sell_to_ect"  />

              <v-select :items="choices.sell_type" item-text="name" item-value="id" label="sell_type_id" v-model="form.sell_type"  />
              <v-text-field v-if="form.sell_type == 3" label="sell_type_ect_weight" v-model="form.sell_type_ect_weight"  />
              <v-text-field v-if="form.sell_type == 3" label="sell_type_ect_grade" v-model="form.sell_type_ect_grade"  />


            <v-btn class="w-full" type='submit' large color='success' >บันทึก</v-btn>
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
  lists:any = [];
  form:any = {}
  choices:any = {}




  async getEnv(){

    this.choices = {
      sell_to: await Core.getHttp(tool+`/sellto/`),
      sell_type: await Core.getHttp(tool+`/selltype/`)
    }
    this.lists = await Core.getHttp(`${api}/sell/?ox=${this.currentId}`)
    this.response = true;

  }

  async saveData(){
    this.form.ox = this.currentId
    let store = await Core.postHttp(`${api}/sell/`,this.form)
    if(store.id){
      await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`,{status:"ขาย"})
      alert("บันทึกข้อมูลสำเร็จแล้ว");
      await this.getEnv();
      this.form = {};
      this.dialog = false;
    }
  }
  async updateData(){
    this.form.ox = this.currentId
    let store = await Core.putHttp(`${api}/sell/${this.form.id}/`,this.form)
    if(store.id){
      await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`,{status:"ขาย"})
      alert("บันทึกข้อมูลสำเร็จแล้ว");
      await this.getEnv();
      this.form = {};
      this.dialog = false;
    }
  }

  async removeData(){
    let check = confirm('คุณแน่ใจใช่ไหม')
    if(check){
      await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`,{status:""})
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





}
</script>


