<template>
<div>
    <v-app id="inspire"  >
        <v-app-bar v-if="response" app flat color="bg-tool">
            <!-- <v-app-bar-nav-icon   @click="drawer = !drawer"></v-app-bar-nav-icon> -->

            <v-spacer></v-spacer>
                <h2 class="text-xl text-white">ระบบจัดการโคขุน</h2>
            <v-spacer></v-spacer>
             <v-icon dark @click="logout()"  >
                mdi-logout
            </v-icon>

        </v-app-bar>

        <v-navigation-drawer v-model="drawer" fixed temporary>
            <div class="pt-4">
                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/house.png" alt="">
                        หน้าแรก
                    </v-btn>
                </div>

                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/004-barn.png" alt="">
                        ฟาร์ม
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/019-cow.png" alt="">
                        โคขุน
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn  class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/040-chariot.png" alt="">
                        การจำหน่าย
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn  class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/044-smart.png" alt="">
                        องค์ความรู้
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn  class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/wallet.png" alt="">
                        การเงิน
                    </v-btn>
                </div>
                <div class="pt-2">
                    <v-btn class="w-full" color="success" text large>
                        <img class="w-8" src="~/static/business-report.png" alt="">
                        รายงาน
                    </v-btn>
                </div>
            </div>

        </v-navigation-drawer>
        <v-main class="gg"  >

               <img  class="vimh " src="https://p7.hiclipart.com/preview/691/67/677/lawn-sky-reversal-film-cloud.jpg" alt="">
            <Core-Loading />
            <Core-City />
            <Nuxt class="bg-transparent" />
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
import { Core } from '@/vuexes/core'
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
        }else{
            await Core.getChoices();
        }
    }

}
</script>

<style  >
.gg{
background-color: #f7f7f7;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='2'%3E%3Cpath transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='4'%3E%3Cpath transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
.test{
      display: inline-block;
    overflow: hidden;
    position: relative;
    width: 100%;
}
.vimh {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.bg-tool{
background-color: #427eff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23ffffff' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23427eff' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%234f7bf9' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%235977f3' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%236174ed' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%236871e7' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%236e6ee1' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23736bdb' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%237768d5' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%237a65cf' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%237d62ca' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23805fc4' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23825cbe' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23845ab8' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%238557b2' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%238655ad' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%238752a7' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%238750a1' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23874e9c' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
}
</style>
