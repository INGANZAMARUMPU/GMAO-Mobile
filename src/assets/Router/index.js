// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Equipement from '../Rapport/equipement.vue'
import Base from '../../components/Base.vue'
import equipementSpecial from '../Rapport/equipementSpecial.vue'
import Infrastructure from '../Rapport/Infrastructure.vue'
import Login from '../../components/Login.vue'
import OperationMaintenance from '../Nouveau/OperationMaintenance.vue'
import PlanMaintenance from '../Nouveau/PlanMaintenance.vue'


const routes = [
  { path: '/base', name: 'equipement', component: Base },
  { path: '/equipement', name: 'eqRapport', component: Equipement },
  { path: '/equipementSpecial', name: 'equipement', component: equipementSpecial },
  { path: '/Infrastructure', name: 'Infrastructure', component: Infrastructure },
  { path: '/PlanMaintenance', name: 'PlanMaintenance', component: PlanMaintenance },
  { path: '/OperationMaintenance', name: 'OperationMaintenance', component: OperationMaintenance },
  { path: '/', name: 'Login', component: Login },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
