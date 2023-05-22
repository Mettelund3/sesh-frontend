import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/pages/home.vue'
import Event from '../components/pages/Event.vue'
import EventDetaljer from '../components/pages/EventDetaljer.vue'
import NotFound from '../components/NotFound.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/event',
            name: 'event',
            component: Event
        },
        {
            path: '/eventdetaljer/:id',
            name: 'eventdetaljer',
            component: EventDetaljer,
            props:true
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFound
        },
    ]
})

export default router