(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{591:function(e,t,n){var content=n(610);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(25).default)("63daac72",content,!0,{sourceMap:!1})},609:function(e,t,n){"use strict";n(591)},610:function(e,t,n){var c=n(24)(!1);c.push([e.i,".bgh{background:#35b88c;background:linear-gradient(180deg,#35b88c 18%,#118c57)}",""]),e.exports=c},648:function(e,t,n){"use strict";n.r(t);n(42);var c=n(4),r=n(8),o=n(19),l=n(20),f=n(14),d=n(6),m=n(7),h=(n(50),n(15),n(137),n(60)),v=n(79),w=n(549),x=n.n(w);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,c=Object(d.a)(e);if(t){var r=Object(d.a)(this).constructor;n=Reflect.construct(c,arguments,r)}else n=c.apply(this,arguments);return Object(f.a)(this,n)}}var _=function(e,t,n,desc){var c,r=arguments.length,o=r<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(c=e[i])&&(o=(r<3?c(o):r>3?c(t,n,o):c(t,n))||o);return r>3&&o&&Object.defineProperty(t,n,o),o},y=function(e){Object(l.a)(h,e);var t,n,f,d,m=k(h);function h(){var e;return Object(r.a)(this,h),(e=m.apply(this,arguments)).text="hello world",e.currentId=e.$route.params.id,e.chooseKg=.4,e.data={},e.dialog=!1,e.form={},e.ranges=[{weight:"150",weight_max:"199",kg:"0.4",mcal:"4.17",g:"428",cal:"16",fos:"9"},{weight:"150",weight_max:"199",kg:"0.6",mcal:"4.66",g:"503",cal:"21",fos:"11"},{weight:"150",weight_max:"199",kg:"0.8",mcal:"5.17",g:"575",cal:"27",fos:"12"},{weight:"150",weight_max:"199",kg:"1",mcal:"5.69",g:"642",cal:"32",fos:"14"},{weight:"200",weight_max:"299",kg:"0.4",mcal:"5.18",g:"482",cal:"17",fos:"10"},{weight:"200",weight_max:"299",kg:"0.6",mcal:"5.79",g:"554",cal:"21",fos:"12"},{weight:"200",weight_max:"299",kg:"0.8",mcal:"6.42",g:"621",cal:"26",fos:"13"},{weight:"200",weight_max:"299",kg:"1",mcal:"7.06",g:"682",cal:"31",fos:"15"},{weight:"300",weight_max:"399",kg:"0.4",mcal:"7.02",g:"580",cal:"18",fos:"13"},{weight:"300",weight_max:"399",kg:"0.6",mcal:"7.84",g:"646",cal:"22",fos:"14"},{weight:"300",weight_max:"399",kg:"0.8",mcal:"8.69",g:"704",cal:"25",fos:"15"},{weight:"300",weight_max:"399",kg:"1",mcal:"9.57",g:"755",cal:"29",fos:"16"},{weight:"400",weight_max:"449",kg:"0.4",mcal:"8.71",g:"668",cal:"19",fos:"16"},{weight:"400",weight_max:"449",kg:"0.6",mcal:"9.73",g:"728",cal:"22",fos:"17"},{weight:"400",weight_max:"449",kg:"0.8",mcal:"10.79",g:"780",cal:"25",fos:"17"},{weight:"400",weight_max:"449",kg:"1",mcal:"11.87",g:"821",cal:"27",fos:"18"},{weight:"450",weight_max:"1000",kg:"0.4",mcal:"9.51",g:"710",cal:"20",fos:"17"},{weight:"450",weight_max:"1000",kg:"0.6",mcal:"10.63",g:"767",cal:"22",fos:"18"},{weight:"450",weight_max:"1000",kg:"0.8",mcal:"11.78",g:"815",cal:"24",fos:"19"},{weight:"450",weight_max:"1000",kg:"1",mcal:"12.96",g:"852",cal:"26",fos:"19"}],e}return Object(o.a)(h,[{key:"getEnv",value:(d=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.currentId=this.$route.params.id;case 1:case"end":return e.stop()}}),e,this)}))),function(){return d.apply(this,arguments)})},{key:"getOxen",value:(f=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.getHttp("/api/v1/ox/ox/".concat(this.currentId,"/"));case 2:this.form=e.sent;case 3:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)})},{key:"created",value:(n=Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getEnv();case 2:return e.next=4,this.getOxen();case 4:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)})},{key:"calculate",value:(t=Object(c.a)(regeneratorRuntime.mark((function e(){var t,n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=x.a.find(this.ranges,(function(data){return n.form.weight>=data.weight&&n.form.weight<=data.weight_max&&data.kg==n.chooseKg})),this.data=t,this.dialog=!0,console.log(t);case 4:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})}]),h}(h.Vue),O=y=_([Object(h.Component)({components:{}})],y),R=(n(609),n(52)),j=n(68),C=n.n(j),$=n(185),K=n(376),V=n(375),B=n(579),D=n(371),E=n(582),component=Object(R.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-4"},[n("form",{on:{submit:function(t){return t.preventDefault(),e.calculate()}}},[n("v-text-field",{staticClass:"p-2",attrs:{dense:"",type:"number",label:"อายุ (ปี)","prepend-inner-icon":"mdi-calendar"},model:{value:e.form.age_age,callback:function(t){e.$set(e.form,"age_age",t)},expression:"form.age_age"}}),e._v(" "),n("v-text-field",{staticClass:"p-2",attrs:{dense:"",type:"number",label:"อายุ (เดือน)","prepend-inner-icon":"mdi-calendar-today"},model:{value:e.form.age_month,callback:function(t){e.$set(e.form,"age_month",t)},expression:"form.age_month"}}),e._v(" "),n("v-text-field",{staticClass:"p-2",attrs:{dense:"",type:"number",label:"น้ำหนักเข้าขุน (กิโลกรัม)","prepend-inner-icon":"mdi-scale"},model:{value:e.form.weight,callback:function(t){e.$set(e.form,"weight",t)},expression:"form.weight"}}),e._v(" "),n("v-text-field",{staticClass:"p-2",attrs:{dense:"",label:"ปริมาณอาหารที่ให้ (กิโลกรัม)","prepend-inner-icon":"mdi-scale-balance"},model:{value:e.chooseKg,callback:function(t){e.chooseKg=t},expression:"chooseKg"}}),e._v(" "),n("v-btn",{staticClass:"w-full",attrs:{rounded:"",large:"",type:"submit",color:"success"}},[e._v("คำนวณ")])],1),e._v(" "),n("v-dialog",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",{attrs:{"primary-title":""}},[n("p",{staticClass:"text-xl text-blue-400 font-bold mt-4"},[e._v("คำแนะนำ")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"error",fab:"",small:""},on:{click:function(t){e.dialog=!1}}},[e._v("x")])],1),e._v(" "),e.dialog?n("v-card-text",[n("div",{staticClass:"p-4"},[n("v-text-field",{attrs:{label:"ปริมาณอาหารที่ให้","prepend-inner-icon":"mdi-scale-balance"},model:{value:e.chooseKg,callback:function(t){e.chooseKg=t},expression:"chooseKg"}}),e._v(" "),n("v-text-field",{attrs:{label:"โปรตีน (กรัม)","prepend-inner-icon":"mdi-egg-outline"},model:{value:e.data.g,callback:function(t){e.$set(e.data,"g",t)},expression:"data.g"}}),e._v(" "),n("v-text-field",{attrs:{label:"พลังงาน (kcal/kg)","prepend-inner-icon":"mdi-rice"},model:{value:e.data.kg,callback:function(t){e.$set(e.data,"kg",t)},expression:"data.kg"}}),e._v(" "),n("v-text-field",{attrs:{label:"แคลเซี่ยม (%)","prepend-inner-icon":"mdi-bone"},model:{value:e.data.cal,callback:function(t){e.$set(e.data,"cal",t)},expression:"data.cal"}}),e._v(" "),n("v-text-field",{attrs:{label:"ฟอสฟอรัส (%)","prepend-inner-icon":"mdi-food"},model:{value:e.data.fos,callback:function(t){e.$set(e.data,"fos",t)},expression:"data.fos"}})],1)]):e._e()],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;C()(component,{VBtn:$.a,VCard:K.a,VCardText:V.b,VCardTitle:V.c,VDialog:B.a,VSpacer:D.a,VTextField:E.a})}}]);