import { createRouter,createWebHistory } from "vue-router";
import Home from '../pages/index.vue'
import Todos from '../pages/todos/index.vue'
const router = createRouter({
    history:createWebHistory(), //다른종류및 의미는 api문서 확인
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/todos',
            name:'todos',
            component:Todos
        },
        // {
        //     path:'/todos/create',
        //     name:'createTodos',
        //     component:''
        // },
        // {
        //     path:'/',
        //     name:'home',
        //     component:''
        // },
    ]//url정보
});
// 1.home 2. /todos 3. /todos/create 4. /todos/:id
export default router;