<template>
<div>
    <!-- {{currentId}} --><br>
    <v-tabs v-model="tab">
        <v-tab>ระบบติดตามและให้คำแนะนำ
</v-tab>
        <v-tab-item>
            <TestOxRec v-if="tab ==0"></TestOxRec>
        </v-tab-item>
        <v-tab>ประเมินประสิทธิภาพการผลิต
</v-tab>
        <v-tab-item>
            <TestOxSystem v-if="tab ==1"></TestOxSystem>
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
import TestOxRec from '@/components/OxManager/TestOxRec.vue'
import TestOxSystem from '@/components/OxManager/TestOxSystem.vue' 
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'
@Component({
    components: { TestOxRec, TestOxSystem },
})
export default class TestOx extends Vue {
    tab: number = 0;
    currentId: any = this.$route.params.id;
    lists: any = null;
    form: any = {}
    choices: any = {}

    async getEnv() {

    }

    async created() {
        await this.getEnv();
    }

}
</script>
