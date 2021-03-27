<template>
<v-app v-if="dialog">
    <v-dialog v-model="dialog" persistent>
        <v-card v-if="response">
            <v-card-title>
                เลือก จังหวัด อำเภอ ตำบล
                <v-spacer></v-spacer>
                <v-btn @click="closeDialog" small fab color="error">
                    X
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-autocomplete rounded return-object label="ภูมิภาค" filled v-model="geoChoose" :items="geo" item-text="name"></v-autocomplete>
                <v-autocomplete rounded return-object label="จังหวัด" filled v-model="provinceChoose" :items="province" item-text="name"></v-autocomplete>
                <v-autocomplete rounded return-object label="อำเภอ" filled v-model="amphurChoose" :items="amphur" item-text="name"></v-autocomplete>
                <v-autocomplete rounded return-object label="ตำบล" filled v-model="districtChoose" :items="district" item-text="name"></v-autocomplete>
                <v-btn class="w-full" @click="submitCity()" rounded color="success" large> ยืนยัน</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</v-app>
</template>

<script lang="ts">
import {
    Component,
    Watch,
    Vue,
} from 'nuxt-property-decorator';
import { City } from '@/vuexes/city'
@Component({
    components: {},
    computed: {}
})
export default class CityComponent extends Vue {
    private response: boolean = false
    private geo: any[] | null = []
    private province: any[] | null = []
    private amphur: any[] | null = []
    private district: any[] | null = []
    private geoChoose: any | null = null
    private provinceChoose: any | null = null
    private amphurChoose: any | null = null
    private districtChoose: any | null = null
    @Watch('geoChoose')
    private async onChangeGeo(id: any) {
        this.province = await City.getProvince(id ?.id)
    }
    @Watch('provinceChoose')
    async onChangeProvince(id: any) {
        this.amphur = await City.getAmphur(id ?.id)
    }
    @Watch('amphurChoose')
    async onChangeAmphur(id: any) {
        this.district = await City.getDistrict(id ?.id)
    }
    public async submitCity() {
        City.currentGeo = this.geoChoose
        City.currentProvince = this.provinceChoose
        City.currentAmphur = this.amphurChoose
        City.currentDistrict = this.districtChoose
        await City.setShowName()
        City.dialogCityState = false
    }
    private async mounted() {
        this.geo = await City.getGeo()
        this.response = true
    }
    get dialog() {
        return City.dialogCityState
    }
    async closeDialog() {
        City.dialogCityState = false
    }
}
</script>
