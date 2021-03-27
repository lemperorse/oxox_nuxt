<template>
 <div>
   <v-app  id="inspire">
     <v-app-bar v-if="response"  app flat color="blue">
       <v-app-bar-nav-icon></v-app-bar-nav-icon>
       <v-spacer></v-spacer>

       <v-spacer></v-spacer>
       <v-app-bar-nav-icon @click="logout()"></v-app-bar-nav-icon>
     </v-app-bar>
     <v-main  >
  <Core-Loading />
       <Core-City />
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
export default class Layout extends Vue {


  user:any = null
  response:boolean = false;
  async created() {
    await Auth.checkToken();
    this.user =  await Auth.setUser();
    await this.checkUser();
    this.response = (this.user.id)?true:false;
  }

  async logout(){
    await Auth.logout();
    await location.reload();
  }

  async checkUser(){
      let user = await Auth.getUser();
      if(!user.id){
        await this.$router.replace(`/auth/login`)
      }
  }


}
</script>

<style  >

</style>
