import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import {Core} from "@/vuexes/core";


@Module({generateMutationSetters: true})
class CityClass extends VuexModule {

  public dialogCityState: boolean = false;

  public currentGeo: any | null = null
  public currentProvince: any | null = null
  public currentAmphur: any | null = null
  public currentDistrict: any | null = null
  public showName: string | null = null


  public async getGeo(): Promise<any> {
    return await Core.getHttp('/api/v1/location/geography/')
  }

  public async getProvince(geo: any): Promise<any> {
    return await Core.getHttp(`/api/v1/location/province/?geo=${geo}`)
  }

  public async getAmphur(province: any): Promise<any> {
    return await Core.getHttp(`/api/v1/location/amphur/?province=${province}`)
  }

  public async getDistrict(amphur: any): Promise<any> {
    return await Core.getHttp(`/api/v1/location/district/?amphur=${amphur}`)
  }

  public async setShowName() {
    let province: any = this.currentProvince?.name
    let geo: any = this.currentGeo?.name
    let amphur: any = this.currentAmphur?.name
    let district: any = this.currentDistrict?.name
    this.showName = `${geo}-${province}-${amphur}-${district}`
  }


}

import store from "@/vuexes"

export const City = new CityClass({store, name: "City"})
