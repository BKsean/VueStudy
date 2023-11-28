import { computed } from "vue";
import { useStore } from "vuex";
export const useToast = () =>{
const store = useStore();
    //const saveResult= computed(() => store.state.toast.saveResult);
    //const savedMessage =computed(() => store.state.savedMessage);
    //const savedMessage =computed(() => store.getters['toast/toastMessageWithSmile']);
    //const timeout = computed(() => store.state.timeout);
    //const type = computed(() => store.state.toast.type);
    
    const toasts = computed(() => store.state.toast.toasts);
    const triggerToastResult = (resStatus) => {
        store.dispatch('toast/triggerToastResult',resStatus);
    }


    const triggerToastError = (message) =>{
        store.dispatch('toast/triggerToastError',message);
    }

    return {
        triggerToastResult,
        triggerToastError,
        toasts
    }
}