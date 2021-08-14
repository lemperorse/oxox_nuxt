<template>
  <div>
    <v-card-title>
      <v-icon @click="$router.go('-1')">mdi-arrow-left</v-icon>
    </v-card-title>
    <v-container>
      <v-tabs v-model="tab">
        <v-tab>การเหนี่ยวนำ</v-tab>
        <v-tab-item>
          <OxManagerBreedStep1 @changeTab="changeTab"></OxManagerBreedStep1>
        </v-tab-item>
        <v-tab>การเป็นสัด</v-tab>
        <v-tab-item>
          <OxManagerBreedStep2 @changeTab="changeTab"></OxManagerBreedStep2>
        </v-tab-item>
        <v-tab>การผสมพันธุ์</v-tab>
        <v-tab-item>
          <OxManagerBreedStep3 @changeTab="changeTab"></OxManagerBreedStep3>
        </v-tab-item>
        <v-tab>ตรวจการกลับสัด</v-tab>
        <v-tab-item>
          <OxManagerBreedStep4 @changeTab="changeTab"></OxManagerBreedStep4>
        </v-tab-item>
        <v-tab>ตรวจการท้อง</v-tab>
        <v-tab-item>
          <OxManagerBreedStep5 @changeTab="changeTab"></OxManagerBreedStep5>
        </v-tab-item>
        <v-tab>ผลการคลอด</v-tab>
        <v-tab-item>
          <OxManagerBreedStep6 @changeTab="changeTab"></OxManagerBreedStep6>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { Core } from "@/vuexes/core";
import { Auth } from "@/vuexes/auth";
import moment from "moment";
import _ from "lodash";
const apis = "/api/v1";
@Component({
  components: {},
})
export default class Farm extends Vue {
  oxen: any = null;
  form: any = {
    sex: this.$route.query.type,
  };
  group: any = null;
  dialog: boolean = false;
  choices: any = {};
  tab: Number = 0;
  toothVal: any = {};
  lists: any = [];
  SEX: any = this.$route.query.type;
  currentId: any = this.$route.query.id;

  async changeTab(val: any) {
    this.tab = val;
  }
  async getEnv() {
    this.lists = await Core.getHttp(
      `${apis}/breed/female/breed/?ox=${this.currentId}`
    );
    this.tab = this.lists.step;
  }
}
</script>

<style>
.bgh {
  background: rgb(53, 184, 140);
  background: linear-gradient(
    180deg,
    rgba(53, 184, 140, 1) 18%,
    rgba(17, 140, 87, 1) 100%
  );
}
</style>
