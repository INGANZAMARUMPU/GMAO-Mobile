// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Equipement from '../Rapport/equipement.vue'
import Base from '../../components/Base.vue'
import equipementSpecial from '../Rapport/equipementSpecial.vue'
import Infrastructure from '../Rapport/Infrastructure.vue'
const routes = [
  { path: '/', name: 'equipement', component: Base },
  { path: '/', name: 'eqRapport', component: Equipement },
  { path: '/equipementSpecial', name: 'equipement', component: equipementSpecial },
  { path: '/Infrastructure', name: 'Infrastructure', component: Infrastructure },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
