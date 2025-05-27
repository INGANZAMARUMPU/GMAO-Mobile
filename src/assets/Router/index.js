// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Equipement from '../Rapport/equipement.vue'
import Base from '../../components/Base.vue'
// import equipementSpecial from '../Rapport/equipementSpecial.vue'
// import Infrastructure from '../Rapport/Infrastructure.vue'
import Inventaire from '../../components/GroupEquipement/inventaire.vue'
import PlanMaintenance from '../../components/GroupEquipement/PlansMaintenance.vue'
import Operation from '../../components/GroupEquipement/Operation.vue'

const routes = [
  { path: '/base', name: 'equipement', component: Base },
  { path: '/', name: 'eqRapport', component: Equipement },
  // { path: '/equipementSpecial', name: 'equipement', component: equipementSpecial },
  // { path: '/Infrastructure', name: 'Infrastructure', component: Infrastructure },
  { path: '/Inventaire', name: 'Inventaire', component: Inventaire },
  { path: '/Plan', name: 'Plan', component: PlanMaintenance },
  { path: '/Operation', name: 'Operation', component: Operation },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
