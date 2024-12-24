import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },{
        path: '/log/:id',
        name: 'log',
        component: () => import('../views/log.vue'),
    }


]

const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

const router: Router = createRouter(options)

export default router
