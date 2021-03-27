<template>
<div>
    <v-app id="inspire">
        <v-app-bar v-if="response" app flat color="blue">
            <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>

            <v-spacer></v-spacer>
            <v-icon @click="logout()" dark>
                mdi-logout
            </v-icon>
            <!-- <v-app-bar-nav-icon @click="logout()"></v-app-bar-nav-icon> -->
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" fixed temporary>
            <div class="pt-4">
                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="/house.png" alt="">
                        หน้าแรก
                    </v-btn>
                </div>

                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="/004-barn.png" alt="">
                        ฟาร์ม
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="/019-cow.png" alt="">
                        โคขุน
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn  class="w-full" color="success" text large>
                        <img class="w-8" src="/040-chariot.png" alt="">
                        การจำหน่าย
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn  class="w-full" color="success" text large>
                        <img class="w-8" src="/044-smart.png" alt="">
                        องค์ความรู้
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn  class="w-full" color="success" text large>
                        <img class="w-8" src="/wallet.png" alt="">
                        การเงิน
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="/business-report.png" alt="">
                        รายงาน
                    </v-btn>
                </div>
            </div>

        </v-navigation-drawer>
        <v-main>
            <Core-Loading />
            <Core-City />
            <Nuxt />
        </v-main>

    </v-app>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from "nuxt-property-decorator"
import { Auth } from '@/vuexes/auth'
@Component({
    components: {},
})
export default class Layout extends Vue {

    user: any = null
    response: boolean = false;
    drawer: any = null

    async created() {
        await Auth.checkToken();
        this.user = await Auth.setUser();
        await this.checkUser();
        this.response = (this.user.id) ? true : false;
    }

    async logout() {
        await Auth.logout();
        await location.reload();
    }

    async checkUser() {
        let user = await Auth.getUser();
        if (!user.id) {
            await this.$router.replace(`/auth/login`)
        }
    }

}
</script>

<style  >

</style>
