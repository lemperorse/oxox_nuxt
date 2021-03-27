<template>
<div>
    <v-toolbar flat>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/money/create')" rounded color="primary">สร้าง</v-btn>
    </v-toolbar>

    <div v-for="farm,index in farmer" :key="index">
        <Menu :route="`/money/${farm.id}/`" icon="/money-bag (1).png" :name="farm.name" :text="farm.created_at"></Menu>
    </div>

    <!-- <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Test <v-spacer></v-spacer>
                <v-btn @click="(form = {})&&(dialog=false)" color="success">text</v-btn>
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="(form.id)? updateData() : saveData()">
                    <v-text-field dense class="p-2" label="id" v-model="form.id" />
                    <v-text-field dense class="p-2" label="วันที่:" type="date" v-model="form.date" />
                    <v-text-field dense class="p-2" label="ชื่อ:" v-model="form.name" />
                    <v-text-field dense class="p-2" label="type" v-model="form.type" />
                    <v-text-field dense class="p-2" label="จำนวนเงิน:" v-model="form.value" />
                    <v-text-field dense class="p-2" label="created_at" v-model="form.created_at" />
                    <v-text-field dense class="p-2" label="updated_at" v-model="form.updated_at" />
                    <v-select dense class="p-2" :items="list_user_id" item-text="name" item-value="id" label="ประเภท รายรับ-รายจ่าย:" v-model="form.user_id" />
                </form>
            </v-card-text>
        </v-card>
    </v-dialog> -->

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
export default class Farm extends Vue {

    farmer: any = null
    dialog: boolean = false

    async getFarmer() {
        this.farmer = await Core.getHttp(`/api/v1/farmer/income/`)
    }

    async created() {
        await this.getFarmer();
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
