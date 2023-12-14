import { createApp } from 'vue'
import App from './App.vue'
import { prime } from './auxillary/prime'
import router from "@/router/router";

const app = createApp(App);
prime(app);
app.use(router);
app.mount('#app');
export  default  app;