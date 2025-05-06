// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Equipement from '../Rapport/equipement.vue'
import Base from '../../components/Base.vue'

const routes = [
  // { path: '/', name: 'equipement', component: Base },
  { path: '/', name: 'eqRapport', component: Equipement },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
