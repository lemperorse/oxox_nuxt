import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"

@Module({generateMutationSetters: true})
class OxModule extends VuexModule {


  public currentBreed:any =null

  public async setBreed(breed:any){
    this.currentBreed = breed
  }



}

import store from "@/vuexes"
export const Ox = new OxModule({store, name: "Ox"})
