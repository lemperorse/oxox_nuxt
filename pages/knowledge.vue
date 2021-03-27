<template>
<div>
    <!-- <v-btn @click="dialog = true" color="success">text</v-btn> -->
    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                <h2>{{form.name}}</h2>
                 <v-spacer></v-spacer> 
                 <v-btn @click="(form = {}) && (dialog = false)" small fab color="error">X</v-btn>
            </v-card-title>
            <v-card-text>
                <img v-if="form.image" :src="form.image" alt="">
                <p class="pt-4 text-base text-black">{{form.detail}}</p> <br><br>
                <img v-if="form.image1" :src="form.image1" alt=""><br>
                <img v-if="form.image2" :src="form.image2" alt=""><br>
                <img v-if="form.image3" :src="form.image3" alt="">
                <br>
                <h3>สร้างเมื่อ : {{convertDate(form.created_at)}}</h3>
             <br><br>
            </v-card-text>
        </v-card>
    </v-dialog>
    <div @click="(form = list)&&(dialog=true)" v-for="list,i in lists" :key="i">
        <Core-Menu :name="list.name" :text="convertDate(list.created_at)"></Core-Menu>
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
export default class MyComponent extends Vue {

    lists: any = []
    dialog: boolean = false
    form: any = {}

    async getEnv() {
        this.lists = await Core.getHttp(`/api/v1/tool/knoeledge/`)
    }

    async created() {
        await this.getEnv();
    }

    async saveData() {
        let save = await Core.postHttp(`/api/v1/tool/knoeledge/`, this.form)
        if (save.id) {
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async updateData() {
        let save = await Core.putHttp(`/api/v1/tool/knoeledge/${this.form.id}/`, this.form)
        if (save.id) {
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async deleteData() {
        let check = confirm('a u s')
        if (check) {
            await Core.deleteHttp(`/api/v1/tool/knoeledge/${this.form.id}/`)
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
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
