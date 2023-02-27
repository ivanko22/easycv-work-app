import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

// createApp(App).use(pinia).use(router).mount("#app");

// app.use(createPinia()) // Create the root store
// app.use(router)
