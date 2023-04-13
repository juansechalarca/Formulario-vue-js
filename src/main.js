import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarDays,
  faEnvelope,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowCircleDown, faLock } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faEnvelope,
  faUser,
  faCalendarDays,
  faLock,
  faArrowCircleDown,
  faInstagram,
  faTwitter,
  faYoutube
);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
