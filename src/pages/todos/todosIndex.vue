<template>
    
  <div>
  
    <input class="form-control" type="text" v-model="searchText">

    <button class="btn btn-primary" @click="moveToCreate">create todo</button>

    
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="removeTodo"/>
    <div v-if="errorMesage.length > 0">{{ errorMesage }}</div>
  
    <hr/>
    <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" v-show="currentPage !== 1">
        <a class="page-link" href="#" @click="getTodos(currentPage-1)">Previous</a></li>
      <li 
        v-for="page in numberOfPages" :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''">
        <a class="page-link" href="#" @click="getTodos(page)">{{page}}</a>
      </li>
  
      <li class="page-item" v-show="currentPage !== numberOfPages">
        <a class="page-link" href="#" @click="getTodos(currentPage+1)">Next</a>
      </li>
    </ul>
  </nav>
  {{ currentPage }}
  </div>
  </template>
  
  <script>
  // import e from 'express';
  import { ref,watch} from 'vue';
  
  import TodoList from '@/components/TodoList.vue'
  import { computed } from '@vue/reactivity';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    components:{
      
      TodoList,
  },
    setup() {
      const todos = ref([]);
      const searchText = ref('');
      const errorMesage = ref('');
      const numberOfTodos = ref(0);
      const limit = 5;
      const currentPage = ref(1);
      const maxPage = 5;
      const numberOfPages = computed(()=>{
        return Math.ceil(numberOfTodos.value/limit);
      })
      const router = useRouter();
  
      // watchEffect(()=>{
      //   console.log(numberOfPages.value);
      // })
      watch(currentPage,(currentPage,prev) =>{
        console.log(currentPage,prev);
      })
   
      const complete = {
        textDecoration: 'line-through',
        color: 'gray'
      }
  
      const getTodos = async (cp) =>{
        currentPage.value = cp;
        try {
          const res = await axios.get(`http://localhost:3000/todos?_page=${currentPage.value}&_limit=${limit}&subject_like=${searchText.value}&_sort=id&_order=desc`);  
          numberOfTodos.value = res.headers['x-total-count']
          //console.log(res);
          todos.value = res.data;
        } catch (error) {
          console.log(error);
        }
        
      }
     
      getTodos(currentPage.value);
  
      const addTodo = async (object) => {
        //데이터베이스에 todo저장 post request이용
        try {
          await axios.post('http://localhost:3000/todos',{
          subject: object.subject,
          completed: object.completed
        });
        getTodos(1);
        //todos.value.push(res.data);  
        } catch (error) {
          errorMesage.value = error.message;
          console.log(error);
        }
        
        // .then(res=>{
        //   console.log(res);
        //   todos.value.push(res.data);
        // }).catch(err =>{
        //   errorMesage.value = err.message;
        //   console.log(err);
        // })
      }
  
      const removeTodo = async (id)=>{
        console.log(id);
      try {
        await axios.delete("http://localhost:3000/todos/"+id);
         //todos.value.splice(index,1);
         getTodos(currentPage.value);
        //todos.value.pop(id); 
      } catch (error) {
        console.log(error);
        errorMesage.value = error.errorMesage;
      }
       
      }
  
    // const updateName = (e) =>{
    //   console.log(e.target.value);
    //   name.value = e.target.value;
    // }
      const toggleTodo = async (index,checked)=>{
        const id = todos.value[index].id;
        console.log(checked);
        //const completedValue = todos.value[index].completed;
        try {
          await axios.patch('http://localhost:3000/todos/'+id,{
            completed: checked
          });
          todos.value[index].completed = checked;  
        } catch (error) {
          console.log(error);
          errorMesage.value = error.errorMesage;
        }

      }
  
      // const searchTodo = computed(()=>{
      //   if(searchText.value){
      //     return todos.value.filter((value) =>{
      //       return value.subject.includes(searchText.value);
      //   })
      //   }else{
      //     return todos.value;
      //   }
        
      // });
      let timeout= null;
        watch(searchText,async()=>{ 
          clearTimeout(timeout);
          
          timeout = setTimeout(()=>{
            getTodos(1);          
          },1500)
          
        })
  
        const moveToCreate = () =>{
          router.push({
            name : 'TodoCreate'
          })
        }
    return {
      todos,complete,addTodo,removeTodo,toggleTodo,searchText
     ,errorMesage,numberOfPages,currentPage,maxPage,getTodos,moveToCreate
   
     }
    },
  }
  </script>
  
  <style>
  
  .active{
    font-size: 20px;
    color: rgb(19, 19, 212);
  }
  </style>
  <!--
  <script>
  import HelloWorld from './components/HelloWorld.vue'
  
  export default {
    name: 'App',
    components: {
      HelloWorld
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  -->