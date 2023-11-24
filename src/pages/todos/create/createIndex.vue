<template>
    <div>Todo create page</div>
    <TodoForm :editing="false" />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'

    export default{
        components:{
            TodoForm
        },
        
        
    }
</script>

<style></style>