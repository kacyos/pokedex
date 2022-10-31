import Vue from "vue";
import App from "./App.vue";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

Vue.config.productionTip = false;

Vue.use(mdiVue, {
  icons: mdijs,
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
