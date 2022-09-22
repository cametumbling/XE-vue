import { createRouter, createWebHistory } from "vue-router";
import SearchView from "../views/SearchView.vue";
import CityView from "../views/CityView.vue";
import TabsView from "../views/TabsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TabsView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityView,
    },
  ],
});

export default router;
