
import MidRouterView from "@/components/MidRouterView.vue";

const List = () => import("@/views/article/list.vue");

const routes = {
  path: "/article",
  redirect: "/article/article",
  component: MidRouterView,
  children: [
    {
      path: "list",
      name: "list",
      meta: {
        title: "列表 demo",
        hideHeader: true,
      },
      component: List,
    },
  ],
};

export default routes;
