import { createRouter,createWebHistory } from "vue-router";
import Home from '../pages/mainIndex.vue'
import Todos from '../pages/todos/todosIndex.vue'
import Todo from '../pages/todos/_id.vue'
import TodoCreate from '@/pages/todos/create/createIndex.vue'
const router = createRouter({
    history:createWebHistory(), //다른종류및 의미는 api문서 확인
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/todos',
            name:'Todos',
            component:Todos
        },
        {
            path:'/todo/create',
            name:'TodoCreate',
            component:TodoCreate
        },
        {
            path:'/todos/:id',
            name:'Todo',
            component:Todo
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