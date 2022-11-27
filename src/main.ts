import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import "./assets/css/main.scss";

// const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:8000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// createApp(App).use(router).use(cors(corsOptions)).mount("#app");

createApp(App).use(router).mount("#app");
