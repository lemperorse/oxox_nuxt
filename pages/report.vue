<template>
<div v-if="response">
    <v-card-title class="m-1" primary-title>
        <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
        <h2 class="ml-2 text-xl font-bold text-blue-400">รายงาน</h2>
    </v-card-title>
    <v-container>
        <v-tabs v-model="tab">
            <v-tab>
                โคขุน
            </v-tab>
            <v-tab-item>
                <Report-GraphOx v-if="tab == 0" :raw_xo="raw_xo"></Report-GraphOx> <br><br>
                <Report-GraphOxWeight v-if="tab == 0" :raw_xo="raw_xo"></Report-GraphOxWeight>
            </v-tab-item>
            <v-tab>
                การเงิน
            </v-tab>
            <v-tab-item>
                <Report-GrapnIncome v-if="tab ==1 "></Report-GrapnIncome>
            </v-tab-item>
        </v-tabs>

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
export default class MyComponent extends Vue {

    text: string = 'hello world'
    raw_xo: any = []
    user: any = {}
    tab: number = 0
    response: boolean = false;
    async created() {
        this.user = await Auth.getUser();
        this.raw_xo = await Core.getHttp(`/api/v1/ox/ox/?&status=อยู่ในฟาร์ม&user=${this.user.id}`)
        this.response = true;
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
