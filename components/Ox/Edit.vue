<template>
<div>
    <v-container>
        <form @submit.prevent="saveData()" v-if="response">
            <v-text-field class="p-2" label="ชื่อโค" v-model="form.name" prepend-inner-icon="mdi-cow" />
            <v-text-field dense class="p-2" label="เบอร์หู" v-model="form.ear_number" prepend-inner-icon="mdi-ear-hearing" />
            <v-text-field dense class="p-2" label="หมายเลข NID" v-model="form.nid_number" prepend-inner-icon="mdi-numeric" />
            <v-text-field dense class="p-2" label="หมายเลขไมโครชิป" v-model="form.chip_number" prepend-inner-icon="mdi-micro-sd" />
            <v-text-field dense class="p-2" label="ระดับสายเลือด" v-model="form.blood" prepend-inner-icon="mdi-iv-bag" />

            <v-select dense class="p-2" :items="choices.gene" item-text="name" item-value="id" label="พันธุ์" v-model="form.gene" prepend-inner-icon="mdi-certificate-outline" />
            <v-text-field class="p-2" v-if="form.gene == (isWeb.fillData( choices.gene ,'type',true )).id " name="name" label="พันธุ์อื่นๆ" id="id" prepend-inner-icon="mdi-certificate-outline"></v-text-field>
            <v-select dense class="p-2" :items="choices.gender" item-text="name" item-value="id" label="เพศ" v-model="form.gender" prepend-inner-icon="mdi-gender-male-female" />
            <!-- {{ (isWeb.fillData( choices.gender ,'name','อื่นๆ' )) }} -->
            <v-text-field class="p-2" v-if="form.gender == (isWeb.fillData( choices.gender ,'name','อื่นๆ' )).id " name="name" label="เพศอื่นๆ" id="id" prepend-inner-icon="mdi-gender-male-female"></v-text-field>

            <v-select dense class="p-2" :items="choices.origin" item-text="name" item-value="id" label="แหล่งที่มา" v-model="form.origin" prepend-inner-icon="mdi-redhat" />
            <!-- {{ (isWeb.fillData( choices.origin ,'type',true )) }} -->
            <v-text-field class="p-2" v-if="form.origin == (isWeb.fillData( choices.origin ,'type',true )).id " label="แหล่งที่มาอื่นๆ" prepend-inner-icon="mdi-redhat"></v-text-field>
            <v-select dense class="p-2" :items="choices.tooth" item-text="name" item-value="id" label="ฟัน" v-model="form.tooth" prepend-inner-icon="mdi-tooth-outline" />

            <v-text-field dense class="p-2" type="date" label="วันเกิด" v-model="form.birth_date" prepend-inner-icon="mdi-calendar" />
            <!-- <v-text-field dense class="p-2" type="number" label="จำนวน(ซี่)" v-model="form.tooth_count" prepend-inner-icon="mdi-tooth" /> -->
            <v-text-field dense class="p-2" type="number" label="อายุ" v-model="form.age_age" prepend-inner-icon="mdi-calendar-heart" />
            <v-text-field dense class="p-2" type="number" label="เดือน" v-model="form.age_month" prepend-inner-icon="mdi-calendar-today" />
            <v-text-field dense class="p-2" label="อายุจากการทำนาย" v-model="form.age_predict" prepend-inner-icon="mdi-calendar-edit" />

            <v-text-field dense class="p-2" type="date" label="วันที่เข้าขุน" v-model="form.fatten_date" prepend-inner-icon="mdi-calendar-star" />
            <div class="flex  p-2">
                <v-text-field dense class="" type="number" label="รอบอก (เซนติเมตร)" v-model="form.breast" prepend-inner-icon="mdi-panorama-wide-angle" />
                <v-btn class="-mt-2" small fab @click="form.weight = form.breast*2.23" color="primary">คำนวน</v-btn>
            </div>

            <v-text-field dense class="p-2" type="number" label="ความสูง (เซนติเมตร)" v-model="form.height" prepend-inner-icon="mdi-panorama-vertical" />
            <v-text-field dense class="p-2" type="number" label="ความยาวลำตัว (เซนติเมตร)" v-model="form.long" prepend-inner-icon="mdi-pan-horizontal" />
            <v-text-field dense class="p-2" type="number" label="น้ำหนักเข้าขุน (กิโลกรัม)" v-model="form.weight" prepend-inner-icon="mdi-scale" />
            <v-text-field dense class="p-2" type="date" label="วัน/เดือน/ปีที่ซื้อ" v-model="form.buy_date" prepend-inner-icon="mdi-calendar-check-outline" />
            <v-text-field dense class="p-2" type="number" label="ราคา" v-model="form.price" prepend-inner-icon="mdi-tag" />
            <div class="flex  p-2">
                <v-select dense class="" :items="choices.bsc" item-text="name" item-value="id" label="ประเมินคะแนนสภาพร่างกาย (BCS)" v-model="form.bsc" prepend-inner-icon="mdi-scoreboard-outline" />
                <v-dialog scrollable v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn fab small class="-mt-2" color="primary" dark v-bind="attrs" v-on="on">
                            !
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-xs grey lighten-2">
                            ประเมินคะแนนสภาพร่างกาย (BCS)
                        </v-card-title>

                        <v-card-text>
                            <center>
                                <img src="~/static/1.png" class="w-full" />
                                <img src="~/static/2.png" class="w-full h-full" />
                            </center>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" text @click="dialog = false">
                                ปิด
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </div>

            <v-btn class="w-full" large type='submit' rounded block color='success'>บันทึก</v-btn>

            <v-btn text rounded color="red" dark class="mt-4 w-full" @click="deleteData()">ลบโคขุนนี้</v-btn>
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
import { Web } from '@/vuexes/web'
@Component({

    components: {},
})
export default class Farm extends Vue {

    currentId: any = this.$route.params.id;
    form: any = {}
    choices: any = {}
    dialog: boolean = false;
    isWeb: any = Web
    response: boolean = false;

    async getEnv() {

        this.choices = {
            gene: await Core.getHttp('/api/v1/tool/gene/'),
            gender: await Core.getHttp('/api/v1/tool/gender/'),
            tooth: await Core.getHttp('/api/v1/tool/tooth/'),
            origin: await Core.getHttp('/api/v1/tool/origin/'),
            bsc: await Core.getHttp('/api/v1/tool/bsc/'),
        }
    }

    async getOxen() {
        this.form = await Core.getHttp(`/api/v1/ox/ox/${this.currentId}/`)
    }

    async created() {
        await this.getEnv();
        await this.getOxen();
        this.response = true;

    }

    get user() {
        return Auth.user;
    }

    async saveData() {
        this.form.user = this.user.id
        let ox = await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, this.form)
        if (ox.id) {
            alert('บันทึกข้อมูลสำเร็จ')
            await this.getEnv();
            await this.getOxen();
        }
    }

    async deleteData() {
        let check = confirm('คุณแน่ใจใช่ไหม')
        if (check) {
            alert('ลบข้อมูลแล้ว');
            let data = await Core.deleteHttp(`/api/v1/ox/ox/${this.form.id}/`)
            await this.$router.go(-1)
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
