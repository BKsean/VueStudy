<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="form-group">
        <label>{{label}}</label>
        <input 
            type="text" class="form-control" 
            :value="subject" @input="onInput"
        >
        <div v-if="error">{{ error }}</div>
    </div>
</template>
<script>
export default {
    props : {
        label : {
            type : String,
        },
        error : {
            type : String,
            requirement : true
        },
        subject : {
            type : String,
            requirement : true
        }
    },
    setup(props,{emit}){
        const onInput = (e) => {
            
            emit('update:subject',e.target.value);
        };
        return {
            onInput
        }
    }
}
</script>
<style>
    
</style>