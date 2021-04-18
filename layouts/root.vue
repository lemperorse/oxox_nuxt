<template>
  <div>
    <v-app  id="inspire">

      <v-main>
        <Nuxt />
      </v-main>

    </v-app>



  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "nuxt-property-decorator"
import {Auth} from '@/vuexes/auth'
@Component({
  components: {   },
})
export default class Root extends Vue {

  async created() {
    let user = await Auth.getUser();

  }

}
</script>

<style  >

</style>
