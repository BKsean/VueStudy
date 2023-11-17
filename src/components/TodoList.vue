<template>
  <div v-for="(a,index) in todos" :key="a.id" class="card mt-2">
    <div class="card-body p-2">
      <div class="form-check">
        
        <input class="form-check-input" type="checkbox" :checked="a.completed" @change="toggleTodo(index)">  
        <label
o          class="frm-check-label" :style="a.completed ? complete : {}"
        :class="{active : a.completed}">{{ a.subject }}</label>
      </div>
      <button class="btn btn-danger btn-sm" @click="removeTodo(a.id)">삭제</button>
    </div>
  </div>
</template>

<script>

    export default{
        props: ['todos'],
        // props: {
        //     todos:{
        //         type: Array,
        //         required: true
        //     }
        // }
        emits: ['toggle-todo','delete-todo'],
        setup(props,{emit}){
            const toggleTodo=(index) =>{
                emit('toggle-todo',index); //부모 컴포넌트에 toggle-todo라는 이름으로 index데이터 전달
            }

            const removeTodo=(id) =>{
                emit('delete-todo',id); //부모 컴포넌트에 toggle-todo라는 이름으로 id데이터 전달
            }
            
            
            return{
            toggleTodo,removeTodo
        }
        }
        
    }
</script>

<style></style>

