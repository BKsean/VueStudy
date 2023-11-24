import { ref,onUnmounted } from "vue";
export const useToast = () =>{

    const saveResult= ref(false);
    const savedMessage = ref('');
    const timeout = ref(null);
    const type = ref('success');

    const triggerToastResult = (status) => {
        saveResult.value = true;
        if(status == 200 || status == 201){        
            savedMessage.value = 'save successed';
            type.value = 'success';
        }else{
            savedMessage.value = 'save fail';
            type.value = 'danger';
        }
        timeout.value = setTimeout(() => {
                    saveResult.value = false;
                    savedMessage.value = '';
                    console.log('timeoutFunction')
                }, 2000);
    }

    onUnmounted(()=>{
        console.log('onUnmounted');
        clearTimeout(timeout.value);
    })

    const triggerToastError = (message) =>{
        console.log("2222");
        saveResult.value = true;
        savedMessage.value = message;
        type.value = 'danger';
    }

    return {
        saveResult,
        savedMessage,
        type,
        triggerToastResult,
        triggerToastError
    }
}