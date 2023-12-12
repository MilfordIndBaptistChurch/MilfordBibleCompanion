import { createRouter, createWebHistory } from 'vue-router'
import StudyView from '../views/StudyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'study',
      component: StudyView
    }
  ]
})

export default router
