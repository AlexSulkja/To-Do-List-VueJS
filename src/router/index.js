import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import ArchiveCompleted from '../components/ArchiveCompleted.vue'
import ToDoList from '../components/ToDoList.vue'
// import DoLogin from '../components/DoLogin.vue'
// import DoRegister from '../components/DoRegister.vue'


const routes = [
  /* {
    path: '/login',
    name: 'Login',
    component: DoLogin
  },  

  {
    path: '/registration',
    name: 'Register',
    component: DoRegister
  },  */
  
  {
    path: '/',
    name: 'ToDoList',
    component: ToDoList
  },  

  {
    path: '/archive',
    name: 'Archive',
    component: ArchiveCompleted
  },  

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
