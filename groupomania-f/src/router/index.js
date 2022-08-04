import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import NewPass from '../views/NewPass.vue'
import SignUp from '../views/SignUp.vue'
import HoMe from '../views/HoMe.vue'
import PoSt from '../views/PoSt.vue'

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
    path: '/home',
    name: 'home',
    component: HoMe
  },
  {
    path: '/post',
    name: 'post',
    component: PoSt
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
