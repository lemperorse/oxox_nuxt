<template>
  <div v-if="response" >
    <h2 class="p-4 text-xl font-bold">น้ำหนักการขุน</h2>
      <!-- <pre>{{gender}}</pre> -->
              <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
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
  response:boolean = false
  text:string = 'hello world'
  
  @Prop({ default: [] })
  raw_xo:any  
 

  async created() { 
      await this.getGraphGender();
      this.response = true;
  }

  raw_graph:any = null
  series:any  = []

  chartOptions:any =  {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['0-150 กก.', '151-250 กก.', '251-300 กก.', ' > 300 กก.'],
            },
            yaxis: {
              title: {
                text: 'จำนวน'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val:any) {
                  return "จำนวน " + val + " ตัว"
                }
              }
            }
          }


  async getGraphGender(){
     let series = [
       await this.getOx(0,150),
       await this.getOx(151,250),
       await this.getOx(251,300),
       await this.getOx(301,5000),
     ]
     this.series.push(
       {
            name: 'โคขุน',
            data: series
          }
     )
    
  }

  async getOx(a:number,b:number){
     let data = _.filter(this.raw_xo,function(ox:any){ 
      return ox.weight >= a && ox.weight <= b
    })
    return data.length
  }




}
</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}
</style>
