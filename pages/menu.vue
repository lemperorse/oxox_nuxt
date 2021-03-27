<template>
<div>
    <svg height="100%" width="100%" id="svg" viewBox="0 0 1440 700" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150 transform -translate-y-14">
        <defs>
            <linearGradient id="gradient">
                <stop offset="5%" stop-color="#fcb90088"></stop>
                <stop offset="95%" stop-color="#00d08488"></stop>
            </linearGradient>
        </defs>
        <path d="M 0,700 C 0,700 0,233 0,233 C 68.57050810014726,252.69845360824743 137.14101620029453,272.39690721649487 204,284 C 270.85898379970547,295.60309278350513 336.0064432989691,299.11082474226805 390,287 C 443.9935567010309,274.88917525773195 486.8332106038291,247.15979381443296 540,239 C 593.1667893961709,230.84020618556704 656.6607142857142,242.25 722,262 C 787.3392857142858,281.75 854.5239322533137,309.840206185567 904,308 C 953.4760677466863,306.159793814433 985.2435567010309,274.38917525773195 1052,263 C 1118.756443298969,251.61082474226805 1220.5018409425627,260.6030927835052 1291,259 C 1361.4981590574373,257.3969072164948 1400.7490795287185,245.1984536082474 1440,233 C 1440,233 1440,700 1440,700 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 350)"></path>
        <defs>
            <linearGradient id="gradient">
                <stop offset="5%" stop-color="#fcb900ff"></stop>
                <stop offset="95%" stop-color="#00d084ff"></stop>
            </linearGradient>
        </defs>
        <path d="M 0,700 C 0,700 0,466 0,466 C 49.98950662739321,492.91642120765835 99.97901325478642,519.8328424153167 155,533 C 210.02098674521358,546.1671575846833 270.07345360824746,545.5850515463918 344,527 C 417.92654639175254,508.4149484536082 505.72717231222396,471.82695139911635 565,473 C 624.272827687776,474.17304860088365 655.0178571428571,513.1071428571428 712,492 C 768.9821428571429,470.8928571428572 852.2013991163474,389.7444771723123 925,404 C 997.7986008836526,418.2555228276877 1060.1765463917525,527.9149484536082 1108,539 C 1155.8234536082475,550.0850515463918 1189.092415316642,462.5957290132548 1242,434 C 1294.907584683358,405.4042709867452 1367.453792341679,435.70213549337257 1440,466 C 1440,466 1440,700 1440,700 Z" stroke="none" stroke-width="0" fill="url(#gradient)" class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 350)"></path>
    </svg>

    <div class=" m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4 transform -translate-y-20">
        <div class="flex  ">
            <img class="w-16" src="/004-barn.png" alt="">
            <div class="pl-4">
                <h4 class="text-xl">ฟาร์ม</h4>
                <h3>แก้ไขข้อมูล ชื่อ ที่ตั้ง </h3>
            </div>
        </div>
    </div>

    <div class=" m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4 transform -translate-y-20">
        <div class="flex  ">
            <img class="w-16" src="/019-cow.png" alt="">
            <div class="pl-4">
                <h4 class="text-xl">โคขุน</h4>
                <h3>เพิ่ม แก้ไข รายการโคขุนในฟาร์ม</h3>
            </div>
        </div>
    </div>

    <div class=" m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4 transform -translate-y-20">
        <div class="flex  ">
            <img class="w-16" src="/040-chariot.png" alt="">
            <div class="pl-4">
                <h4 class="text-xl">การจำหน่าย</h4>
                <h3>นำโคขุนในฟาร์มจำหน่ายออก</h3>
            </div>
        </div>
    </div>

    <div class=" m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4 transform -translate-y-20">
        <div class="flex  ">
            <img class="w-16" src="/044-smart.png" alt="">
            <div class="pl-4">
                <h4 class="text-xl">องค์ความรู้</h4>
                <h3>คลังข้อมูลความรู้สำหรับการเลี้ยงโคขุน</h3>
            </div>
        </div>
    </div>

    <div class=" m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4 transform -translate-y-20">
        <div class="flex  ">
            <img class="w-16" src="/business-report.png" alt="">
            <div class="pl-4">
                <h4 class="text-xl">รายงาน</h4>
                <h3>ข้อมูลสรุปรายระเอียดต่างๆ</h3>
            </div>
        </div>
    </div>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Watch,
} from "nuxt-property-decorator"

@Component({
    components: {},
})
export default class MyComponent extends Vue {

    text: string = 'hello world'

    async mounted() {

    }

}
</script>

<style>
.bgh {
    background: rgb(53, 184, 140);
    background: linear-gradient(180deg, rgba(53, 184, 140, 1) 18%, rgba(17, 140, 87, 1) 100%);
}
</style>
