<template>
  <List
    :items="todos"
  >
  <template #listTemplate="slotProps">
    
    <!-- <div v-for="(a,index) in todos" :key="a.id" class="card mt-2" @click="moveToPage(a.id)"> -->
      <div class="card-body p-2" @click="moveToPage(slotProps.item.id)">
        <div class="form-check" >
          
          <input class="form-check-input" type="checkbox" :checked="slotProps.item.completed" @click.stop @change="toggleTodo(slotProps.index,$event)">  
          <label
  o          class="frm-check-label" :style="slotProps.item.completed ? complete : {}"
          :class="{active : slotProps.item.completed}">{{ slotProps.item.subject }}</label>
        </div>
        <button class="btn btn-danger btn-sm" @click.stop="confirmRemoveTodo(slotProps.item.id)">삭제</button>
      </div>
    </template>
  </List>
  <Modal v-if="modalShow" :todoId="removeId" @remove-todo="removeTodo">
    <template v-slot:title>
      Delete Todo 
    </template>
    <template #body>
      <p>this is the body text</p>
    </template>
  </Modal>


</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue'
import { ref } from 'vue';
import List from '@/components/List.vue'
    export default{
      components : {
        Modal,List
        },
        props: ['todos'],
        // props: {
        //     todos:{
        //         type: Array,
        //         required: true
        //     }
        // }
        emits: ['toggle-todo','delete-todo'],
        setup(props,{emit}){
          const modalShow = ref(false);
          const removeId = ref('');
          
          const router = useRouter();
            const toggleTodo=(index,event) =>{
                emit('toggle-todo',index,event.target.checked); //부모 컴포넌트에 toggle-todo라는 이름으로 index데이터 전달
            }

            const confirmRemoveTodo=(id) =>{
              console.log(id);
                modalShow.value = true;
                removeId.value = id;
                
            }

            const removeTodo=(object) =>{
              console.log(object);
              if(object.removeYN){
                console.log(123);
                emit('delete-todo',object.id); //부모 컴포넌트에 toggle-todo라는 이름으로 id데이터 전달
              }
              removeId.value = '';
              modalShow.value = false;                
            }
            
            const moveToPage = (id) =>{
              console.log(id);
              //router.push('/todos/'+id); or
              router.push({
                name:'Todo',
                params:{
                  id:id
                }
              })
            }
            return{
            toggleTodo,confirmRemoveTodo,moveToPage,modalShow,removeId,removeTodo
        }
        }
        
    }
</script>

<style></style>

