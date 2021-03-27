<template>
<div>
    <v-btn @click="dialog = true" color="success">text</v-btn>
    <v-dialog v-model="dialog" scrollable fullscreen persistent :overlay="false" max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title>
                Test <v-spacer></v-spacer>
                <v-btn @click="(form = {})&&(dialog=false)" class="rounded-pill" color="error">X</v-btn>
            </v-card-title>
            <v-card-text>
                <form @submit.prevent="(form.id)? updateData() : saveData()">
                    <v-text-field label="name" v-model="form.name" />
                    <v-text-field label="type" v-model="form.type" />
                    <v-text-field label="value" v-model="form.value" />
                    <v-btn type="submit">Save</v-btn>
                    <v-btn @click="deleteData()">delete</v-btn>
                </form>
            </v-card-text>
        </v-card>
    </v-dialog>
    <div @click="(form = list)&&(dialog=true)" v-for="list,i in lists" :key="i">
        <Core-Menu icon="/medical-report.png" text="การเงิน"></Core-Menu>
    </div>
    <pre>{{lists}}</pre>
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
    lists: any = []
    dialog: boolean = false
    form: any = {}

    async getEnv() {
        this.lists = await Core.getHttp(`/api/v1/farmer/income`)
    }

    async created() {
        await this.getEnv();

    }

    async saveData() {
        let save = await Core.postHttp(`/api/v1/farmer/income`, this.form)
        if (save.id) {
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async updateData() {
        let save = await Core.putHttp(`/api/v1/farmer/income${this.form.id}/`, this.form)
        if (save.id) {
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
    }

    async deleteData() {
        let check = confirm('are you sure')
        if (check) {
            await Core.deleteHttp(`/api/v1/farmer/income/${this.form.id}/`)
            alert('success')
            await this.getEnv();
            this.dialog = false;
        }
    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
