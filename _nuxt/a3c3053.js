(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{586:function(e,t,r){var content=r(664);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(25).default)("8b52867c",content,!0,{sourceMap:!1})},663:function(e,t,r){"use strict";r(586)},664:function(e,t,r){var n=r(24)(!1);n.push([e.i,".bgh{background:#35b88c;background:linear-gradient(180deg,#35b88c 18%,#118c57)}.bg{background-image:url(https://images.pexels.com/photos/5867858/pexels-photo-5867858.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);background-position:50%;background-repeat:no-repeat;background-size:cover}",""]),e.exports=n},714:function(e,t,r){"use strict";r.r(t);var n=r(4),o=(r(48),r(31),r(54),r(57),r(94),r(43)),l={layout:"root",data:function(){return{form:{}}},methods:{login:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.login(e.form);case 2:if(1!=t.sent){t.next=8;break}return t.next=6,e.$router.replace("/");case 6:return t.next=8,location.reload();case 8:case"end":return t.stop()}}),t)})))()}}},c=(r(663),r(50)),d=r(67),f=r.n(d),m=r(175),v=r(578),x=r(366),w=r(605),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bgh"},[r("div",{staticClass:"h-screen flex justify-center items-center p-2"},[r("v-card",{staticClass:"w-full md:w-1/2 rounded-xl elevation-8"},[r("v-card-title",[r("p",{staticClass:"text-xl font-bold text-green-600"},[e._v("เข้าสู่ระบบ"),r("br"),e._v(" "),r("span",{staticClass:"text-base font-thin"},[e._v("ระบบจัดการโคขุน")])]),e._v(" "),r("br")]),e._v(" "),r("v-card-text",[r("form",{on:{submit:function(t){return t.preventDefault(),e.login()}}},[r("v-text-field",{attrs:{required:"",filled:"",label:"ชื่อผู้ใช้ หรือ เบอร์โทรศัพท์",rounded:"","prepend-inner-icon":"mdi-face"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}}),e._v(" "),r("v-text-field",{attrs:{required:"",type:"password",filled:"",label:"รหัสผ่าน",rounded:"","prepend-inner-icon":"mdi-form-textbox-password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),r("v-btn",{staticClass:"w-full",attrs:{large:"",color:"success",type:"submit",rounded:""}},[e._v("เข้าสู่ระบบ")]),e._v(" "),r("br"),r("br"),e._v(" "),r("v-btn",{staticClass:"w-full font-bold",attrs:{text:"",large:"",rounded:"",color:"primary"},on:{click:function(t){return e.$router.push("/auth/register")}}},[e._v("สมัครสมาชิก")])],1)])],1)],1)])}),[],!1,null,null,null);t.default=component.exports;f()(component,{VBtn:m.a,VCard:v.a,VCardText:x.a,VCardTitle:x.b,VTextField:w.a})}}]);