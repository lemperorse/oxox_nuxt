<template>
 <div>
    <Menu v-for="menu,index in listPages" :key="index"
       :route="menu.route"   :name="menu.name" :text="menu.text" :icon="menu.icon"></Menu>
 </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
@Component({

  components: { },
})
export default class MyComponent extends Vue {

  text:string = 'hello world'
   listPages:any = [
     {
       name:'ฟาร์ม',
       text:'แก้ไขข้อมูล ชื่อ ที่ตั้ง',
       icon:'/004-barn.png',
       route:'/farm/'
     },
     {
       name:'โคขุน',
       text:'เพิ่ม แก้ไข รายการโคขุนในฟาร์ม',
       icon:'/019-cow.png',
       route:'/ox/'
     },{
       name:'การจำหน่าย',
       text:'นำโคขุนในฟาร์มจำหน่ายออก',
       icon:'/040-chariot.png',
       route:'/sell/'
     },{
       name:'องค์ความรู้',
       text:'คลังข้อมูลความรู้สำหรับการเลี้ยงโคขุน',
       icon:'/044-smart.png',
       route:'/knowledge/'
     },{
       name:'รายงาน',
       text:'ข้อมูลสรุปรายระเอียดต่างๆ',
       icon:'/business-report.png',
       route:'/report/'
     },
   ]
  async created() {

  }




}
</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}
</style>
