<template>
  <div @click="$router.push(route)"  class=" m-4 rounded-xl shadow-2xl border-b-4  p-4 bg-white" :class="color">
    <div class="flex  ">
      <img class="w-16" :src="app+icon" alt="">
      <div class="pl-4">
        <h4 class="text-xl font-bold">{{name}}</h4>
        <h3>{{text}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      name:{default:'รายงาน'},
      icon:{default:'/business-report.png'},
      text:{default:'ข้อมูลสรุปรายระเอียดต่างๆ'},
        color : {default:'border-green-500'},
      route:{default:'/'},
    },
   data: ()=>{
     return ({
       test:'sss',
       app:'',
     })
   },
    async created(){ 
          this.app = this.$config._app.basePath
    }
}
</script>
