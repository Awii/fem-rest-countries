import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/styles/styles.css";

import vueDebounce from "vue-debounce";
Vue.use(vueDebounce);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoon as farMoon } from "@fortawesome/free-regular-svg-icons";
import {
  faMoon as fasMoon,
  faSearch,
  faChevronDown,
  faLongArrowAltLeft,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  farMoon,
  fasMoon,
  faSearch,
  faChevronDown,
  faLongArrowAltLeft,
  faArrowLeft
);
Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
