import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
// import Login from '@/components/login'
import News from '@/components/news/list'


Vue.use(Router);

const router = new Router({
  mode:'history',
  routes: [
    // {
    //   path:'/',
    //   name:'login',
    //   component:Login,
    // },
    {
      path:'/',
      name:'index',
      component:Index,
      children:[

        {
          path:'/news',
          name:'news',
          component:News
        },

      ]
    }
  ]
})
export default router;

