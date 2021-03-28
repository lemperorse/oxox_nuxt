<template>
  <div v-if="response" >
    <h2 class="p-4 text-xl font-bold">เพศโคขุน</h2>
      <!-- <pre>{{gender}}</pre> -->
              <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop
} from "nuxt-property-decorator"
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
import _ from 'lodash'
import VueApexCharts from 'vue-apexcharts'

@Component({

  components: { apexchart: VueApexCharts, },
})
export default class MyComponent extends Vue {
  @Prop({ default: [] })
  raw_xo:any  


  response:boolean = false
  text:string = 'hello world'
   
  gender:any = []

  async created() { 
      this.gender = await Core.getHttp(`/api/v1/tool/gender/`)
      this.raw_xo =   await Core.getHttp(`/api/v1/ox/ox/?&status=อยู่ในฟาร์ม&user=${Auth.user.id}`)
      await this.getGraphGender();
      this.response = true;
  }

  raw_graph:any = null
  series:any = []
  chartOptions:any =  {
            chart: {
              type: 'donut',
            },
            labels:[],
            responsive: [{
              breakpoint: 480,
              options: {
               
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
  async getGraphGender(){
    let genders = []
    let val = []
    for (let i =0 ; i < this.gender.length; i++ ){
       genders.push( this.gender[i].name)
       val.push( 
        ( _.filter(this.raw_xo,{gender:  this.gender[i].id})).length
       ) 
    }
    this.series = val
    this.chartOptions.labels = genders 
    
  }




}
</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}
</style>
