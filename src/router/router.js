import {createRouter,createWebHistory} from "vue-router";
import LoginView from "@/components/login/LoginView.vue";
import HomeView from "@/components/HomeView.vue";
import TableView from "@/components/TableView.vue";

const routes = [
    {path:"/", component:LoginView, name:"LoginView", props:true},
    {path:"/home", component: HomeView, name:"HomeView", props:true},
    {path:"/table/:name/:id", component: TableView, name:"TableView", props:true}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;