<template>
<div>
    <v-toolbar flat>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon> <h2 class="ml-2 text-xl font-bold text-blue-400">รายการโคขุนของคุณ</h2>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/ox/create')" rounded color="primary">สร้าง</v-btn>
    </v-toolbar>

    <div v-for="ox,index in oxen" :key="index">
        <Menu :route="`/ox/${ox.id}/`" icon="/017-cow.png" :name="ox.name" :text="convertDate(ox.created_at)"></Menu>
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
import { Web } from '@/vuexes/web'
@Component({

    components: {},
})
export default class Farm extends Vue {

    oxen: any = null

    async getOxen() {
        this.oxen = await Core.getHttp(`/api/v1/ox/ox/?&status=อยู่ในฟาร์ม&user=${Auth.user.id}`)
    }

    async created() {
        await this.getOxen();
    }

    get user() {
        return Auth.user;
    }

    convertDate(date:any){
        return Web.convertDate(date);
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
