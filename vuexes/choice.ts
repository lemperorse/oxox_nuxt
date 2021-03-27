import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
import _ from "lodash"

@Module({generateMutationSetters: true})
class ChoiceModule extends VuexModule {





}

import store from "@/vuexes"
export const Choice = new ChoiceModule({store, name: "Choice"})
