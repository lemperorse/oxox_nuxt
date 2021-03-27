<template>
  <div>
    <form @submit.prevent="saveData()">
      <v-text-field label="name" v-model="form.name"  />
      <v-text-field label="ear_number" v-model="form.ear_number"  />
      <v-text-field label="nid_number" v-model="form.nid_number"  />
      <v-text-field label="chip_number" v-model="form.chip_number"  />
      <v-text-field label="blood" v-model="form.blood"  />

      <v-select :items="choices.gene" item-text="name" item-value="id" label="gene_id" v-model="form.gene_id"  />

      <v-select :items="choices.gender" item-text="name" item-value="id" label="gender_id" v-model="form.gender_id"  />
      <v-text-field label="gender_ect" v-model="form.gender_ect"  />

      <v-select :items="choices.origin" item-text="name" item-value="id" label="origin_id" v-model="form.origin_id"  />
      <v-select :items="choices.tooth" item-text="name" item-value="id" label="tooth_id" v-model="form.tooth_id"  />




      <v-text-field type="date" label="birth_date" v-model="form.birth_date"  />
      <v-text-field type="number" label="tooth_count" v-model="form.tooth_count"  />
      <v-text-field type="number"  label="age_age" v-model="form.age_age"  />
      <v-text-field type="number"  label="age_month" v-model="form.age_month"  />
      <v-text-field label="age_predict" v-model="form.age_predict"  />

      <v-text-field type="date" label="fatten_date" v-model="form.fatten_date"  />
      <v-text-field type="number"  label="breast" v-model="form.breast"  />
      <v-text-field type="number"  label="height" v-model="form.height"  />
      <v-text-field type="number"  label="long" v-model="form.long"  />
      <v-text-field type="number"  label="weight" v-model="form.weight"  />
      <v-text-field type="date" label="buy_date" v-model="form.buy_date"  />
      <v-text-field type="number"  label="price" v-model="form.price"  />
      <v-text-field label="status" v-model="form.status"  />
      <v-text-field label="created_at" v-model="form.created_at"  />
      <v-text-field label="updated_at" v-model="form.updated_at"  />
      <v-select :items="choices.bsc" item-text="name" item-value="id" label="bsc_id" v-model="form.bsc_id"  />




      <v-btn type='submit' large color='success' >บันทึก</v-btn>
    </form>
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
  form:any = {}
  group:any = null
  choices:any = {}

  toothVal:any = {}

  async getEnv(){

    this.choices = {
      gene:await Core.getHttp('/api/v1/tool/gene/'),
      gender:await Core.getHttp('/api/v1/tool/gender/'),
      tooth:await Core.getHttp('/api/v1/tool/tooth/'),
      origin:await Core.getHttp('/api/v1/tool/origin/'),
      bsc:await Core.getHttp('/api/v1/tool/bsc/'),
    }
  }

  async getOxen(){
    this.oxen = await Core.getHttp(`/api/v1/ox/ox/`)
  }



  async created() {
    await this.getEnv();
    await this.getOxen();
  }

  get user(){
    return Auth.user;
  }

  async saveData(){
    this.form.user = this.user.id
    let ox = await Core.postHttp(`/api/v1/ox/ox/`,this.form)
  }



}
</script>


<style>
.bgh{
  background: rgb(53,184,140);
  background: linear-gradient(180deg, rgba(53,184,140,1) 18%, rgba(17,140,87,1) 100%);
}
</style>
