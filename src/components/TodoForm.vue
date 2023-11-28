<template>
    
    <div v-if="loading">loading...</div>
    <form v-else @submit.prevent="onSaveTodo">
        <div class="row">
            <div class="col-6">
                <Input label="" :error="subjectError" 
                
                v-model:subject="todo.subject"
                
                />
            </div>
            <div v-if="editing" class="col-6">
                <div class="form-group">
                    <label>todo status</label>
                    <div>
                        <button type="button" class="btn btn-success" @click="toggleTodoStatus()" :class="todo.completed ? 'btn-success' : 'btn-danger'" >
                            {{ todo.completed ? 'Completed' : 'inCompleted' }}
                        </button>
                        
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="form-group">
                    <label>body</label>
                    <textarea class="form-control" v-model="todo.body">
                    </textarea>
                    
                </div>
            </div>
        </div>
        <button :disabled=todoUpdated type="submit" class="btn btn-primary" > 저장</button>
        <button type="" class="btn btn-outline-dark ml-2" @click="movoToTodoList"> cancel</button>          
    </form>
    <br/>
    
    
</template>

<script>
import { useRoute } from 'vue-router';
import axios from '@/axios';
import { ref, computed, onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import _ from 'lodash';
import { useToast } from '@/composables/toast'
import Input from '@/components/Input.vue'
    export default{
        props : {
            editing : {
                type : Boolean,
                default : true
            },
        },
        components:{
                       Input
        },
        setup(props){
            const router = useRouter();
            const todo = ref({
                subject : '',
                completed : false,
                body : ''
            });
            const originalTodo = ref(null);
            const route = useRoute();
            const loading = ref(false);
            const subjectError = ref('');        
            const {
                triggerToastResult,
                triggerToastError
                } = useToast();

            onBeforeMount(()=>{
                console.log('onBeforeMount');
            })
            onMounted(()=>{
                console.log('onMounted');
            })
            onBeforeUpdate(()=>{
                console.log('onBeforeUpdate');
            })
            onUpdated(()=>{
                console.log('onUpdated');
                console.log(todo.value.subject);
            })
            onBeforeUnmount(()=>{
                console.log('onBeforeUnmount');
            })
           
           
            const getTodo = async () =>{
                loading.value = true;
                try {
                    const res = await axios.get("todos/"+route.params.id);
                    todo.value = {...res.data};
                    originalTodo.value = {...res.data};
                    loading.value = false;    
                } catch (error) {
                    console.log(error);
                    loading.value = false; 
                    triggerToastError(error.message);
                }
                
            }

            if(props.editing){
                getTodo();
            }
            

            const toggleTodoStatus = () =>{
                todo.value.completed = !todo.value.completed;
            }

            const movoToTodoList = () =>{
                router.push({
                    name:'Todos'
                })
            }
                           
            const onSaveTodo = async () => {
                try {
                    let res;
                    subjectError.value = '';
                    if(!todo.value.subject.trim()){
                        subjectError.value = 'subject is empty';
                        return;
                    }
                    const data = {
                        completed: todo.value.completed,
                        subject : todo.value.subject,
                        body : todo.value.body
                    }
                    if(props.editing){
                        res = await axios.put('todos/'+todo.value.id,data);
                        originalTodo.value = {...res.data};
                        triggerToastResult(res.status);
                                           
                    }else{
                        res = await axios.post('todos',data);
                        triggerToastResult(res.status);
                        todo.value.subject = '';
                        todo.value.body = '';
                    }
                    movoToTodoList();
                } catch (error) {
                    console.log(error);
                    triggerToastError(error.message);
                }
            }

            const todoUpdated = computed(() => {
                return _.isEqual(todo.value,originalTodo.value)
                
            })

          
            return{
            todo,
            loading,
            toggleTodoStatus,
            movoToTodoList,
            onSaveTodo,
            todoUpdated,
            subjectError,
            
        }    
            
        }

        
    }
</script>

<style scoped>
    .text-red{
        color:red;
    }
    
</style>