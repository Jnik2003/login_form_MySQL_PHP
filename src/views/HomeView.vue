<template>
  <div class="home">
    <!-- <div v-show="!$store.getters['login/getIsUserLoggedIn']"> -->
      <MainFormsComp/> 
    <!-- </div> -->
     
    <h3 v-show="$store.getters['login/getIsUserLoggedIn']">Блок для залогинившихся</h3>  
  </div>
</template>

<script>

export default {
  name: 'HomeView',
}
</script>

<style>

</style>
