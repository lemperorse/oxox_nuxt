<template>
<div>
   
    <v-toolbar color="transparent" flat>
      <h2>อาหารหยาบ</h2>
      <v-spacer></v-spacer>
      <v-btn @click="dialog=true" rounded color="primary">เพิ่ม</v-btn>
    </v-toolbar>

      <div @click="(form = list) && (dialog = true)" v-for="list,index in lists" :key="index">
            <Core-Menu :name="list.food" icon="/food1.png" :text="list.fedding_system"></Core-Menu>
        </div>

    <v-dialog fullscreen persistent v-model="dialog">
        <v-card>
            <v-card-title primary-title>
                
                 <h2 class="text-base font-bold">อาหารหยาบ</h2>
                 <v-spacer></v-spacer>
                <v-btn @click="(form = {}) && (dialog = false)" small fab color="error">X</v-btn>
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="(form.id)?updateData():saveData()"> 
                    <v-text-field required type="date" label="วัน/เดือน/ปีที่ให้" v-model="form.date" />
                    <v-text-field required type="number" label="อายุ (ปี)" v-model="form.age_year" />
                    <v-text-field required type="number" label="อายุ (เดือน)" v-model="form.age_month" />
                    <v-text-field required type="number" label="น้ำหนัก (กก.)" v-model="form.weight" />
                      <v-select :items="['แบบเต็มที่','แบบจำกัด']" item-text="name" item-value="id" label="ระบบการให้อาหาร" v-model="form.fedding_system" />
                    <v-text-field required label="อาหารหยาบ (กก./ตัว/วัน)" v-model="form.food" />
                    <v-text-field required label="ชนิดของอาหารหยาบ" v-model="form.food_type" />  
                    <v-btn rounded class="w-full" type="submit" large color='success'>บันทึก</v-btn>
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
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
@Component({

    components: {},
})
export default class FoodRough extends Vue {

    currentId: any = this.$route.params.id;
    lists: any = null;
    form: any = {}
    choices: any = {}
    dialog: boolean = false;

    async getEnv() {
      this.lists = await Core.getHttp(`/api/v1/ox_manager/food_rough/`)
    }

    async saveData(){
      this.form.ox = this.currentId
        let data = await Core.postHttp(`/api/v1/ox_manager/food_rough/`,this.form)
        if(data.id)
        {
          alert('บันทึกข้อมูลสำเร็จ')
          await this.getEnv();
          this.dialog = false;

        }else{ alert('เกิดข้อผิดพลาด')}
    }

    async updateData(){ 
        let data = await Core.putHttp(`/api/v1/ox_manager/food_rough/${this.form.id}/`,this.form)
        if(data.id)
        {
          alert('บันทึกข้อมูลสำเร็จ')
          await this.getEnv();
          this.dialog = false;

        }else{ alert('เกิดข้อผิดพลาด')}
    }

    async removeData() {
        let check = confirm('คุณแน่ใจฝช่ไหม')
        if (check) {
            await Core.deleteHttp(`/api/v1/ox_manager/food_rough/${this.form.id}/`)
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
