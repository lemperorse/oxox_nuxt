<template>
<div>
    <v-toolbar flat>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
        <v-spacer></v-spacer>
        <form>
          ชื่อควาย : {{form.name}}
          <!-- {{currentId}} -->
        </form>
        
    </v-toolbar>

    <v-tabs v-model="tab">
        <v-tab>ทั่วไป</v-tab>
        <v-tab-item>
            <Ox-Edit v-if="tab == 0" />
        </v-tab-item>
        <v-tab>ให้อาหาร</v-tab>
        <v-tab-item>
            <OxManager-Food v-if="tab == 1"></OxManager-Food>
        </v-tab-item>
        <v-tab>ทำวัคซีน</v-tab>
        <v-tab-item>
            <OxManager-Vaccine v-if="tab == 2"></OxManager-Vaccine>
        </v-tab-item>
        <v-tab>ถ่ายพยาธิ</v-tab>
        <v-tab-item>
            <OxManager-Worm v-if="tab == 3"></OxManager-Worm>
        </v-tab-item>
        <v-tab>โปรแกรมบำรุง</v-tab>
        <v-tab-item>
            <OxManager-Maintain v-if="tab == 4"></OxManager-Maintain>
        </v-tab-item>
        <v-tab>ประวัติการรักษา</v-tab>
        <v-tab-item>
            <OxManager-Heal v-if="tab == 5"></OxManager-Heal>
        </v-tab-item>
        <v-tab>การจำหน่าย</v-tab>
        <v-tab-item>
            <OxManager-Sell v-if="tab == 6"></OxManager-Sell>
        </v-tab-item>

    </v-tabs>

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

    form: any = {}
    currentId: any = 0
    tab: number = 0;
    
    async getEnv() {
        this.currentId = this.$route.params.id;
        this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId }`)
    }

    async getOxen() {

    }

    async created() {
        await Web.switchLoad(true);
        await this.getEnv();
        await Web.switchLoad(false);
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
