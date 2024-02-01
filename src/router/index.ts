import { createRouter, createWebHistory } from 'vue-router'
import StudyView from '../views/StudyView.vue'

const commonRouteProperties = { component: StudyView }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      ...commonRouteProperties,
      name: 'study',
      component: StudyView
    },
		{
      path: '/:ref',
      name: 'studyRef',
      ...commonRouteProperties
    }
  ]
})

export default router
