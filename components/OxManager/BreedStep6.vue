<template>
  <div>
    <pre>{{ breed }}</pre>
    <v-text-field
      type="date"
      label="วัน/เดือน/ปี ที่คลอดจริง"
      v-model="form.date_test_birth"
      prepend-inner-icon="mdi-calendar"
    />
    <v-select
      :items="['คลอดสำเร็จ', 'แท้ง']"
      item-text="name"
      item-value="id"
      label="ผลการคลอด"
      prepend-inner-icon="mdi-human-male-female"
      v-model="form.result"
    />
    <v-btn
      @click="saveStepOne()"
      class="w-full"
      type="submit"
      rounded
      large
      color="success"
      >ต่อไป</v-btn
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import _ from "lodash";
import { Core } from "@/vuexes/core";
import { Auth } from "@/vuexes/auth";
import { Web } from "@/vuexes/web";
const api = "/api/v1/ox_manager";
const apis = "/api/v1";
const tool = "/api/v1/tool";
import { Ox } from "@/vuexes/ox";

@Component({
  components: {},
})
export default class Food extends Vue {
  breed: any = Ox.currentBreed;
  currentId: any = this.breed.ox;
  response: boolean = true;
  dialog: boolean = false;
  lists: any = [];
  form: any = {};
  choices: any = {};

  dataBreed: any = {};
  checkForm: any = {};
  async getEnv() {
    this.choices = {
      gene: await Core.getHttp("/api/v1/tool/gene/"),
      marker: await Core.getHttp("/api/v1/tool/maintainmaker/"),
    };
  }
  async saveStepOne() {
    this.form.breed = this.breed.id;
    let store = await Core.postHttp(
      `${apis}/breed/female/step6_birth/`,
      this.form
    );
    await Core.putHttp(`/api/v1/breed/female/breed/${this.currentId}/`, {
      step: 6,
      ox: this.breed.ox,
      finished: true,
    });
    if (store.id) {
      await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, {
        status: "สำเร็จ",
      });
      await this.$router.push(`/ox/${this.currentId}`);
    } else {
      await this.$router.push(`/ox/${this.currentId}`);
    }

    console.log(this.currentId);
  }
  async created() {
    await this.getEnv();
  }
  convertDate(date: any) {
    return Web.convertDate(date);
  }
}
</script>

<style>
</style>