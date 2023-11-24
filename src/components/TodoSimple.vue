<template>
  <h2>해야 할일</h2>
  <form @submit.prevent="onSubmit" class="d-flex">
    <div class="flex-grow-1 mr-2">
      <input class="form-control" type="text" v-model="todo">
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Add</button>  
    </div>
    <div v-show="emptySubject">해야할 일을 입력하지 않았습니다.</div> 
  </form>
</template>

<script>
import {ref, } from 'vue';
export default{
    emits:['add-todo'],
    setup(props,context){
        const todo = ref('');
        const emptySubject=ref(false);
        
        const onSubmit = () => {
        if(todo.value.trim().length == 0){
            emptySubject.value = true;
        }else{
            context.emit('add-todo',{
             id: Date.now(),
             subject: todo.value,
             completed:false
             });
            emptySubject.value = false;
            
            todo.value='';
        }
    
      }

      

        return{
            onSubmit,todo,emptySubject
        }
    }
}
</script>

<style></style>