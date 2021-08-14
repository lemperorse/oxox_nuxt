<template>
  <div>
    <v-text-field
      type="date"
      label="วัน/เดือน/ปี ที่ผสม"
      v-model="form.date_breed"
      prepend-inner-icon="mdi-calendar"
    />
    <v-select
      :items="['ผสมพันธุ์ตามธรรมชาติ', 'ผสมพันธุ์เทียม']"
      item-text="name"
      item-value="id"
      label="ประเภทการผสมพันธุ์"
      prepend-inner-icon="mdi-human-male-female"
      v-model="form.breed_type"
    />
    <div v-if="form.breed_type == 'ผสมพันธุ์ตามธรรมชาติ'">
      <v-text-field
        label="หมายเลขพ่อพันธุ์"
        v-model="form.male_number"
        prepend-inner-icon="mdi-human"
      />
      <v-text-field
        label="ชื่อโคพ่อพันธุ์"
        v-model="form.male_name"
        prepend-inner-icon="mdi-human"
      />
      <v-select
        required
        dense
        class="p-2"
        :items="choices.gene"
        item-text="name"
        item-value="id"
        label="พันธุ์โค"
        v-model="form.gene"
        prepend-inner-icon="mdi-certificate-outline"
      />
      <v-text-field
        label="ค่าใช้จ่าย"
        v-model="form.ai_price"
        prepend-inner-icon="mdi-human"
      />
    </div>
    <div v-if="form.breed_type == 'ผสมพันธุ์เทียม'">
      <v-text-field
        label="ชื่อพ่อพันธุ์"
        v-model="form.male_number"
        prepend-inner-icon="mdi-human"
      />
      <v-text-field
        label="เบอร์หูพ่อพันธุ์"
        v-model="form.male_name"
        prepend-inner-icon="mdi-human"
      />
      <v-select
        required
        dense
        class="p-2"
        :items="choices.gene"
        item-text="name"
        item-value="id"
        label="พันธุ์โค"
        v-model="form.gene"
        prepend-inner-icon="mdi-certificate-outline"
      />
      <v-text-field
        label="ค่าใช้จ่าย"
        v-model="form.ai_price"
        prepend-inner-icon="mdi-human"
      />
      <v-text-field
        label="เปอร์เซ็นต์เลือด"
        v-model="form.ai_blood_percent"
        prepend-inner-icon="mdi-human"
      />
      <v-text-field
        label="ผลิตโดย"
        v-model="form.ai_by"
        prepend-inner-icon="mdi-human"
      />
      <v-select
        required
        dense
        class="p-2"
        :items="choices.marker"
        item-text="name"
        item-value="id"
        label="ผู้ให้บริการผสมเทียม"
        v-model="form.ai_service_maker"
        prepend-inner-icon="mdi-certificate-outline"
      />
    </div>
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
      `${apis}/breed/female/step3_breed/`,
      this.form
    );
    await Core.putHttp(`/api/v1/breed/female/breed/${this.currentId}/`, {
      step: 3,
      ox: this.breed.ox,
    });
    if (store.id) {
      await Core.putHttp(`/api/v1/ox/ox/${this.currentId}/`, {
        status: "สำเร็จ",
      });
      // await this.$router.push(`/ox/breed?id=${this.currentId}`);
      await this.$emit("changeTab", 3);
    } else {
      await this.$emit("changeTab",3);
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