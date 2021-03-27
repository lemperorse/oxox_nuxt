<template>
<div>
    <v-card-title>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
    </v-card-title>
    <v-container>
        <form @submit.prevent="saveData()">

            <v-text-field dense class="p-2" label="id" v-model="form.id" />
            <v-text-field dense class="p-2" label="วันที่:" type="date" v-model="form.date" />
            <v-text-field dense class="p-2" label="ชื่อ:" v-model="form.name" />
            <v-text-field dense class="p-2" label="type" v-model="form.type" />
            <v-text-field dense class="p-2" label="จำนวนเงิน:" v-model="form.value" />
            <v-text-field dense class="p-2" label="created_at" v-model="form.created_at" />
            <v-text-field dense class="p-2" label="updated_at" v-model="form.updated_at" />
            <v-select dense class="p-2" :items="list_user_id" item-text="name" item-value="id" label="ประเภท รายรับ-รายจ่าย:" v-model="form.user_id" />
            <v-btn type='submit' rounded block large color='success'>บันทึก</v-btn>
        </form>
    </v-container>
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
    form: any = {}
    type: boolean = false

    async getEnv() {
        // this.choices = {
        //     gene: await Core.getHttp('/api/v1/tool/gene/'),
        // }
    }

    async getFarmer() {
        this.farmer = await Core.getHttp(`/api/v1/farmer/income/`)
    }

    async created() {
        await this.getEnv();
        await this.getFarmer();
    }

    get user() {
        return Auth.user;
    }

    async saveData() {
        this.form.user = this.user.id
        let save = await Core.postHttp(`/api/v1/farmer/income/`, this.form)
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
