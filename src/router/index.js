import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/pages/Home.vue'
import Event from '../components/pages/Event.vue'
import EventDetaljer from '../components/pages/EventDetaljer.vue'
import NotFound from '../components/NotFound.vue'


const routes = [
    {
        path: '/',
        component: Home
    }, 
    {
        path: '/Event',
        component: Event
    },
    {
        path: '/EventDetaljer',
        component: EventDetaljer
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },
  

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router