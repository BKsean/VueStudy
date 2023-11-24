<!-- eslint-disable vue/multi-word-component-names -->
<template lang="">
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal-wrapper">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="title"></slot>
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
        {{todoId}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteTodo(false)">Close</button>
        <button type="button" class="btn btn-primary" @click="deleteTodo(true)">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
    props : {
        todoId : {
            type : Number
        },
    },
    emits: ['remove-todo'],
    setup(props,context){

        const deleteTodo = (deleteTodo) =>{
            context.emit('remove-todo',{
             id: props.todoId,
             removeYN : deleteTodo
             });
        }
        
        return {
            deleteTodo
        }
    }
}
</script>
<style >
    .modal-wrapper{
        z-index: 100;
        position: fixed;
        top:0; 
        left: 0;
        width:100%; 
        height:100%;
        background-color: rgb(0,0,0,0.5);
     
    }
   
</style>