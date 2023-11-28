export default {
    namespaced : true,
            state: {
                toasts : []
                // savedMessage :'',
                // saveResult : false,
                // timeout :null,
                // type :'success'
            },
            mutations : {
                // UPDATE_SAVED_MESSAGE (state,payload){
                //     state.savedMessage = payload;
                // },
                // UPDATE_SAVED_RESULT(state,payload){
                //     state.saveResult = payload;
                // },
                // UPDATE_TOAST_TYPE(state,payload){
                //     state.type = payload;
                // },
                // UPDATE_TOAST_TIMEOUT(state,payload){
                //     state.timeout = payload;
                // },
                ADD_TOAST(state,payload){
                    state.toasts.push(payload);
                },
                REMOVE_TOAST(state){
                    state.toasts.shift();
                }
            },
            actions : {
                triggerToastResult (context,status) {
                    console.log("actions start :" + status);
                    let message = '';
                    let type = '';
                    //context.commit('UPDATE_SAVED_RESULT',true);
                    if(status == 200 || status == 201){
                        message = 'save successed';
                        type = 'success';
                        // context.commit('UPDATE_SAVED_MESSAGE','save successed');
                        // context.commit('UPDATE_TOAST_TYPE','success');
                    }else{
                        message = 'save fail';
                        type = 'danger';
                        // context.commit('UPDATE_SAVED_MESSAGE','save fail');
                        // context.commit('UPDATE_TOAST_TYPE','danger');
                    }
                    context.commit('ADD_TOAST',{
                        id : Date.now(),
                        message : message,
                        type : type
                    })
                    setTimeout(() => {
                            context.commit('REMOVE_TOAST');
                                // context.commit('UPDATE_SAVED_RESULT',false);
                                // context.commit('UPDATE_SAVED_MESSAGE','');
                            }, 9000);
                    //context.commit('UPDATE_TOAST_TIMEOUT',timeout);
                },
                triggerToastError  (context,message) {
                    context.commit('UPDATE_SAVED_RESULT',true);
                    context.commit('UPDATE_SAVED_MESSAGE',message);
                    context.commit('UPDATE_TOAST_TYPE','danger');
                }
            },
            getters : {  //vuex에서 사용하는 computed
                toastMessageWithSmile (state) {
                    return state.savedMessage + '^^';
                }
            }
}