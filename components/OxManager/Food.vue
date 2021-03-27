<template>
  <div>
    {{currentId}}
    <v-tabs v-model="tab">
      <v-tab>อาหารหยาบ</v-tab>
      <v-tab-item>
        <Food_rough v-if="tab ==0"></Food_rough>
      </v-tab-item>
      <v-tab>อาหารข้น</v-tab>
      <v-tab-item>
        <Food_thick v-if="tab ==1"></Food_thick>
      </v-tab-item>
      <v-tab>อาหารผสมครบส่วน (TMR)</v-tab>
      <v-tab-item>
        <Food_tmr v-if="tab ==2"></Food_tmr>
      </v-tab-item>
    </v-tabs>



  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import Food_rough from '@/components/OxManager/Food_rough.vue'
import Food_thick from '@/components/OxManager/Food_thick.vue'
import Food_tmr from '@/components/OxManager/Food_tmr.vue'
import {Core} from '@/vuexes/core'
import {Auth} from '@/vuexes/auth'
@Component({

  components: { Food_rough,Food_thick, Food_tmr },
})
export default class Food extends Vue {
  tab:number = 0;
  currentId:any = this.$route.params.id;
  lists:any = null;
  form:any = {}
  choices:any = {}



  async getEnv(){

  }



  async created() {
    await this.getEnv();
  }





}
</script>


