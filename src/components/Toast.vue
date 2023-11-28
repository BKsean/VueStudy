<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <transition-group name="fade">
        <div v-for="toast in toasts" class="alert" :key="toast.id" :class="`alert-${toast.type}`" role="alert">
            {{toast.message}}
        </div>
    </transition-group>
</template>
<script>
import {useToast} from '@/composables/toast'
export default {
    // props: {
    //     message: {
    //         type: String,
    //         required : true
    //     },
    //     type : {
    //         type: String,
    //         default : 'success'
    //     }
    // } ,
    setup(){
        const {toasts} = useToast();
        console.log("여기")
        console.log(toasts);
        return {
            toasts
        }
    }   
   
}
</script>
<style scoped>
    .fade-enter-active,
    .fade-leave-active{
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to{
        opacity: 0;
    }

    .fade-enter-from,
    .fade-leave-from{
        opacity: 1;
    }
</style>