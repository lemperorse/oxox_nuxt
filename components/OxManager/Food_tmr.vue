<template>
  <div>
    {{currentId}} 
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
export default class FoodTMR extends Vue {

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


