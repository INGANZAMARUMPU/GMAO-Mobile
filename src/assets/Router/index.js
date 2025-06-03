// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Equipement from '../Rapport/equipement.vue'
import Inventaire from '../../components/GroupEquipement/inventaire.vue'
import PlanMaintenance from '../../components/GroupEquipement/PlansMaintenance.vue'
import Operation from '../../components/GroupEquipement/Operation.vue'
import Infrastructure from '../../components/GroupEquipement/Infrastructure.vue'

const routes = [
  { path: '/', name: 'eqRapport', component: Equipement },
  { path: '/Inventaire', name: 'Inventaire', component: Inventaire },
  { path: '/Plan', name: 'Plan', component: PlanMaintenance },
  { path: '/Operation', name: 'Operation', component: Operation },
  { path: '/Infrastructure', name: 'Infrastructure', component: Infrastructure },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
