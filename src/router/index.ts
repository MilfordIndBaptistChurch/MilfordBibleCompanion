import { createRouter, createWebHistory } from 'vue-router'
import StudyView from '../views/StudyView.vue'
import FavView from '../views/FavView.vue'

const commonRouteProperties = { component: StudyView }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'study',
      ...commonRouteProperties
    },
		{
      path: '/:ref',
      name: 'studyRef',
      ...commonRouteProperties
    },
    {
      path: '/fav',
      name: 'fav',
      component: FavView
    }
  ]
})

export default router
