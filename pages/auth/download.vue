<template>
<div class="bgh">
    <div class="h-screen flex justify-center items-center p-2">
        <v-card class="w-full md:w-1/2 rounded-xl elevation-8">
            <v-card-title>
                <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
                <h2 class="ml-2 text-xl font-bold text-green-600">Download APK </h2>
            </v-card-title>
            <div class="text-xl p-6">ล่าสุด</div>
            <v-toolbar color="transparent" flat>
                <p class="text-xl font-bold text-blue-600 p-6">Apk Version 1.0<br> <span class="text-base font-thin">เวลาอัพโหลด 10/01/2021</span></p>
                <v-spacer></v-spacer>
                <v-btn color="indigo accent-3" dark rounded depressed>Download</v-btn>
            </v-toolbar>
            <v-divider class="m-6"></v-divider>
            <v-toolbar color="transparent" flat v-if="$vuetify.breakpoint.mobile != true">
                    <Button-Google />
            </v-toolbar>
        </v-card>
    </div>
</div>
</template>

<script>
import {
    Component,
    Vue,
    Watch,
} from "nuxt-property-decorator"
import { Core } from '@/vuexes/core'
import { Auth } from '@/vuexes/auth'

export default {
    layout: 'root',
    data: () => ({
        form: {}
    }),
    async created() {
        await this.checkUser();
    },
    methods: {
        async login() {
            await Auth.login(this.form);
            let user = await Auth.getUser();
            if (user.id) {
                //await location.reload();
                await this.$router.replace('/')
                await location.reload();
            }
        },
        async checkUser() {
            let user = await Auth.getUser();
            if (user.id) {
                await this.$router.replace('/')
            }
        }
    }
}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}

.bg {
    background-image: url("https://images.pexels.com/photos/5867858/pexels-photo-5867858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
