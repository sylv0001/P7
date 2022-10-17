import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import NewPass from '../views/NewPass.vue'
import SignUp from '../views/SignUp.vue'
import HoMe from '../views/HoMe.vue'
import PoSt from '../views/PoSt.vue'
import NotFound from '../views/404.vue'
import Delete from '../views/Delete.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/newpass',
    name: 'newpass',
    component: NewPass
  },
  {
    path: '/',
    name: 'home',
    component: HoMe
  },
  {
    path: '/post',
    name: 'post',
    component: PoSt
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  },
  {
    path: '/delete',
    component: Delete
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router