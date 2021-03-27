<template>
<div>
    <v-card-title class="m-1" primary-title>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = true" rounded color="primary">สร้าง</v-btn>
    </v-card-title>

    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                <span>{{(form.id)?'แก้ไข':'เพิ่ม'}}การจัดการการเงิน</span>
                <v-spacer></v-spacer>
                <v-btn @click="(form = {})&&(dialog=false)" color="error" fab small>x</v-btn>
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="(form.id)? updateData() : saveData()">
                    <!-- <v-text-field label="id" v-model="form.id" /> -->
                    <v-text-field label="วันที่" type="date" v-model="form.date" />
                    <v-text-field label="ชื่อ" v-model="form.name" />
                    <v-text-field label="ประเภท รายรับ-รายจ่าย" v-model="form.type" />
                    <v-text-field label="จำนวนเงิน" v-model="form.value" />
                    <!-- <v-text-field label="created_at" v-model="form.created_at" />
                    <v-text-field label="updated_at" v-model="form.updated_at" /> -->
                    <v-select :items="list_user_id" item-text="name" item-value="id" label="user_id" v-model="form.user_id" />
                    <v-btn type='submit' block rounded large color='success'>บันทึก</v-btn>
                    <v-btn class="w-full mt-4" dark v-if="form.id" @click="removeData()" color='red' rounded large>ลบ</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
    <div @click="(form = list)&&(dialog=true)" v-for="list,i in lists" :key="i">
        <Core-Menu :name="list.date" text="จัดการข้อมูลรายรับรายจ่าย" icon="/money-bag (1).png"></Core-Menu>
    </div>

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
export default class MyComponent extends Vue {
    lists: any = []
    dialog: boolean = false
    form: any = {}

    async getEnv() {
        this.lists = await Core.getHttp(`/api/v1/farmer/income/`)
    }

    async created() {
        await this.getEnv();
    }

    async saveData() {
        let save = await Core.postHttp(`/api/v1/farmer/income/`, this.form)
        if (save.id) {
            alert('บันทึกข้อมูลสำเร็จแล้ว')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async updateData() {
        let save = await Core.putHttp(`/api/v1/farmer/income/${this.form.id}/`, this.form)
        if (save.id) {
            alert('บันทึกข้อมูลสำเร็จแล้ว')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async removeData() {
        let check = confirm('คุณแน่ใจใช่ไหม?')
        if (check) {
            await Core.deleteHttp(`/api/v1/farmer/income/${this.form.id}/`)
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
    }

    get user() {
        return Auth.user;
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
