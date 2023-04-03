import App from './App'
import uviewPlus from 'uview-plus';
import { createPinia } from 'pinia'
import { createSSRApp } from 'vue';
import Http from "./api/index.js";
import { $http } from '@escook/request-miniprogram'
import "./uni.scss";
// #ifdef VUE3
uni.Http = Http;
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus);
  app.use(createPinia())
  return {
    app
  }
}
// #endif