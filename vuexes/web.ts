import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"
import moment from 'moment'

@Module({generateMutationSetters: true})
class WebModule extends VuexModule {
  public loading: boolean =  false;
  public loadTxt:any = 'กำลังโหลด'
  public async switchLoad(load:boolean ){
    //  this.loadTxt = 'กำลังโหลด'
    this.loading = load
  }

  public async onLoad(txt:string){
    this.loadTxt = txt
    this.loading = true
  }

  public async offLoad(){
    this.loading = false
  }

  public fillData(arr:any,key:string,val:any){
    return _.find(arr,(r)=>{ return r[key] == val  })
  }

  convertDate(date:any) {
    return moment(date).format('DD/MM/YYYY');
}



}

import store from "@/vuexes"
export const Web = new WebModule({store, name: "Web"})
