<template>
  <div>
    <v-text-field
      type="date"
      label="วัน/เดือน/ปี ที่ตรวจท้อง"
      v-model="form.date_pregnant"
      prepend-inner-icon="mdi-calendar"
    />
    <v-select
      :items="['ท้อง', 'ไม่ท้อง']"
      item-text="name"
      item-value="id"
      label="ผลการตรวจการผสมพันธุ์"
      prepend-inner-icon="mdi-human-male-female"
      v-model="form.is_pregnant"
    />
    <v-text-field
      v-if="form.is_pregnant == 'ท้อง'"
      type="date"
      label="วันที่คาดว่าจะคลอด"
      v-model="form.date_test_birth"
      prepend-inner-icon="mdi-calendar"
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
  currentId: any = this.$route.query.id;
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
      `${apis}/breed/female/step5_test_pregnant/`,
      this.form
    );
    await Core.putHttp(`/api/v1/breed/female/breed/${this.currentId}/`, {
      step: 5,
      ox: this.breed.ox,
    });
    if (store.id) {
      await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, {
        status: "สำเร็จ",
      });
      // await this.$router.push(`/ox/breed?id=${this.currentId}`);
      await this.$emit("changeTab", 5);
    } else {
      await this.$emit("changeTab", 5);
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