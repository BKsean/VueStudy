<template>

<TodoSimpleForm @add-todo="addTodo" />
<div v-if="!todos.length">추가된 Todo가 없습니다.</div>
<TodoList :todos="todos" @toggle-todo="toggleTodo" @delete-todo="removeTodo"/>

</template>

<script>
// import e from 'express';
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimple.vue';
import TodoList from './components/TodoList.vue'
export default {
  components:{
    TodoSimpleForm,
    TodoList,
},
  setup() {
    const todos = ref([]);
    
    const complete = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const addTodo = (object) => {
        todos.value.push(object);
    }

    const removeTodo = (id)=>{
        todos.value.pop(id);
    }

  // const updateName = (e) =>{
  //   console.log(e.target.value);
  //   name.value = e.target.value;
  // }
    const toggleTodo = (index)=>{
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    }

  return {
    todos,complete,addTodo,removeTodo,toggleTodo
 
   }
  },
}
</script>

<style>

.active{
  font-size: 15px;
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