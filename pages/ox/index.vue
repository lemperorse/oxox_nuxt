<template>
  <div>
    <v-btn @click="$router.push('/ox/create')">สร้าง</v-btn>
    <div v-for="ox,index in oxen" :key="index">
      <Menu :route="`/ox/${ox.id}/`" icon="/017-cow.png" :name="ox.name" :text="ox.created_at"></Menu>
    </div>


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
export default class Farm extends Vue {

  oxen:any = null



  async getOxen(){
    this.oxen = await Core.getHttp(`/api/v1/ox/ox/`)
  }



  async created() {
    await this.getOxen();
  }

  get user(){
    return Auth.user;
  }





}
</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}
</style>
