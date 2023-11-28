<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">Home</RouterLink>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
     
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{name: 'Todos'}">Todos</RouterLink>
        </li>
     
      </ul>
    </div>
  </div>
</nav>
<div class="container">
  <RouterView/>
</div>

<Toast />

</template>

<script>
import Toast from '@/components/Toast.vue'
import { useStore } from 'vuex';
export default {
  components : {
    Toast,
  }
  ,
  setup(){
    const store = useStore();
    store.dispatch('toast/triggerToastResult',{message:'testset',type:'danger'});
    console.log(store.state);
    
  }
  
}
</script>

<style>

.active{
  font-size: 20px;
  color: rgb(19, 19, 212);
}

</style>
<!--
<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
-->