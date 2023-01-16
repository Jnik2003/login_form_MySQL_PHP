<template>
  <div class="about">
    <h1 v-show="isUserLoggedIn">This is an about page</h1>
  </div>
</template>

<script>
export default{
  data(){
    return{
      isUserLoggedIn: this.$store.getters['login/getIsUserLoggedIn'],
    }
  }
}
</script>
