<template>
  <div>
    <v-overlay z-index="99" :value="loadX">
      <v-btn style="height:108px; width:108px;" color="white" fab     class=" animate__animated animate__pulse animate__infinite	infinite" >
        <img class="w-auto  h-24 " src="/017-cow.png" alt="">
      </v-btn>
      <h2 class="text-xl animate__animated animate__swing animate__infinite	infinite">{{loadTxt}}...</h2>
    </v-overlay>
  </div>

</template>

<script lang="ts">

import {Web} from "@/vuexes/web";
import {Component, Vue, Watch} from "nuxt-property-decorator";

@Component({
  components: {

  },
  computed: {}
})

export default class dddd extends Vue {

  overlay:any =  true


  async created() {

  }

  get loadX(){
    return Web.loading
  }

  get loadTxt(){
    return Web.loadTxt
  }

}
</script>
