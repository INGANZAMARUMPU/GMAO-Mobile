import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./assets/Router/index";
import Vue3TouchEvents from "vue3-touch-events";
import { createVfm } from "vue-final-modal";
import "vue-final-modal/style.css";
import { QrcodeStream } from "vue-qrcode-reader";
import store from "./assets/store/index";
import mixins from "../mixins";
import axios from "./axios";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";

const app = createApp(App);
const vfm = createVfm();
app.use(router);
app.use(Vue3TouchEvents, {tapTolerance: 10,swipeTolerance: 30,longTapTimeInterval: 400});
app.component("QrcodeStream", QrcodeStream);
app.use(vfm);
app.mixin(mixins);
app.use(store);
async function replayOfflineRequests() {
  const stored = JSON.parse(localStorage.getItem("offlineRequests") || "[]");
  if (stored.length === 0) return;

  console.log(`🔁 Tentative de réexécution de ${stored.length} requêtes...`);
  for (const req of stored) {
    try {
      const response = await axios({
        method: req.method,
        url: req.url,
        data: req.data,
      });
      console.log("✅ Requête rejouée avec succès :", response.data);
    } catch (e) {
      console.error("❌ Échec lors de la réexécution d’une requête :", e);
    }
  }
  localStorage.removeItem("offlineRequests");
}
window.axios = axios;
window.addEventListener("online", () => {
  console.log("📡 Connexion restaurée. Relecture des requêtes hors ligne...");
  replayOfflineRequests();
});

app.mount("#app");
if (Capacitor.isNativePlatform()) {
  CapacitorApp.addListener("backButton", ({ canGoBack }) => {
    if (!canGoBack || window.history.state.back == null) {
      CapacitorApp.exitApp();
    } else {
      window.history.back();
    }
  });
}
