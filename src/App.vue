<template>
<div class="container">
  <input class="form-control" type="text" v-model="searchText">
    
  <TodoSimpleForm @add-todo="addTodo" />
  <div v-if="!searchTodo.length">추가된 Todo가 없습니다.</div>
  <TodoList :todos="searchTodo" @toggle-todo="toggleTodo" @delete-todo="removeTodo"/>
  <div v-if="errorMesage.length > 0">{{ errorMesage }}</div>
</div>
</template>

<script>
// import e from 'express';
import { ref} from 'vue';
import TodoSimpleForm from './components/TodoSimple.vue';
import TodoList from './components/TodoList.vue'
import { computed } from '@vue/reactivity';
import axios from 'axios';

export default {
  components:{
    TodoSimpleForm,
    TodoList,
},
  setup() {
    const todos = ref([]);
    const searchText = ref('');
    const errorMesage = ref('');
    const complete = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const getTodos = async () =>{
      try {
        const res = await axios.get('http://localhost:3000/todos');  
        console.log(res);
        todos.value = res.data;
      } catch (error) {
        console.log(error);
      }
      
    }

    getTodos();

    const addTodo = async (object) => {
      //데이터베이스에 todo저장 post request이용
      try {
        const res = await axios.post('http://localhost:3000/todos',{
        subject: object.subject,
        completed: object.completed
      });
      todos.value.push(res.data);  
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
    try {
      await axios.delete("http://localhost:3000/todos/"+id);
       //todos.value.splice(index,1);
       getTodos();
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
    const toggleTodo = async (index)=>{
      const id = todos.value[index].id;
      const completedValue = todos.value[index].completed;
      try {
        await axios.patch('http://localhost:3000/todos/'+id,{
          completed: !completedValue
        });
        todos.value[index].completed = !todos.value[index].completed;  
      } catch (error) {
        console.log(error);
        errorMesage.value = error.errorMesage;
      }
      
      
    }

    const searchTodo = computed(()=>{
      if(searchText.value){
        return todos.value.filter((value) =>{
          return value.subject.includes(searchText.value);
      })
      }else{
        return todos.value;
      }
      
    });
  

  return {
    todos,complete,addTodo,removeTodo,toggleTodo,searchText,searchTodo
   ,errorMesage
 
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